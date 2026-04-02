'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguageStore, Language } from '@/store/languageStore';

const LANGUAGES: { code: Language; flag: string; label: string; full: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'EN', full: 'English' },
  { code: 'it', flag: '🇮🇹', label: 'IT', full: 'Italiano' },
  { code: 'el', flag: '🇬🇷', label: 'EL', full: 'Ελληνικά' },
];

interface Props {
  scrolled: boolean;
}

export default function LanguageSwitcher({ scrolled }: Props) {
  const { language, setLanguage } = useLanguageStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];
  const others = LANGUAGES.filter((l) => l.code !== language);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${scrolled
            ? 'border-gray-600 text-gray-300 hover:border-[#c9972c] hover:text-[#c9972c]'
            : 'border-white/30 text-white hover:border-white hover:bg-white/10'
          }`}
        aria-label="Select language"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-[#161b22] rounded-xl shadow-lg border border-gray-700 overflow-hidden z-50">
          {others.map(({ code, flag, label, full }) => (
            <button
              key={code}
              onClick={() => { setLanguage(code); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-[#c9972c]/10 hover:text-[#c9972c] transition-colors"
            >
              <span>{flag}</span>
              <span className="font-semibold">{label}</span>
              <span className="text-xs text-gray-400">{full}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
