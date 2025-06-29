import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/shop/product/[slug] - get product by slug with images, category, brand
export async function GET(_req: any, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: true,
        category: true,
        brand: true,
      },
    });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    // Flatten for frontend
    const result = {
      ...product,
      images: product.images.map((img) => img.url),
      category: product.category?.name || '',
      brand: product.brand?.name || '',
      inStock: product.inventoryQuantity > 0,
      isRecommended: product.featured,
      rating: Math.round(Math.random() * 2 + 3 + Math.random()), // fake rating 3-5
      reviewCount: Math.floor(Math.random() * 100), // fake review count
    };
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}