'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocale, type Locale } from '@/contexts/LocaleContext';
import { useTranslations } from '@/hooks/useTranslations';

interface Language {
  code: Locale;
  name: string;
  flag: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', nativeName: 'Bahasa Indonesia' },
];

export function LanguageSwitcher() {
  const { locale, setLocale, isLoading } = useLocale();
  const { t, loading: translationsLoading } = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading || translationsLoading) {
    return (
      <Button variant="ghost" size="sm" className="h-8 px-2" disabled>
        <Globe className="h-4 w-4 text-muted-foreground" />
        <ChevronDown className="h-3 w-3 ml-1 text-muted-foreground" />
      </Button>
    );
  }

  const currentLanguage = languages.find(l => l.code === locale) || languages[0];

  const handleLanguageChange = async (language: Language) => {
    await setLocale(language.code);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="mr-1 text-base">{currentLanguage.flag}</span>
          <span className="hidden sm:inline-block mr-1 text-sm font-medium">
            {currentLanguage.code.toUpperCase()}
          </span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-popover/95 backdrop-blur-sm border shadow-lg"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={`cursor-pointer transition-colors ${
              currentLanguage.code === language.code
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <span className="mr-3 text-lg">{language.flag}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{t(`language.${language.code === 'en' ? 'english' : 'indonesian'}`)}</span>
              <span className="text-xs text-muted-foreground">{language.nativeName}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
