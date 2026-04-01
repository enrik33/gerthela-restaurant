'use client';
import { useEffect } from 'react';
import { useLanguageStore } from '@/store/languageStore';

const LANG_MAP = { en: 'en', it: 'it', el: 'el' };

export default function HtmlLangUpdater() {
  const language = useLanguageStore((state) => state.language);
  useEffect(() => {
    document.documentElement.lang = LANG_MAP[language];
  }, [language]);
  return null;
}
