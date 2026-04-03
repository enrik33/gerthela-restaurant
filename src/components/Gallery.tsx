'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useT } from '@/hooks/useTranslations';

const GALLERY_IMAGES = [
  { id: 1, url: '/images/IMG_7659.jpeg' },
  { id: 2, url: '/images/IMG_7610.jpeg' },
  { id: 3, url: '/images/IMG_7564.jpeg' },
  { id: 4, url: '/images/IMG_7480.jpeg' },
  { id: 5, url: '/images/IMG_7351.jpeg' },
  { id: 6, url: '/images/IMG_7257.jpeg' },
  { id: 7, url: '/images/IMG_6621.jpeg' },
  { id: 8, url: '/images/IMG_4284.jpeg' },
  { id: 9, url: '/images/IMG_7683.jpeg' },
  { id: 10, url: '/images/IMG_7444.jpeg' },
  { id: 11, url: '/images/IMG_7322.jpeg' },
  { id: 12, url: '/images/IMG_4265.jpeg' },
  { id: 13, url: '/images/IMG_7078.jpeg' },
];

const ROW_ONE = GALLERY_IMAGES.slice(0, 7);
const ROW_TWO = GALLERY_IMAGES.slice(6);

function ScrollRow({
  images,
  direction,
  alts,
  onClickImage,
}: {
  images: typeof GALLERY_IMAGES;
  direction: 'ltr' | 'rtl';
  alts: string[];
  onClickImage: (globalIndex: number) => void;
}) {
  // Duplicate for seamless infinite loop
  const doubled = [...images, ...images];

  return (
    <div className={`flex gap-4 ${direction === 'ltr' ? 'gallery-track-ltr' : 'gallery-track-rtl'}`}
      style={{ width: 'max-content' }}
    >
      {doubled.map((image, i) => {
        const originalIndex = GALLERY_IMAGES.findIndex((img) => img.id === image.id);
        const alt = alts[originalIndex] ?? '';
        return (
          <div
            key={`${image.id}-${i}`}
            onClick={() => onClickImage(originalIndex)}
            className="relative flex-shrink-0 w-72 h-52 rounded-2xl overflow-hidden cursor-pointer group"
          >
            <img
              src={image.url}
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm font-medium">{alt}</p>
            </div>
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
  );
}

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
    <section id="gallery" className="py-20 md:py-28 bg-[#0d1117] relative overflow-hidden">
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 md:h-16" fill="#0d1117">
          <path d="M0,30 C480,0 960,60 1440,30 L1440,60 L0,60 Z" />
          <path d="M0,30 C480,0 960,60 1440,30" fill="none" stroke="#c9972c" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>

      {/* Scrolling gallery strips — hover to pause */}
      <div className="gallery-strip flex flex-col gap-4 overflow-hidden">
        <ScrollRow
          images={ROW_ONE}
          direction="ltr"
          alts={t.gallery.images}
          onClickImage={openLightbox}
        />
        <ScrollRow
          images={ROW_TWO}
          direction="rtl"
          alts={t.gallery.images}
          onClickImage={openLightbox}
        />
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
