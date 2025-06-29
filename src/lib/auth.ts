import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
import Credentials from "next-auth/providers/credentials"
import Resend from 'next-auth/providers/resend'
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { $Enums } from "@prisma/client"

// Web Crypto API compatible password hashing
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hashedInput = await hashPassword(password)
  return hashedInput === hashedPassword
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "email profile",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),
    Apple({
      clientId: process.env.AUTH_APPLE_ID!,
      clientSecret: process.env.AUTH_APPLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await verifyPassword(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name || `${user.firstName} ${user.lastName}`.trim() || null,
          image: user.image,
          role: user.role || 'USER'
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile, email }) {
      // Save new social/email users to DB and log login history
      if (account?.provider === "resend") {
        // Magic link login: ensure user exists
        let dbUser = await prisma.user.findUnique({ where: { email: user.email! } })
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name || null,
              role: 'USER'
            }
          })
        }
        // Log login history
        await prisma.loginHistory.create({
          data: {
            userId: dbUser.id,
            loginMethod: $Enums.LoginMethod.EMAIL,
            success: true,
            ipAddress: "",
            userAgent: "",
            device: "",
            location: null
          }
        })
        return true
      }
      if (account?.provider === "google" || account?.provider === "apple") {
        // Social login: ensure user exists
        let dbUser = await prisma.user.findUnique({ where: { email: user.email! } })
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name || null,
              image: user.image || null,
              role: 'USER'
            }
          })
        } else {
          await prisma.user.update({
            where: { email: user.email! },
            data: {
              name: user.name || dbUser.name,
              image: user.image || dbUser.image,
            }
          })
        }
        // --- ADD THIS BLOCK: ensure SocialAccount is created/linked ---
        if (account.providerAccountId) {
          // Fix: use $Enums.SocialProvider for type safety
          const providerEnum = account.provider.toUpperCase() as $Enums.SocialProvider;
          await prisma.socialAccount.upsert({
            where: {
              userId_provider: {
                userId: dbUser.id,
                provider: providerEnum,
              },
            },
            update: {
              email: user.email!,
              name: user.name || null,
              image: user.image || null,
              providerId: account.providerAccountId,
              isLinked: true,
              updatedAt: new Date(),
            },
            create: {
              userId: dbUser.id,
              provider: providerEnum,
              providerId: account.providerAccountId,
              email: user.email!,
              name: user.name || null,
              image: user.image || null,
              isLinked: true,
            },
          })
        }
        // --- END BLOCK ---
        // Log login history
        const loginMethod = account.provider === "google" ? $Enums.LoginMethod.GOOGLE : $Enums.LoginMethod.APPLE
        await prisma.loginHistory.create({
          data: {
            userId: dbUser.id,
            loginMethod,
            success: true,
            ipAddress: "",
            userAgent: "",
            device: "",
            location: null
          }
        })
        return true
      }
      if (account?.provider === "credentials") {
        // Log login history for credentials
        const dbUser = await prisma.user.findUnique({ where: { email: user.email! } })
        if (dbUser) {
          await prisma.loginHistory.create({
            data: {
              userId: dbUser.id,
              loginMethod: $Enums.LoginMethod.EMAIL,
              success: true,
              ipAddress: "",
              userAgent: "",
              device: "",
              location: null
            }
          })
        }
        return true
      }
      return true
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email!
        session.user.image = token.image as string
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
})
