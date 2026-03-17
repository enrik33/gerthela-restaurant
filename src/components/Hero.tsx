'use client';

import { ChevronDown, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop')`,
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20" fill="white">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Tagline badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm font-medium tracking-widest uppercase text-[#f0c060]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9972c] inline-block" />
          Saranda, Albania
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold mb-4 leading-tight">
          Gerthela
          <span className="block text-[#f0c060] italic font-normal text-4xl sm:text-5xl md:text-6xl mt-1">
            Taverna
          </span>
        </h1>

        <p className="text-lg md:text-xl mb-2 text-white/90 font-light tracking-wide">
          Fresh Seafood on Saranda&apos;s Waterfront
        </p>
        <p className="text-base md:text-lg mb-10 text-white/75 max-w-2xl mx-auto">
          Pick your own fish from our daily catch. Authentic Mediterranean cuisine since generations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 bg-[#c9972c] hover:bg-[#a87a20] text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Reserve a Table
          </Link>
          <a
            href="tel:+355686660000"
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all"
          >
            <Phone size={18} />
            Call Us
          </a>
          <a
            href="https://wa.me/+355696215643"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1ebe5d] text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            WhatsApp
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-400 text-base">★★★★★</span>
            <span>4.0+ Rating</span>
          </div>
          <span className="hidden sm:inline text-white/30">|</span>
          <div>222+ Reviews on TripAdvisor</div>
          <span className="hidden sm:inline text-white/30">|</span>
          <div>Daily Fresh Catch</div>
        </div>
      </div>

      {/* Scroll indicator — hidden on mobile to avoid overlapping trust indicators */}
      <div className="hidden sm:block absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={28} className="text-white/60" />
      </div>
    </section>
  );
}
