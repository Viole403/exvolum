import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/shop/product - get all products with images, category, brand
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { published: true },
      include: {
        images: true,
        category: true,
        brand: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    // Flatten for frontend
    const result = products.map((p) => ({
      ...p,
      images: p.images.map((img) => img.url),
      category: p.category?.name || '',
      brand: p.brand?.name || '',
      inStock: p.inventoryQuantity > 0,
      isRecommended: p.featured,
      rating: Math.round(Math.random() * 2 + 3 + Math.random()), // fake rating 3-5
      reviewCount: Math.floor(Math.random() * 100), // fake review count
    }));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
