'use client';

import { useState, useEffect } from 'react';
import { Search, Shirt, Package, FileText, User, ShoppingBag, Clock, TrendingUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { getSearchShortcut, isMac } from '@/utils/detectBrowser';

interface SearchItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  icon: any;
  href: string;
  keywords?: string[];
}

const searchItems: SearchItem[] = [
  {
    id: 'shop',
    title: 'Shop',
    description: 'Browse our premium product collection',
    category: 'Navigation',
    icon: ShoppingBag,
    href: '/shop',
    keywords: ['products', 'buy', 'store', 'collection'],
  },
  {
    id: 'products',
    title: 'All Products',
    description: 'View our complete product catalog',
    category: 'Navigation',
    icon: Package,
    href: '/shop',
    keywords: ['catalog', 'items', 'merchandise'],
  },
  {
    id: 'articles',
    title: 'Articles & Blog',
    description: 'Read our latest articles and insights',
    category: 'Content',
    icon: FileText,
    href: '/articles',
    keywords: ['blog', 'news', 'insights', 'read'],
  },
  {
    id: 'account',
    title: 'My Account',
    description: 'Manage your account and preferences',
    category: 'User',
    icon: User,
    href: '/account',
    keywords: ['profile', 'settings', 'preferences'],
  },
  {
    id: 'orders',
    title: 'Order History',
    description: 'View and track your orders',
    category: 'User',
    icon: Package,
    href: '/account/orders',
    keywords: ['purchases', 'history', 'track', 'delivery'],
  },
  {
    id: 'wishlist',
    title: 'Wishlist',
    description: 'Your saved favorite items',
    category: 'User',
    icon: Heart,
    href: '/account/wishlist',
    keywords: ['favorites', 'saved', 'liked'],
  },
  {
    id: 'cart',
    title: 'Shopping Cart',
    description: 'Review items in your cart',
    category: 'Shopping',
    icon: ShoppingBag,
    href: '/cart',
    keywords: ['basket', 'checkout', 'purchase'],
  },
];

const recentSearches = [
  'Premium shirts',
  'Black jacket',
  'Summer collection',
];

const trendingSearches = [
  'New arrivals',
  'Sale items',
  'Premium collection',
  'Winter wear',
];

export function SearchMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shortcut, setShortcut] = useState({ symbol: '⌘K', text: 'Cmd+K' });

  useEffect(() => {
    setMounted(true);

    // Set the appropriate keyboard shortcut based on OS
    setShortcut(getSearchShortcut());

    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    // Navigate to the selected page
    window.location.href = href;
  };

  const handleSearchSelect = (query: string) => {
    setOpen(false);
    // Navigate to search results
    window.location.href = `/shop?search=${encodeURIComponent(query)}`;
  };

  if (!mounted) {
    return (
      <Button variant="outline" className="h-8 w-8 p-0" disabled>
        <Search className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-8 w-8 p-0 xl:h-9 xl:w-64 xl:justify-start xl:px-3 xl:py-2 bg-background/50 border-border/50 hover:bg-accent/50 transition-colors"
        onClick={() => setOpen(true)}
      >        <Search className="h-4 w-4 xl:mr-2 text-muted-foreground" />
        <span className="hidden xl:inline-flex text-muted-foreground">Search...</span>        <div className="pointer-events-none absolute right-1.5 top-2 hidden select-none items-center gap-1 xl:flex">
          {isMac() ? (
            <>
              <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ⌘
              </kbd>
              <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                K
              </kbd>
            </>
          ) : (
            <>
              <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                Ctrl
              </kbd>
              <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                K
              </kbd>
            </>
          )}
        </div>
      </Button>      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={`Search products, articles, or navigate... (${shortcut.text})`}
          className="h-12 text-base"
        />
        <CommandList className="max-h-[400px]">
          <CommandEmpty>
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Search className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No results found.</p>
              <p className="text-xs text-muted-foreground mt-1">Try searching for products or pages</p>
            </div>
          </CommandEmpty>

          <CommandGroup heading="Quick Actions">
            {searchItems
              .filter((item) => item.category === 'Navigation')
              .map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.description} ${item.keywords?.join(' ')}`}
                  onSelect={() => handleSelect(item.href)}
                  className="cursor-pointer py-3 hover:bg-accent/50"
                >
                  <item.icon className="mr-3 h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Your Account">
            {searchItems
              .filter((item) => item.category === 'User')
              .map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.description} ${item.keywords?.join(' ')}`}
                  onSelect={() => handleSelect(item.href)}
                  className="cursor-pointer py-3 hover:bg-accent/50"
                >
                  <item.icon className="mr-3 h-4 w-4 text-secondary" />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Content & Info">
            {searchItems
              .filter((item) => item.category === 'Content')
              .map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.description} ${item.keywords?.join(' ')}`}
                  onSelect={() => handleSelect(item.href)}
                  className="cursor-pointer py-3 hover:bg-accent/50"
                >
                  <item.icon className="mr-3 h-4 w-4 text-accent" />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Trending Searches">
            {trendingSearches.map((search, index) => (
              <CommandItem
                key={`trending-${index}`}
                value={search}
                onSelect={() => handleSearchSelect(search)}
                className="cursor-pointer py-2 hover:bg-accent/50"
              >
                <TrendingUp className="mr-3 h-4 w-4 text-chart-1" />
                <span className="text-sm">{search}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Recent Searches">
            {recentSearches.map((search, index) => (
              <CommandItem
                key={`recent-${index}`}
                value={search}
                onSelect={() => handleSearchSelect(search)}
                className="cursor-pointer py-2 hover:bg-accent/50"
              >
                <Clock className="mr-3 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{search}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
