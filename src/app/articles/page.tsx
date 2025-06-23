'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "The Art of Sustainable Living",
    excerpt: "Discover how small changes in your daily routine can make a significant impact on the environment while enhancing your quality of life.",
    author: "Sarah Johnson",
    date: "2025-01-15",
    category: "Lifestyle",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Craftsmanship in the Modern Age",
    excerpt: "Exploring how traditional artisan techniques are being preserved and adapted for contemporary design and manufacturing.",
    author: "Michael Chen",
    date: "2025-01-12",
    category: "Craftsmanship",
    image: "https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "The Science of Quality Materials",
    excerpt: "Understanding what makes materials truly premium and how to identify quality in everyday products.",
    author: "Dr. Emily Rodriguez",
    date: "2025-01-10",
    category: "Education",
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Design Principles for Everyday Objects",
    excerpt: "How thoughtful design can transform ordinary items into extraordinary experiences that enhance daily living.",
    author: "James Wilson",
    date: "2025-01-08",
    category: "Design",
    image: "https://images.pexels.com/photos/1191458/pexels-photo-1191458.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "4 min read"
  },
  {
    id: 5,
    title: "Building a Conscious Consumer Mindset",
    excerpt: "Learn how to make informed purchasing decisions that align with your values and support sustainable practices.",
    author: "Lisa Thompson",
    date: "2025-01-05",
    category: "Lifestyle",
    image: "https://images.pexels.com/photos/1232594/pexels-photo-1232594.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "8 min read"
  },
  {
    id: 6,
    title: "The Future of Artisan Commerce",
    excerpt: "How technology is enabling small producers and artisans to reach global markets while maintaining their craft traditions.",
    author: "Alex Kumar",
    date: "2025-01-03",
    category: "Business",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    readTime: "6 min read"
  }
];

const categories = ["All", "Lifestyle", "Craftsmanship", "Education", "Design", "Business"];

export default function Articles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const filteredArticles = articles
    .filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(article => 
      selectedCategory === 'All' || article.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Exvolum
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/shop" className="text-gray-600 hover:text-gray-900 transition-colors">
            Shop
          </Link>
          <Link href="/articles" className="text-gray-900 font-medium">
            Articles
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
            Contact
          </Link>
          <Button variant="default" className="bg-black hover:bg-gray-800 text-white">
            Shop Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-linear-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Insights & Stories
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Explore our collection of articles covering craftsmanship, design, sustainability, 
            and the stories behind exceptional products.
          </p>
          <div className="flex justify-center">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-4/3 lg:aspect-auto">
                  <img
                    src={filteredArticles[0].image}
                    alt={filteredArticles[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm bg-blue-100 px-3 py-1 rounded-full text-blue-600">
                      {filteredArticles[0].category}
                    </span>
                    <span className="text-sm text-gray-500">{filteredArticles[0].readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {filteredArticles[0].title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {filteredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {filteredArticles[0].author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(filteredArticles[0].date)}
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/articles/${filteredArticles[0].id}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(1).map((article) => (
              <Card key={article.id} className="group cursor-pointer hover:shadow-lg transition-shadow overflow-hidden bg-white">
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(article.date)}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/articles/${article.id}`}>Read Article</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter and never miss our latest articles and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white"
            />
            <Button className="bg-white text-gray-900 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Exvolum</h3>
              <p className="text-gray-600">
                Premium quality products and insights for modern living
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Content</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/articles" className="hover:text-gray-900">All Articles</Link></li>
                <li><Link href="/articles?category=Lifestyle" className="hover:text-gray-900">Lifestyle</Link></li>
                <li><Link href="/articles?category=Design" className="hover:text-gray-900">Design</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/about" className="hover:text-gray-900">About</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-gray-900">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/shop" className="hover:text-gray-900">All Products</Link></li>
                <li><Link href="/shop/featured" className="hover:text-gray-900">Featured</Link></li>
                <li><Link href="/shop/new" className="hover:text-gray-900">New Arrivals</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2025 Exvolum. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}