'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from '@/hooks/useTranslations';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShoppingCart, User, LogOut, Menu, X, Package } from 'lucide-react';
import { SearchMenu } from '@/components/sections/home/SearchMenu';
import { ThemeSwitcher } from '@/components/switcher/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/switcher/LanguageSwitcher';

export function Navbar() {
  const { user, loading, signOut } = useAuth();
  const { t } = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserInitials = () => {
    if (user?.name) {
      const names = user.name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const getUserDisplayName = () => {
    if (user?.name) {
      return user.name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-background/90 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-border">
      <Link href="/" className="text-2xl font-bold text-foreground transition-all duration-300 hover:scale-105 hover:text-primary">
        Exvolum
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative group">
          {t('navbar.shop')}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="/articles" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative group">
          {t('navbar.articles')}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="/about" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative group">
          {t('navbar.about')}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative group">
          {t('navbar.contact')}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
        {user?.role === 'ADMIN' && (
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative group">
            Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        )}
        <div className="transform transition-all duration-300 hover:scale-105">
          <SearchMenu />
        </div>
        <div className="transform transition-all duration-300">
          <ThemeSwitcher />
        </div>
        <div className="transform transition-all duration-300 hover:scale-105">
          <LanguageSwitcher />
        </div>
        <div className="relative group">
          <Link href="/cart" className="relative p-2 text-muted-foreground hover:text-foreground transition-all duration-300 transform hover:scale-110 block">
            <ShoppingCart className="w-5 h-5 transition-all duration-300 group-hover:animate-bounce" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs p-0 transition-all duration-300 group-hover:scale-125 group-hover:animate-pulse"
            >
              0
            </Badge>
          </Link>
        </div>
        {loading ? (
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
        ) : user ? (
          <div className="transform transition-all duration-300 hover:scale-105">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full transition-all duration-300 hover:ring-2 hover:ring-ring hover:ring-offset-2">
                  <Avatar className="h-8 w-8 transition-all duration-300 hover:scale-110">
                    <AvatarImage src={user.image || ''} alt={getUserDisplayName()} />
                    <AvatarFallback className="transition-colors duration-300">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-popover/95 backdrop-blur-sm border shadow-lg z-[100] animate-in slide-in-from-top-2 duration-300"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="transition-colors duration-200 hover:bg-accent/80">
                  <Link href="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>{t('navbar.account')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="transition-colors duration-200 hover:bg-accent/80">
                  <Link href="/account/orders" className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>{t('navbar.orders')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive">
                  <LogOut className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>{t('navbar.logOut')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="transform transition-all duration-300 hover:scale-105">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-accent/50">
                {t('navbar.signIn')}
              </Button>
            </Link>
            <Link href="/auth/register" className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                {t('navbar.signUp')}
              </Button>
            </Link>
          </div>
        )}
      </div>

      <button
        className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-all duration-300 transform hover:scale-110 hover:rotate-12"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 transition-transform duration-300 rotate-0" />
        ) : (
          <Menu className="w-6 h-6 transition-transform duration-300 rotate-0" />
        )}
      </button>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border md:hidden shadow-lg animate-in slide-in-from-top-2 duration-300">
          <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-4">
            <Link href="/shop" className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2">
              {t('navbar.shop')}
            </Link>
            <Link href="/articles" className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2">
              {t('navbar.articles')}
            </Link>
            <Link href="/about" className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2">
              {t('navbar.about')}
            </Link>
            <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2">
              {t('navbar.contact')}
            </Link>
            <Link href="/cart" className="flex items-center text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2 group">
              <ShoppingCart className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
              {t('navbar.cart')} (0)
            </Link>
            {user?.role === 'ADMIN' && (
              <Link href="/dashboard" className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2">
                Dashboard
              </Link>
            )}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center space-x-4">
                <div className="transition-all duration-300 hover:scale-105">
                  <ThemeSwitcher />
                </div>
                <div className="transition-all duration-300 hover:scale-105">
                  <LanguageSwitcher />
                </div>
              </div>
              <div className="transition-all duration-300 hover:scale-105">
                <SearchMenu />
              </div>
            </div>
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                <div className="h-4 bg-muted rounded w-24 animate-pulse" />
              </div>
            ) : user ? (
              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors duration-300">
                  <Avatar className="h-8 w-8 transition-transform duration-300 hover:scale-110">
                    <AvatarImage src={user.image || ''} alt={getUserDisplayName()} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{getUserDisplayName()}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Link href="/account" className="block text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 py-1">
                  {t('navbar.account')}
                </Link>
                <Link href="/account/orders" className="block text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 py-1">
                  {t('navbar.orders')}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left text-muted-foreground hover:text-destructive transition-all duration-300 hover:translate-x-2 py-1"
                >
                  {t('navbar.logOut')}
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-4 border-t border-border">
                <Link href="/auth/login" className="block transition-transform duration-300 hover:scale-105">
                  <Button variant="outline" className="w-full transition-all duration-300 hover:bg-accent/50">
                    {t('navbar.signIn')}
                  </Button>
                </Link>
                <Link href="/auth/register" className="block transition-transform duration-300 hover:scale-105">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg">
                    {t('navbar.signUp')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
