'use client';
import { useLanguageStore, Language } from '@/store/languageStore';

const LANGUAGES: { code: Language; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'it', flag: '🇮🇹', label: 'IT' },
  { code: 'sq', flag: '🇦🇱', label: 'SQ' },
];

interface Props {
  scrolled: boolean;
}

export default function LanguageSwitcher({ scrolled }: Props) {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div
      className="flex items-center gap-0.5 border rounded-full overflow-hidden"
      style={{ borderColor: scrolled ? '#e5e7eb' : 'rgba(255,255,255,0.25)' }}
    >
      {LANGUAGES.map(({ code, flag, label }) => {
        const isActive = language === code;
        return (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            title={code === 'en' ? 'English' : code === 'it' ? 'Italiano' : 'Shqip'}
            className={`px-2.5 py-1.5 text-xs font-semibold transition-all flex items-center gap-1 ${isActive
              ? 'bg-[#c9972c] text-white'
              : scrolled
                ? 'text-gray-600 hover:text-[#c9972c] hover:bg-[#c9972c]/10'
                : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
          >
            <span>{flag}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
