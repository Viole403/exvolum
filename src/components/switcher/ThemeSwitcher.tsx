'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2 p-1 rounded-lg bg-muted/20">
        <div className="w-4 h-4 rounded-full bg-muted/50 animate-pulse" />
        <div className="w-8 h-4 rounded-full bg-muted/50 animate-pulse" />
        <div className="w-4 h-4 rounded-full bg-muted/50 animate-pulse" />
      </div>
    );
  }

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center space-x-2 p-1 rounded-lg bg-muted/20 border border-border/30">
      <Button
        variant="ghost"
        size="sm"
        className={`p-1 h-6 w-6 rounded-md transition-all duration-200 ${
          !isDark
            ? 'bg-background text-amber-500 shadow-sm border border-amber-200'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
        onClick={() => setTheme('light')}
        title="Light mode"
      >
        <Sun className="h-3 w-3" />
      </Button>

      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-slate-700 data-[state=unchecked]:bg-amber-400 transition-colors duration-200"
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      />

      <Button
        variant="ghost"
        size="sm"
        className={`p-1 h-6 w-6 rounded-md transition-all duration-200 ${
          isDark
            ? 'bg-background text-blue-400 shadow-sm border border-blue-200/50'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
        onClick={() => setTheme('dark')}
        title="Dark mode"
      >
        <Moon className="h-3 w-3" />
      </Button>
    </div>
  );
}
