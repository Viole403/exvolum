'use client';

import { useState, useEffect, useCallback } from 'react';
import { Section } from '@/components';
import { ArticlesHeroSection, ArticlesListSection } from '@/components/sections/articles';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        const res = await fetch('/api/article?page=1&pageSize=1'); // Fetch with minimal data to get filter options
        if (!res.ok) throw new Error('Failed to fetch filter options');
        const data = await res.json();
        setAvailableCategories(['all', ...data.availableCategories]);
        setAvailableTags(['all', ...data.availableTags]);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    }
    fetchFilterOptions();
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  const handleTagChange = useCallback((value: string) => {
    setSelectedTag(value);
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTag('all');
    setCurrentPage(1);
  }, []);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedTag !== 'all';

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search-articles" className="mb-2 block">Search Articles</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="search-articles"
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 w-full"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category-filter" className="mb-2 block">Filter by Category</Label>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {availableCategories.map(cat => (
              <SelectItem key={cat} value={cat.toLowerCase()}>
                {cat === 'all' ? 'All Categories' : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="tag-filter" className="mb-2 block">Filter by Tag</Label>
        <Select value={selectedTag} onValueChange={handleTagChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Tags" />
          </SelectTrigger>
          <SelectContent>
            {availableTags.map(tag => (
              <SelectItem key={tag} value={tag.toLowerCase()}>
                {tag === 'all' ? 'All Tags' : tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={handleClearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Section background="white" className="py-16">
        <ArticlesHeroSection />
      </Section>

      <Section background="gray" className="py-16">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-8 space-y-6 p-6 bg-white rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter Articles
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <SheetHeader>
                    <SheetTitle>Filter Articles</SheetTitle>
                    <SheetDescription>Refine your article search.</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <ArticlesListSection
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </main>
        </div>
      </Section>
    </>
  );
}