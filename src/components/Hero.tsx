'use client';

import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="w-full h-screen bg-gradient-to-r from-blue-600 to-blue-800 flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background overlay image effect */}
      <div className="absolute inset-0 bg-black/30 z-0" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Gerthela Taverna</h1>
        <p className="text-xl md:text-2xl mb-2 text-blue-100">Fresh Seafood on Saranda's Waterfront</p>
        <p className="text-lg md:text-xl mb-8 text-blue-50">
          Pick your own fish from our daily catch. Authentic Mediterranean cuisine since generations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="tel:+355686660000"
            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Call to Reserve
          </a>
          <a
            href="https://wa.me/+355696215643"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
