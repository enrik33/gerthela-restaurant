'use client';

import Image from 'next/image';
import { ChevronDown, Phone } from 'lucide-react';
import Link from 'next/link';
import { useT } from '@/hooks/useTranslations';

export default function Hero() {
  const t = useT();
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/IMG_4283.jpeg"
        alt="Gerthela Taverna waterfront view"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20" fill="#0d1117">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          <path d="M0,40 C360,80 1080,0 1440,40" fill="none" stroke="#c9972c" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Tagline badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm font-medium tracking-widest uppercase text-[#f0c060]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9972c] inline-block" />
          {t.hero.badge}
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold mb-4 leading-tight">
          Gerthela
          <span className="block text-[#f0c060] italic font-normal text-4xl sm:text-5xl md:text-6xl mt-1">
            Taverna
          </span>
        </h1>

        <p className="text-white/90 font-semibold text-base italic mb-8">
          {t.about.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(to right, #c9972c, #f0c060)' }}
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current stroke-2 shrink-0">
              <path d="M8 2v3M16 2v3M3 8h18M19 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
              <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
            </svg>
            {t.hero.reserve}
          </Link>
          <a
            href="tel:+355686660000"
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all"
          >
            <Phone size={18} />
            {t.hero.callUs}
          </a>
          <a
            href="/#menu"
            className="inline-flex items-center justify-center gap-2 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(to right, #e65c00, #f9a825)' }}
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current stroke-2 shrink-0">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 12h6M9 16h4" />
            </svg>
            {t.hero.viewMenu}
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-400 text-base">★★★★★</span>
            <span>{t.hero.rating}</span>
          </div>
          <span className="hidden sm:inline text-white/30">|</span>
          <div>{t.hero.reviews}</div>
          <span className="hidden sm:inline text-white/30">|</span>
          <div>{t.hero.dailyCatch}</div>
        </div>
      </div>

      {/* Scroll indicator — hidden on mobile to avoid overlapping trust indicators */}
      <div className="hidden sm:block absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={28} className="text-white/60" />
      </div>
    </section>
  );
}
