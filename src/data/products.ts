
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  inventory: number;
  weight?: number;
  dimensions?: string;
  sku?: string;
  brand?: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  salesCount: number;
  isRecommended: boolean;
  createdAt: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Artisan Collection",
    slug: "premium-artisan-collection",
    description: "Handcrafted with attention to detail",
    longDescription: "Our Premium Artisan Collection represents the pinnacle of craftsmanship and quality. Each piece is meticulously handcrafted by skilled artisans using traditional techniques passed down through generations. The collection features premium materials sourced from sustainable suppliers, ensuring both exceptional quality and environmental responsibility.",
    price: 10.99,
    compareAtPrice: 15.99,
    images: [
      "https://images.pexels.com/photos/1232594/pexels-photo-1232594.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1232594/pexels-photo-1232594.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1232594/pexels-photo-1232594.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    category: "Premium",
    tags: ["handcrafted", "artisan", "premium", "sustainable"],
    inStock: true,
    inventory: 25,
    weight: 0.5,
    dimensions: "10cm x 15cm x 5cm",
    sku: "PAC-001",
    brand: "Exvolum",
    featured: true,
    rating: 4.8,
    reviewCount: 142,
    salesCount: 89,
    isRecommended: true,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Natural Elements Series",
    slug: "natural-elements-series",
    description: "Inspired by nature's beauty",
    longDescription: "The Natural Elements Series draws inspiration from the raw beauty of nature. Each piece captures the essence of natural forms and textures, bringing the outdoors into your daily life. Made with eco-friendly materials and finished with natural dyes, this collection embodies our commitment to sustainability.",
    price: 15.99,
    compareAtPrice: 22.99,
    images: [
      "https://images.pexels.com/photos/1191458/pexels-photo-1191458.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1191458/pexels-photo-1191458.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1191458/pexels-photo-1191458.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    category: "Natural",
    tags: ["natural", "eco-friendly", "organic", "sustainable"],
    inStock: true,
    inventory: 18,
    weight: 0.3,
    dimensions: "8cm x 12cm x 4cm",
    sku: "NES-002",
    brand: "Exvolum",
    featured: true,
    rating: 4.6,
    reviewCount: 98,
    salesCount: 156,
    isRecommended: true,
    createdAt: "2024-02-20"
  },
  {
    id: "3",
    name: "Fresh Harvest Collection",
    slug: "fresh-harvest-collection",
    description: "Farm-fresh quality guaranteed",
    longDescription: "Experience the pure essence of farm-fresh quality with our Fresh Harvest Collection. Sourced directly from local farms and producers, each item in this collection represents the peak of freshness and natural goodness. We work closely with farmers to ensure sustainable practices and the highest quality standards.",
    price: 12.99,
    images: [
      "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    category: "Fresh",
    tags: ["fresh", "farm-to-table", "local", "organic"],
    inStock: true,
    inventory: 42,
    weight: 0.8,
    dimensions: "12cm x 18cm x 6cm",
    sku: "FHC-003",
    brand: "Exvolum",
    featured: false,
    rating: 4.4,
    reviewCount: 67,
    salesCount: 203,
    isRecommended: true,
    createdAt: "2024-03-10"
  },
  {
    id: "4",
    name: "Signature Blend",
    slug: "signature-blend",
    description: "Our most popular blend",
    longDescription: "The Signature Blend is our crown jewel - a carefully curated combination of the finest ingredients that has become a customer favorite. Developed through years of experimentation and refinement, this blend offers a perfect balance of flavor, aroma, and quality that defines the Exvolum experience.",
    price: 18.99,
    compareAtPrice: 24.99,
    images: [
      "https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    category: "Signature",
    tags: ["signature", "popular", "bestseller", "premium"],
    inStock: true,
    inventory: 35,
    weight: 0.4,
    dimensions: "9cm x 14cm x 5cm",
    sku: "SB-004",
    brand: "Exvolum",
    featured: true,
    rating: 4.9,
    reviewCount: 234,
    salesCount: 312,
    isRecommended: true,
    createdAt: "2024-01-05"
  },
  {
    id: "5",
    name: "Gourmet Selection",
    slug: "gourmet-selection",
    description: "For the discerning palate",
    longDescription: "Crafted for those with the most discerning tastes, our Gourmet Selection represents the pinnacle of luxury and refinement. Each item is carefully selected for its exceptional quality, unique characteristics, and ability to provide an unparalleled sensory experience.",
    price: 22.99,
    compareAtPrice: 29.99,
    images: [
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
    ],
    category: "Gourmet",
    tags: ["gourmet", "luxury", "premium", "exclusive"],
    inStock: true,
    inventory: 12,
    weight: 0.6,
    dimensions: "11cm x 16cm x 7cm",
    sku: "GS-005",
    brand: "Exvolum",
    featured: true,
    rating: 4.7,
    reviewCount: 89,
    salesCount: 45,
    isRecommended: false,
    createdAt: "2024-04-01"
  },
  {
    id: "6",
    name: "Classic Heritage",
    slug: "classic-heritage",
    description: "Time-tested traditional recipe",
    longDescription: "The Classic Heritage collection honors traditional methods and time-tested recipes that have been perfected over generations. Each piece represents a connection to our heritage and the timeless appeal of classic craftsmanship and quality.",
    price: 14.99,
    images: [
      "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    category: "Classic",
    tags: ["classic", "traditional", "heritage", "timeless"],
    inStock: false,
    inventory: 0,
    weight: 0.45,
    dimensions: "10cm x 13cm x 5cm",
    sku: "CH-006",
    brand: "Exvolum",
    featured: false,
    rating: 4.3,
    reviewCount: 56,
    salesCount: 78,
    isRecommended: false,
    createdAt: "2024-02-28"
  },
  {
    id: "7",
    name: "Artisan Coffee Blend",
    slug: "artisan-coffee-blend",
    description: "Rich and aromatic coffee experience",
    longDescription: "Our Artisan Coffee Blend combines carefully selected beans from different regions to create a unique and memorable coffee experience. Each batch is roasted to perfection to bring out the distinctive flavors and aromas.",
    price: 8.99,
    compareAtPrice: 12.99,
    images: [
      "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    category: "Premium",
    tags: ["coffee", "artisan", "roasted", "premium"],
    inStock: true,
    inventory: 67,
    weight: 0.5,
    dimensions: "15cm x 10cm x 8cm",
    sku: "ACB-007",
    brand: "Exvolum",
    featured: false,
    rating: 4.5,
    reviewCount: 123,
    salesCount: 267,
    isRecommended: true,
    createdAt: "2024-03-15"
  },
  {
    id: "8",
    name: "Organic Tea Collection",
    slug: "organic-tea-collection",
    description: "Pure organic tea leaves",
    longDescription: "A curated selection of the finest organic tea leaves sourced from sustainable farms. Each variety offers a unique flavor profile and health benefits, perfect for tea enthusiasts.",
    price: 16.99,
    images: [
      "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    category: "Natural",
    tags: ["tea", "organic", "health", "natural"],
    inStock: true,
    inventory: 29,
    weight: 0.2,
    dimensions: "12cm x 8cm x 6cm",
    sku: "OTC-008",
    brand: "Exvolum",
    featured: false,
    rating: 4.6,
    reviewCount: 87,
    salesCount: 134,
    isRecommended: false,
    createdAt: "2024-04-20"
  }
];

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find(product => product.slug === slug);
}

// Helper function to get related products
export function getRelatedProducts(currentProductId: string, category: string, limit: number = 3): Product[] {
  return mockProducts
    .filter(product => product.id !== currentProductId && product.category === category)
    .slice(0, limit);
}

// Helper function to get featured products
export function getFeaturedProducts(limit: number = 4): Product[] {
  return mockProducts.filter(product => product.featured).slice(0, limit);
}

// Helper function to get price range
export function getPriceRange(): { min: number; max: number } {
  const prices = mockProducts.map(product => product.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

// Helper function to get all categories
export function getCategories(): string[] {
  const categories = mockProducts.map(product => product.category);
  return Array.from(new Set(categories)).sort();
}

// Helper function to get all brands
export function getBrands(): string[] {
  const brands = mockProducts
    .map(product => product.brand)
    .filter((brand): brand is string => brand !== undefined);
  return Array.from(new Set(brands)).sort();
}

// Sort options
export type SortOption = 'recommended' | 'name-asc' | 'name-desc' | 'price-low' | 'price-high' | 'rating-high' | 'newest' | 'bestselling';

// Helper function to sort products
export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sortedProducts = [...products];

  switch (sortBy) {
    case 'recommended':
      return sortedProducts.sort((a, b) => {
        if (a.isRecommended !== b.isRecommended) {
          return a.isRecommended ? -1 : 1;
        }
        return b.rating - a.rating;
      });
    case 'name-asc':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-low':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'rating-high':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'bestselling':
      return sortedProducts.sort((a, b) => b.salesCount - a.salesCount);
    default:
      return sortedProducts;
  }
}

// Filter options
export interface FilterOptions {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  featuredOnly?: boolean;
  tags?: string[];
  minRating?: number;
}

// Helper function to filter products
export function filterProducts(products: Product[], filters: FilterOptions): Product[] {
  return products.filter(product => {
    // Category filter
    if (filters.category && filters.category !== 'all' && product.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }

    // Brand filter
    if (filters.brand && filters.brand !== 'all' && product.brand?.toLowerCase() !== filters.brand.toLowerCase()) {
      return false;
    }

    // Price range filter
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }

    // Stock filter
    if (filters.inStockOnly && !product.inStock) {
      return false;
    }

    // Featured filter
    if (filters.featuredOnly && !product.featured) {
      return false;
    }

    // Rating filter
    if (filters.minRating !== undefined && product.rating < filters.minRating) {
      return false;
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag =>
        product.tags.some(productTag => productTag.toLowerCase().includes(tag.toLowerCase()))
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    return true;
  });
}

// Helper function to search products
export function searchProducts(products: Product[], searchTerm: string): Product[] {
  if (!searchTerm.trim()) {
    return products;
  }

  const term = searchTerm.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term) ||
    product.brand?.toLowerCase().includes(term) ||
    product.tags.some(tag => tag.toLowerCase().includes(term))
  );
}
