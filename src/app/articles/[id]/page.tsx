'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, Clock, ArrowLeft, Share2, Heart } from 'lucide-react';
import { useParams } from 'next/navigation';

const articleData = {
  1: {
    id: 1,
    title: "The Art of Sustainable Living",
    content: [
      {
        type: "paragraph",
        text: "In today's rapidly changing world, the concept of sustainable living has evolved from a niche lifestyle choice to an essential practice for conscious consumers. This comprehensive guide explores how small, intentional changes in our daily routines can create significant positive impacts on both the environment and our personal well-being."
      },
      {
        type: "paragraph",
        text: "Sustainable living isn't about perfection—it's about making better choices whenever possible. Whether it's choosing products with minimal packaging, supporting local artisans, or investing in quality items that last longer, every decision contributes to a larger movement toward environmental responsibility."
      },
      {
        type: "heading",
        text: "Understanding the Impact of Our Choices"
      },
      {
        type: "paragraph",
        text: "Every product we purchase tells a story of its journey from raw materials to our homes. By understanding this journey, we can make more informed decisions that align with our values. Premium, well-crafted items often have a smaller environmental footprint over their lifetime compared to cheaper alternatives that need frequent replacement."
      },
      {
        type: "paragraph",
        text: "The true cost of a product extends beyond its price tag. It includes the environmental impact of its production, the working conditions of those who made it, and its longevity in our lives. When we choose quality over quantity, we're voting for a more sustainable future."
      }
    ],
    author: "Sarah Johnson",
    date: "2025-01-15",
    category: "Lifestyle",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
    readTime: "5 min read",
    tags: ["sustainability", "lifestyle", "environment", "conscious-living"]
  },
  2: {
    id: 2,
    title: "Craftsmanship in the Modern Age",
    content: [
      {
        type: "paragraph",
        text: "Traditional craftsmanship represents centuries of refined techniques, passed down through generations of skilled artisans. In our digital age, these time-honored methods are finding new relevance as consumers increasingly value authenticity, quality, and the human touch in their purchases."
      },
      {
        type: "paragraph",
        text: "The resurgence of artisan-made products reflects a growing appreciation for the skill, time, and care that goes into handcrafted items. Each piece tells a story of mastery, patience, and dedication that mass-produced alternatives simply cannot replicate."
      },
      {
        type: "heading",
        text: "The Value of Human Touch"
      },
      {
        type: "paragraph",
        text: "In a world dominated by automation and mass production, handcrafted items stand out for their uniqueness and character. The slight variations that come from human hands are not flaws—they're signatures of authenticity that make each piece special."
      },
      {
        type: "paragraph",
        text: "Modern artisans are successfully blending traditional techniques with contemporary design sensibilities, creating products that honor the past while serving present-day needs. This fusion results in items that are both functional and deeply meaningful."
      }
    ],
    author: "Michael Chen",
    date: "2025-01-12",
    category: "Craftsmanship",
    image: "https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=1200",
    readTime: "7 min read",
    tags: ["craftsmanship", "artisan", "handmade", "tradition"]
  },
  3: {
    id: 3,
    title: "The Science of Quality Materials",
    content: [
      {
        type: "paragraph",
        text: "Understanding what makes materials truly premium requires looking beyond surface appearances to the molecular level. Quality materials are the foundation of exceptional products, determining not only their initial appeal but their longevity, performance, and environmental impact."
      },
      {
        type: "paragraph",
        text: "The science behind material quality involves multiple factors: purity, structure, processing methods, and the skill involved in working with them. Premium materials often require more careful handling and expertise, but the results speak for themselves in the final product."
      },
      {
        type: "heading",
        text: "Identifying Quality in Everyday Products"
      },
      {
        type: "paragraph",
        text: "Learning to recognize quality materials helps consumers make better purchasing decisions. Key indicators include weight, texture, color consistency, and how the material ages over time. Premium materials often develop a beautiful patina rather than simply wearing out."
      },
      {
        type: "paragraph",
        text: "The investment in quality materials pays dividends in durability, performance, and satisfaction. While the initial cost may be higher, the long-term value—both economic and aesthetic—makes it a wise choice for discerning consumers."
      }
    ],
    author: "Dr. Emily Rodriguez",
    date: "2025-01-10",
    category: "Education",
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1200",
    readTime: "6 min read",
    tags: ["quality", "materials", "science", "education"]
  }
};

const relatedArticles = [
  {
    id: 2,
    title: "Craftsmanship in the Modern Age",
    author: "Michael Chen",
    date: "2025-01-12",
    image: "https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 4,
    title: "Design Principles for Everyday Objects",
    author: "James Wilson",
    date: "2025-01-08",
    image: "https://images.pexels.com/photos/1191458/pexels-photo-1191458.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 5,
    title: "Building a Conscious Consumer Mindset",
    author: "Lisa Thompson",
    date: "2025-01-05",
    image: "https://images.pexels.com/photos/1232594/pexels-photo-1232594.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

export default function ArticleDetail() {
  const params = useParams();
  const articleId = parseInt(params.id as string);
  const article = articleData[articleId as keyof typeof articleData];

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Button asChild>
            <Link href="/articles">Back to Articles</Link>
          </Button>
        </div>
      </div>
    );
  }

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

      {/* Back Button */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild>
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm bg-blue-100 px-3 py-1 rounded-full text-blue-600">
                {article.category}
              </span>
              <span className="text-sm text-gray-500">{article.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {article.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(article.date)}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-12">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {article.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {block.text}
                  </p>
                );
              } else if (block.type === 'heading') {
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                    {block.text}
                  </h2>
                );
              }
              return null;
            })}
          </div>

          {/* Article Images */}
          <div className="grid md:grid-cols-2 gap-6 my-12">
            <div className="aspect-4/3 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Article supporting image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-4/3 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1833769/pexels-photo-1833769.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Article supporting image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Additional Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              The journey toward more conscious consumption is not just about the products we choose,
              but about developing a deeper understanding of value, quality, and impact. When we invest
              in well-made items from responsible producers, we're supporting a system that values
              craftsmanship, fair wages, and environmental stewardship.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              As consumers, we have incredible power to shape markets and influence production practices.
              Every purchase is a vote for the kind of world we want to live in. By choosing quality over
              quantity, supporting artisans and small businesses, and considering the full lifecycle of our
              purchases, we can make a meaningful difference.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((relatedArticle) => (
              <Card key={relatedArticle.id} className="group cursor-pointer hover:shadow-lg transition-shadow overflow-hidden bg-white">
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {relatedArticle.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {relatedArticle.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(relatedArticle.date)}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/articles/${relatedArticle.id}`}>Read Article</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Enjoy this article?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter for more insights and stories like this one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Exvolum</h3>
              <p className="text-gray-600">Premium products and insights for modern living</p>
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
                <li><Link href="/shop" className="hover:text-gray-900">Shop</Link></li>
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