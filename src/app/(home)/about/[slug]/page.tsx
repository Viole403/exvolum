import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Linkedin, Twitter, Github, Globe, Mail, Phone, GraduationCap, Briefcase, Code } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  image: string;
  description: string;
  socialLinks?: { linkedin?: string; twitter?: string; github?: string; website?: string };
  skills?: string[];
  education?: Array<{ degree: string; institution: string; year: number }>;
  experience?: Array<{ title: string; company: string; duration: string; description: string }>;
  contactEmail?: string;
  contactPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await the params Promise
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/about/team/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) return notFound();
  const member: TeamMember = await res.json();

  return (
    <>
      <Section background="white" className="py-16">
        <div className="max-w-5xl w-full mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/about">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Team
              </Link>
            </Button>
          </div>

          <Card className="border shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-0 flex flex-col md:flex-row">
              {/* Left Section: Image and Basic Info */}
              <div className="w-full md:w-1/3 bg-gray-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-md mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{member.name}</h1>
                <p className="text-lg text-blue-600 font-medium mb-4">{member.role}</p>

                {member.socialLinks && (
                  <div className="flex items-center justify-center gap-3 mb-6">
                    {member.socialLinks.linkedin && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                          <Linkedin className="h-5 w-5 text-gray-600 hover:text-blue-700" />
                        </a>
                      </Button>
                    )}
                    {member.socialLinks.twitter && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
                          <Twitter className="h-5 w-5 text-gray-600 hover:text-blue-400" />
                        </a>
                      </Button>
                    )}
                    {member.socialLinks.github && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                          <Github className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                        </a>
                      </Button>
                    )}
                    {member.socialLinks.website && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={member.socialLinks.website} target="_blank" rel="noopener noreferrer" title="Website">
                          <Globe className="h-5 w-5 text-gray-600 hover:text-purple-600" />
                        </a>
                      </Button>
                    )}
                  </div>
                )}

                <div className="text-sm text-gray-700 space-y-2">
                  {member.contactEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{member.contactEmail}</span>
                    </div>
                  )}
                  {member.contactPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{member.contactPhone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Section: Details */}
              <div className="w-full md:w-2/3 p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Briefcase className="h-6 w-6" /> About Me</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {member.description}
                  </p>
                </div>

                {member.skills && member.skills.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Code className="h-6 w-6" /> Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {member.experience && member.experience.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Briefcase className="h-6 w-6" /> Experience</h2>
                    <div className="space-y-4">
                      {member.experience.map((exp, index) => (
                        <Card key={index} className="shadow-sm border-gray-200">
                          <CardHeader>
                            <CardTitle className="text-lg font-semibold">{exp.title}</CardTitle>
                            <p className="text-gray-600 text-sm">{exp.company} • {exp.duration}</p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 text-sm">{exp.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {member.education && member.education.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><GraduationCap className="h-6 w-6" /> Education</h2>
                    <div className="space-y-4">
                      {member.education.map((edu, index) => (
                        <Card key={index} className="shadow-sm border-gray-200">
                          <CardHeader>
                            <CardTitle className="text-lg font-semibold">{edu.degree}</CardTitle>
                            <p className="text-gray-600 text-sm">{edu.institution} • {edu.year}</p>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}