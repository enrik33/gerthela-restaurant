'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useT } from '@/hooks/useTranslations';

type GalleryImage = { id: number; url: string };
type GallerySection = 'fish' | 'pasta';

const FISH_IMAGES: GalleryImage[] = [
  { id: 1, url: '/images/fish-section/IMG_1841.jpeg' },
  { id: 2, url: '/images/fish-section/IMG_7078.jpeg' },
  { id: 3, url: '/images/fish-section/IMG_7156.jpeg' },
  { id: 4, url: '/images/fish-section/IMG_7178.jpeg' },
  { id: 5, url: '/images/fish-section/IMG_7180.jpeg' },
  { id: 6, url: '/images/fish-section/IMG_7196.jpeg' },
  { id: 7, url: '/images/fish-section/IMG_7252.jpeg' },
  { id: 8, url: '/images/fish-section/IMG_7260.jpeg' },
  { id: 9, url: '/images/fish-section/IMG_7436.jpeg' },
  { id: 10, url: '/images/fish-section/IMG_7486.jpeg' },
  { id: 11, url: '/images/fish-section/IMG_7491.jpeg' },
  { id: 12, url: '/images/fish-section/IMG_7495.jpeg' },
  { id: 13, url: '/images/fish-section/IMG_7737.jpeg' },
  { id: 14, url: '/images/fish-section/IMG_7790.jpeg' },
];

const PASTA_IMAGES: GalleryImage[] = [
  { id: 1, url: '/images/pasta-section/IMG_7073.jpeg' },
  { id: 2, url: '/images/pasta-section/IMG_7207.jpeg' },
  { id: 3, url: '/images/pasta-section/IMG_7427.jpeg' },
  { id: 4, url: '/images/pasta-section/IMG_7659.jpeg' },
];



function ScrollRow({
  images,
  direction,
  alts,
  onClickImage,
}: {
  images: GalleryImage[];
  direction: 'ltr' | 'rtl';
  alts: string[];
  onClickImage: (index: number) => void;
}) {
  const doubled = [...images, ...images];
  // ~8.75s per image keeps a consistent visual speed regardless of how many images there are
  const duration = `${Math.round(images.length * 8.75)}s`;

  return (
    <div
      className={`flex gap-4 ${direction === 'ltr' ? 'gallery-track-ltr' : 'gallery-track-rtl'}`}
      style={{ width: 'max-content', animationDuration: duration }}
    >
      {doubled.map((image, i) => {
        const localIndex = images.findIndex((img) => img.id === image.id);
        const alt = alts[localIndex] ?? '';
        return (
          <div
            key={`${image.id}-${i}`}
            onClick={() => onClickImage(localIndex)}
            className="relative flex-shrink-0 w-52 h-36 md:w-72 md:h-52 rounded-2xl overflow-hidden cursor-pointer group"
          >
            <Image
              src={image.url}
              alt={alt}
              fill
              loading="lazy"
              className="object-cover transition-[filter] duration-300 group-hover:brightness-75"
              sizes="(max-width: 768px) 208px, 288px"
              draggable={false}
            />
            <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm font-medium drop-shadow">{alt}</p>
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

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <h3 className="text-[#c9972c] font-semibold tracking-widest uppercase text-sm">{title}</h3>
        <div className="h-px flex-1 bg-white/10" />
      </div>
    </div>
  );
}

export default function Gallery() {
  const t = useT();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<GallerySection>('fish');

  const activeSectionImages = activeSection === 'fish' ? FISH_IMAGES : PASTA_IMAGES;
  const activeSectionAlts = activeSection === 'fish' ? t.gallery.fishImages : t.gallery.pastaImages;

  const openLightbox = (section: GallerySection, index: number) => {
    setActiveSection(section);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % activeSectionImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? activeSectionImages.length - 1 : prev - 1
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

      {/* Fish section */}
      <SectionDivider title={t.gallery.fishTitle} />
      <div className="flex flex-col gap-4 overflow-hidden mb-12">
        <ScrollRow
          images={FISH_IMAGES}
          direction="ltr"
          alts={t.gallery.fishImages}
          onClickImage={(i) => openLightbox('fish', i)}
        />
      </div>

      {/* Pasta section */}
      <SectionDivider title={t.gallery.pastaTitle} />
      <div className="flex flex-col gap-4 overflow-hidden">
        <ScrollRow
          images={PASTA_IMAGES}
          direction="ltr"
          alts={t.gallery.pastaImages}
          onClickImage={(i) => openLightbox('pasta', i)}
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
            <div className="relative w-full h-[80vh]">
              <Image
                src={activeSectionImages[currentImageIndex].url}
                alt={activeSectionAlts[currentImageIndex] ?? ''}
                fill
                className="object-contain rounded-xl"
                sizes="100vw"
                priority
              />
            </div>

            {/* Caption */}
            <p className="text-center text-white/70 mt-3 text-sm">
              {activeSectionAlts[currentImageIndex]}
            </p>

            {/* Prev button */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 md:left-0 md:-translate-x-14 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 md:right-0 md:translate-x-14 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-5 py-1.5 rounded-full text-sm font-medium">
              {currentImageIndex + 1} / {activeSectionImages.length}
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
