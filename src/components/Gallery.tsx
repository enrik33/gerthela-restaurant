'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useT } from '@/hooks/useTranslations';

const GALLERY_IMAGES = [
  { id: 1, url: '/images/IMG_7659.jpeg', span: 'col-span-1 row-span-2' },
  { id: 2, url: '/images/IMG_7610.jpeg', span: 'col-span-1 row-span-1' },
  { id: 3, url: '/images/IMG_7564.jpeg', span: 'col-span-1 row-span-1' },
  { id: 4, url: '/images/IMG_7480.jpeg', span: 'col-span-2 row-span-1' },
  { id: 5, url: '/images/IMG_7351.jpeg', span: 'col-span-1 row-span-1' },
  { id: 6, url: '/images/IMG_7257.jpeg', span: 'col-span-1 row-span-2' },
  { id: 7, url: '/images/IMG_6621.jpeg', span: 'col-span-1 row-span-1' },
  { id: 8, url: '/images/IMG_4284.jpeg', span: 'col-span-1 row-span-1' },
  { id: 9, url: '/images/IMG_7683.jpeg', span: 'col-span-2 row-span-1' },
  { id: 10, url: '/images/IMG_7444.jpeg', span: 'col-span-1 row-span-1' },
  { id: 11, url: '/images/IMG_7322.jpeg', span: 'col-span-1 row-span-2' },
  { id: 12, url: '/images/IMG_4265.jpeg', span: 'col-span-1 row-span-1' },
  { id: 13, url: '/images/IMG_7078.jpeg', span: 'col-span-1 row-span-1' },
];

export default function Gallery() {
  const t = useT();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-[#c9972c] font-semibold tracking-widest uppercase text-sm mb-3">
            {t.gallery.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e6edf3] mb-4">
            {t.gallery.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[160px]">
          {GALLERY_IMAGES.map((image, index) => {
            const alt = t.gallery.images[index] ?? '';
            return (
              <div
                key={image.id}
                onClick={() => openLightbox(index)}
                className={`relative rounded-xl overflow-hidden cursor-pointer group ${image.span}`}
              >
                <img
                  src={image.url}
                  alt={alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white text-sm font-medium">{alt}</p>
                    <p className="text-white/60 text-xs">{t.gallery.clickToView}</p>
                  </div>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-none stroke-current stroke-2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_IMAGES[currentImageIndex].url}
              alt={t.gallery.images[currentImageIndex] ?? ''}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />

            {/* Caption */}
            <p className="text-center text-white/70 mt-3 text-sm">
              {t.gallery.images[currentImageIndex]}
            </p>

            {/* Prev button */}
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-5 py-1.5 rounded-full text-sm font-medium">
              {currentImageIndex + 1} / {GALLERY_IMAGES.length}
            </div>

            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-0 right-0 -translate-y-12 bg-white/10 hover:bg-white/25 text-white p-2 rounded-full transition"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
