import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET /api/dashboard/articles/[id] - Get a specific article
// PATCH /api/dashboard/articles/[id] - Update an article
// DELETE /api/dashboard/articles/[id] - Delete an article
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Only allow admins to access this endpoint
    if ((session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Await the params Promise
    const { id } = await params;

    const article = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        published: true,
        publishedAt: true,
        tags: true,
        author: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Only allow admins to update articles
    if ((session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const data = await request.json();

    // Await the params Promise
    const { id } = await params;

    // Check if article exists and belongs to the user
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Generate slug from title if title is being updated
    let slug = existingArticle.slug;
    if (data.title && data.title !== existingArticle.title) {
      slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Check if new slug is already taken by another article
      const slugInUse = await prisma.article.findFirst({
        where: {
          slug,
          id: { not: id },
        },
      });

      if (slugInUse) {
        return NextResponse.json(
          { error: 'An article with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Determine if we're publishing an unpublished article
    const isPublishing = data.published === true && !existingArticle.published;

    // Update the article
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title: data.title || existingArticle.title,
        slug,
        excerpt: data.excerpt !== undefined ? data.excerpt : existingArticle.excerpt,
        content: data.content || existingArticle.content,
        published: data.published !== undefined ? data.published : existingArticle.published,
        publishedAt: isPublishing ? new Date() : existingArticle.publishedAt,
        tags: data.tags !== undefined
          ? (Array.isArray(data.tags) ? data.tags : data.tags.split(',').map((tag: string) => tag.trim()))
          : existingArticle.tags,
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Only allow admins to delete articles
    if ((session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Await the params Promise
    const { id } = await params;

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Delete the article
    await prisma.article.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}