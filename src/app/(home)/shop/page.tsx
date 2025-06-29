'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, Filter, Star, X } from 'lucide-react';
import {
  PageLayout,
  Section
} from '@/components';

type ShopFilters = {
  category: string;
  brand: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly: boolean;
  featuredOnly: boolean;
  minRating?: number;
};

type SortOption =
  | 'recommended'
  | 'bestselling'
  | 'price-asc'
  | 'price-desc'
  | 'rating-high'
  | 'newest'
  | 'name-asc'
  | 'name-desc';

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [filters, setFilters] = useState<ShopFilters>({
    category: 'all',
    brand: 'all',
    minPrice: undefined,
    maxPrice: undefined,
    inStockOnly: false,
    featuredOnly: false,
    minRating: undefined
  });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [priceValue, setPriceValue] = useState([0, 1000]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/shop/product');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
        // Extract categories and brands from products
        setCategories(Array.from(new Set(data.map((p: any) => p.category))));
        setBrands(Array.from(new Set(data.map((p: any) => p.brand).filter(Boolean))));
        // Set price range
        const prices = data.map((p: any) => p.price);
        setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
        setPriceValue([Math.min(...prices), Math.max(...prices)]);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filter, search, and sort products client-side
  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filters.category !== 'all') {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.brand !== 'all') {
      filtered = filtered.filter((p) => p.brand === filters.brand);
    }
    filtered = filtered.filter((p) => p.price >= priceValue[0] && p.price <= priceValue[1]);
    if (filters.inStockOnly) {
      filtered = filtered.filter((p) => p.inventoryQuantity > 0);
    }
    if (filters.featuredOnly) {
      filtered = filtered.filter((p) => p.featured);
    }
    if (typeof filters.minRating === 'number') {
      filtered = filtered.filter((p) => p.rating >= filters.minRating!);
    }
    // Sort
    if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') filtered = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    // Default: recommended (no sort)
    return filtered;
  }, [products, searchTerm, filters, priceValue, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      category: 'all',
      brand: 'all',
      minPrice: undefined,
      maxPrice: undefined,
      inStockOnly: false,
      featuredOnly: false,
      minRating: undefined
    });
    setPriceValue([priceRange.min, priceRange.max]);
    setSortBy('recommended');
  };

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (filters.category && filters.category !== 'all') count++;
    if (filters.brand && filters.brand !== 'all') count++;
    if (priceValue[0] > priceRange.min || priceValue[1] < priceRange.max) count++;
    if (filters.inStockOnly) count++;
    if (filters.featuredOnly) count++;
    if (typeof filters.minRating === 'number') count++;
    return count;
  }, [searchTerm, filters, priceValue, priceRange]);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Category</Label>
        <Select
          value={filters.category || 'all'}
          onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 dark:border-gray-200 shadow-lg z-50">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand Filter */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Brand</Label>
        <Select
          value={filters.brand || 'all'}
          onValueChange={(value) => setFilters(prev => ({ ...prev, brand: value }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 dark:border-gray-200 shadow-lg z-50">
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map(brand => (
              <SelectItem key={brand} value={brand.toLowerCase()}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Price Range: ${priceValue[0]} - ${priceValue[1]}
        </Label>
        <Slider
          value={priceValue}
          onValueChange={setPriceValue}
          max={priceRange.max}
          min={priceRange.min}
          step={1}
          className="w-full"
        />
      </div>

      {/* Rating Filter */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
        <Select
          value={filters.minRating !== undefined ? String(filters.minRating) : 'all'}
          onValueChange={(value) => setFilters(prev => ({
            ...prev,
            minRating: value === 'all' ? undefined : parseFloat(value)
          }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any Rating" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 dark:border-gray-200 shadow-lg z-50">
            <SelectItem value="all">Any Rating</SelectItem>
            <SelectItem value="4.5">4.5+ Stars</SelectItem>
            <SelectItem value="4.0">4.0+ Stars</SelectItem>
            <SelectItem value="3.5">3.5+ Stars</SelectItem>
            <SelectItem value="3.0">3.0+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Additional Filters */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => setFilters(prev => ({
              ...prev,
              inStockOnly: !!checked
            }))}
          />
          <Label htmlFor="in-stock" className="text-sm">In Stock Only</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={filters.featuredOnly}
            onCheckedChange={(checked) => setFilters(prev => ({
              ...prev,
              featuredOnly: !!checked
            }))}
          />
          <Label htmlFor="featured" className="text-sm">Featured Products</Label>
        </div>
      </div>

      <Separator />

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={clearFilters}
        className="w-full"
        disabled={activeFiltersCount === 0}
      >
        Clear All Filters
      </Button>
    </div>
  );

  if (loading) return (
    <PageLayout>
      <Section background="white" className="py-32 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 mb-6 animate-spin rounded-full border-4 border-gray-200 border-t-gray-500" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading products...</h2>
        <p className="text-gray-500">Please wait while we fetch the latest products for you.</p>
      </Section>
    </PageLayout>
  );
  if (error) return <div>Error: {error}</div>;

  return (
    <PageLayout>
      {/* Hero Section */}
      <Section background="white" className="py-0">
        <div className="relative h-96 bg-gradient-to-r from-orange-100 to-red-200 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/1191458/pexels-photo-1191458.jpeg?auto=compress&cs=tinysrgb&w=1200')"
            }}
          />
          <div className="relative z-10 text-center text-white">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Collection</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Discover our carefully curated selection of premium products
            </p>
          <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
            Explore Products
          </Button>
        </div>
      </div>
      </Section>

      {/* Main Shop Content */}
      <Section background="gray" className="py-8">
        <div className="flex lg:gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary">{activeFiltersCount}</Badge>
                  )}
                </div>
                <FilterContent />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Search and Sort Bar */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 dark:border-gray-200 shadow-lg z-50">
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="bestselling">Best Selling</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating-high">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Refine your product search
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Products ({filteredProducts.length})
              </h2>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" onClick={clearFilters} size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Clear filters
                </Button>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <Link href={`/shop/product/${product.slug}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">{product.name}</h3>
                        <div className="flex flex-col items-end gap-1 ml-2">
                          <Badge variant="secondary" className="text-xs">
                            {product.category}
                          </Badge>
                          {product.isRecommended && (
                            <Badge variant="default" className="text-xs">
                              Recommended
                            </Badge>
                          )}
                          {!product.inStock && (
                            <Badge variant="destructive" className="text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          ({product.reviewCount})
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gray-900">${product.price}</span>
                          {product.compareAtPrice && (
                            <span className="text-sm text-gray-500 line-through">${product.compareAtPrice}</span>
                          )}
                        </div>
                        <Button size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </Section>
    </PageLayout>
  );
}