import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Praktikum Web
            <span className="block text-4xl lg:text-5xl text-gray-600 font-normal">
              Premium Collection
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
            Discover our curated selection of premium products that elevate your everyday experience with exceptional quality and design.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-black hover:bg-gray-800 text-white px-8 py-3"
            asChild
          >
            <Link href="/shop">
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3"
            asChild
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="aspect-square bg-linear-to-br from-orange-100 to-red-200 rounded-3xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1232594/pexels-photo-1232594.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Featured Products"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.9/5 rating</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1">2,000+ Happy Customers</p>
        </div>
      </div>
    </div>
  );
}
