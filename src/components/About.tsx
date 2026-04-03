'use client';

import { useT } from '@/hooks/useTranslations';

export default function About() {
  const t = useT();
  const stats = [
    { value: t.about.stat1Value, label: t.about.stat1Label, sub: t.about.stat1Sub },
    { value: t.about.stat2Value, label: t.about.stat2Label, sub: t.about.stat2Sub },
    { value: t.about.stat3Value, label: t.about.stat3Label, sub: t.about.stat3Sub },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#0d1117] relative overflow-hidden">
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16" fill="#0d1117">
          <path d="M0,30 C480,0 960,60 1440,30 L1440,60 L0,60 Z" />
          <path d="M0,30 C480,0 960,60 1440,30" fill="none" stroke="#c9972c" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image column */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/images/IMG_7073.jpeg"
                alt="Fresh seafood at Gerthela Taverna"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating accent image */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="/images/IMG_4951.jpeg"
                alt="Grilled fish dish"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gold accent bar */}
            <div className="absolute -left-4 top-8 w-1.5 h-24 bg-gradient-to-b from-[#c9972c] to-[#f0c060] rounded-full" />
          </div>

          {/* Content column */}
          <div className="lg:pl-6">
            <p className="text-[#c9972c] font-semibold tracking-widest uppercase text-sm mb-3">
              {t.about.sectionLabel}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e6edf3] mb-6 leading-tight">
              {t.about.title}<br />
              <span className="italic text-[#c9972c]">{t.about.titleHighlight}</span>
            </h2>

            <p className="text-gray-400 text-lg mb-4 leading-relaxed">
              {t.about.p1}
            </p>

            <p className="text-gray-400 text-lg mb-4 leading-relaxed">
              {t.about.p2}
            </p>

            <p className="text-gray-400 text-lg mb-4 leading-relaxed">
              {t.about.p3}
            </p>

            <p className="text-gray-400 text-lg mb-4 leading-relaxed">
              {t.about.p4}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <p className="text-2xl sm:text-3xl font-bold text-[#c9972c] font-display mb-1 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </p>
                  <p className="text-gray-300 text-sm font-semibold">{stat.label}</p>
                  <p className="text-gray-400 text-xs">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
