'use client';

import { useLocale } from '@/contexts/LocaleContext';
import { useState, useEffect } from 'react';

type Messages = Record<string, any>;

export function useTranslations(namespace?: string) {
  const { locale, isLoading } = useLocale();
  const [messages, setMessages] = useState<Messages>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const imported = await import(`@/messages/${locale}.json`);
        setMessages(imported.default);
      } catch (error) {
        console.error('Failed to load messages:', error);
        // Fallback to English
        try {
          const fallback = await import(`@/messages/en.json`);
          setMessages(fallback.default);
        } catch (fallbackError) {
          console.error('Failed to load fallback messages:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    if (!isLoading) {
      loadMessages();
    }
  }, [locale, isLoading]);

  const t = (key: string, values?: Record<string, string | number>) => {
    const keys = key.split('.');
    let value = namespace ? messages[namespace] : messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Simple interpolation
    if (values) {
      return value.replace(/\{(\w+)\}/g, (match, key) => {
        return values[key]?.toString() || match;
      });
    }

    return value;
  };

  return { t, loading: loading || isLoading };
}
