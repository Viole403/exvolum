import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category') || '';
    const tags = searchParams.get('tags') ? searchParams.get('tags')?.split(',') : [];
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '6'); // Changed to 6 articles per page

    const skip = (page - 1) * pageSize;

    const where: any = {
      published: true,
      AND: [],
    };

    if (query) {
      where.AND.push({
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
          { excerpt: { contains: query, mode: 'insensitive' } },
        ],
      });
    }

    if (category && category !== 'all') {
      where.AND.push({ tags: { has: category } });
    }

    if (tags && tags.length > 0) {
      where.AND.push({ tags: { hasEvery: tags } });
    }

    // Remove empty AND array if no conditions were added
    if (where.AND.length === 0) {
      delete where.AND;
    }

    const articles = await prisma.article.findMany({
      where: where.AND && where.AND.length > 0 ? where : { published: true },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: pageSize,
    });

    const totalArticles = await prisma.article.count({
      where: where.AND && where.AND.length > 0 ? where : { published: true },
    });

    // Fetch all articles to extract unique categories and tags
    const allArticles = await prisma.article.findMany({
      where: { published: true },
      select: { tags: true },
    });

    const allTags: string[] = [];
    allArticles.forEach(article => {
      article.tags.forEach(tag => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });

    // For categories, we'll assume they are also derived from tags for now, or you can add a dedicated category field to your Article model.
    // For this example, let's just use the tags as categories for simplicity in the filter UI.
    const allCategories = [...allTags]; // Using tags as categories for now

    return NextResponse.json({
      articles,
      totalArticles,
      currentPage: page,
      totalPages: Math.ceil(totalArticles / pageSize),
      availableCategories: allCategories.sort(),
      availableTags: allTags.sort(),
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
