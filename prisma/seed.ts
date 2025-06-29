import { PrismaClient } from '@prisma/client';
import { faker as fakerEn } from '@faker-js/faker/locale/en';
import { faker as fakerId } from '@faker-js/faker/locale/id_ID';

const prisma = new PrismaClient();

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  // Decide how many articles for each locale (en/id), total 10
  const total = 10;
  const enCount = getRandomInt(0, total);
  const idCount = total - enCount;

  for (let i = 0; i < enCount; i++) {
    await prisma.article.create({
      data: {
        title: fakerEn.lorem.sentence(5),
        slug: fakerEn.helpers.slugify(fakerEn.lorem.words(5).toLowerCase()) + '-' + fakerEn.string.uuid().slice(0, 8),
        excerpt: fakerEn.lorem.sentences(2),
        content: fakerEn.lorem.paragraphs(5, '\n\n'),
        image: fakerEn.image.urlPicsumPhotos({ width: 800, height: 600 }),
        author: fakerEn.person.fullName(),
        tags: fakerEn.lorem.words({ min: 2, max: 5 }).split(' '),
        published: true,
        publishedAt: fakerEn.date.recent({ days: 30 }),
      },
    });
  }

  for (let i = 0; i < idCount; i++) {
    await prisma.article.create({
      data: {
        title: fakerId.lorem.sentence(5),
        slug: fakerId.helpers.slugify(fakerId.lorem.words(5).toLowerCase()) + '-' + fakerId.string.uuid().slice(0, 8),
        excerpt: fakerId.lorem.sentences(2),
        content: fakerId.lorem.paragraphs(5, '\n\n'),
        image: fakerId.image.urlPicsumPhotos({ width: 800, height: 600 }),
        author: fakerId.person.fullName(),
        tags: fakerId.lorem.words({ min: 2, max: 5 }).split(' '),
        published: true,
        publishedAt: fakerId.date.recent({ days: 30 }),
      },
    });
  }

  // Seed categories
  const categories = ['Furniture', 'Lighting', 'Decor', 'Textiles', 'Kitchen'];
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.toLowerCase() },
      update: {},
      create: {
        name: cat,
        slug: cat.toLowerCase(),
        description: `${cat} category`,
        isActive: true,
      },
    });
  }
  // Seed brands
  const brands = ['Volum', 'Bolt', 'Luxe', 'Homey', 'Artisan'];
  for (const br of brands) {
    await prisma.brand.upsert({
      where: { slug: br.toLowerCase() },
      update: {},
      create: {
        name: br,
        slug: br.toLowerCase(),
        description: `${br} brand`,
        isActive: true,
      },
    });
  }
  // Seed products
  const productCount = 20;
  for (let i = 0; i < productCount; i++) {
    const locale = Math.random() > 0.5 ? fakerEn : fakerId;
    const name = locale.commerce.productName();
    const slug = locale.helpers.slugify(name.toLowerCase()) + '-' + locale.string.uuid().slice(0, 8);
    const price = Number(locale.commerce.price({ min: 20, max: 1000, dec: 2 }));
    const compareAtPrice = Math.random() > 0.7 ? price + getRandomInt(10, 200) : null;
    const category = categories[getRandomInt(0, categories.length - 1)];
    const brand = brands[getRandomInt(0, brands.length - 1)];
    const images = [
      locale.image.urlPicsumPhotos({ width: 800, height: 800 }),
      locale.image.urlPicsumPhotos({ width: 800, height: 800 })
    ];
    await prisma.product.create({
      data: {
        name,
        slug,
        description: locale.commerce.productDescription(),
        longDescription: locale.lorem.paragraphs(3, '\n\n'),
        price,
        compareAtPrice,
        sku: locale.commerce.isbn(),
        inventoryQuantity: getRandomInt(0, 100),
        category: { connect: { slug: category.toLowerCase() } },
        brand: { connect: { slug: brand.toLowerCase() } },
        featured: Math.random() > 0.8,
        published: true,
        tags: locale.lorem.words({ min: 2, max: 5 }).split(' '),
        images: {
          create: images.map((url, idx) => ({ url, alt: `${name} image ${idx + 1}` }))
        },
        createdAt: locale.date.past({ years: 1 }),
        updatedAt: new Date(),
      },
    });
  }

  // Seed team members (8 total)
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      slug: 'sarah-johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Passionate about quality and customer experience',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sarah-johnson',
        twitter: 'https://twitter.com/sarahjohnson',
        github: null,
        website: null
      }
    },
    {
      name: 'Michael Chen',
      slug: 'michael-chen',
      role: 'Head of Product',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Expert in product curation and quality assurance',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/michael-chen',
        twitter: null,
        github: 'https://github.com/michaelchen',
        website: null
      }
    },
    {
      name: 'Emily Rodriguez',
      slug: 'emily-rodriguez',
      role: 'Customer Success',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Dedicated to ensuring customer satisfaction',
      socialLinks: {
        linkedin: null,
        twitter: 'https://twitter.com/emilyrodriguez',
        github: null,
        website: 'https://emilyrodriguez.com'
      }
    },
    {
      name: 'Ava Patel',
      slug: 'ava-patel',
      role: 'Operations Manager',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      description: 'Ensures smooth day-to-day business operations.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ava-patel',
        twitter: null,
        github: null,
        website: null
      }
    },
    {
      name: 'Liam Smith',
      slug: 'liam-smith',
      role: 'Lead Engineer',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      description: 'Architects and builds scalable solutions.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/liam-smith',
        twitter: 'https://twitter.com/liamsmith',
        github: 'https://github.com/liamsmith',
        website: null
      }
    },
    {
      name: 'Olivia Lee',
      slug: 'olivia-lee',
      role: 'Marketing Director',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      description: 'Drives brand growth and engagement.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/olivia-lee',
        twitter: null,
        github: null,
        website: 'https://olivialee.com'
      }
    },
    {
      name: 'Noah Kim',
      slug: 'noah-kim',
      role: 'UX Designer',
      image: 'https://randomuser.me/api/portraits/men/76.jpg',
      description: 'Designs delightful user experiences.',
      socialLinks: {
        linkedin: null,
        twitter: 'https://twitter.com/noahkim',
        github: null,
        website: null
      }
    },
    {
      name: 'Sophia Müller',
      slug: 'sophia-muller',
      role: 'Content Strategist',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      description: 'Crafts compelling stories for our brand.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/sophia-muller',
        twitter: null,
        github: null,
        website: null
      }
    }
  ];
  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { slug: member.slug },
      update: {},
      create: {
        name: member.name,
        slug: member.slug,
        role: member.role,
        image: member.image,
        description: member.description,
        socialLinks: member.socialLinks,
      },
    });
  }

  // Seed admin user
  await prisma.user.upsert({
    where: { email: 'admin@exvolum.com' },
    update: { role: 'ADMIN' },
    create: {
      name: 'Admin User',
      email: 'admin@exvolum.com',
      role: 'ADMIN',
      // Add password and other fields as needed
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
