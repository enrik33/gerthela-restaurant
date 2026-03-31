'use client';
import { useLanguageStore } from '@/store/languageStore';
import { translations } from '@/i18n/translations';

export function useT() {
  const language = useLanguageStore((state) => state.language);
  return translations[language];
}
