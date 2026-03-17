'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const GALLERY_IMAGES = [
  { id: 1, url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop', alt: 'Fresh seafood dish', span: 'col-span-1 row-span-2' },
  { id: 2, url: 'https://images.unsplash.com/photo-1504674900968-a85b86418e5f?w=800&h=600&fit=crop', alt: 'Grilled fish', span: 'col-span-1 row-span-1' },
  { id: 3, url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e4313?w=800&h=600&fit=crop', alt: 'Pasta dish', span: 'col-span-1 row-span-1' },
  { id: 4, url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop', alt: 'Calamari', span: 'col-span-2 row-span-1' },
  { id: 5, url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', alt: 'Restaurant ambiance', span: 'col-span-1 row-span-1' },
  { id: 6, url: 'https://images.unsplash.com/photo-1553787537-cd265bc6f25b?w=800&h=600&fit=crop', alt: 'Waterfront dining', span: 'col-span-1 row-span-2' },
  { id: 7, url: 'https://images.unsplash.com/photo-1546084646-e9e99c1b86d2?w=800&h=600&fit=crop', alt: 'Seafood platter', span: 'col-span-1 row-span-1' },
  { id: 8, url: 'https://images.unsplash.com/photo-1517521231527-c8ff086f1f1f?w=800&h=600&fit=crop', alt: 'Restaurant view', span: 'col-span-1 row-span-1' },
];

export default function Gallery() {
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
    <section id="gallery" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-[#c9972c] font-semibold tracking-widest uppercase text-sm mb-3">
            A Taste of Gerthela
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0d1b2a] mb-4">
            Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Stunning views and delicious dishes from our waterfront kitchen
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightbox(index)}
              className={`relative rounded-xl overflow-hidden cursor-pointer group ${image.span}`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                  <p className="text-white/60 text-xs">Click to view</p>
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
          ))}
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
              alt={GALLERY_IMAGES[currentImageIndex].alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />

            {/* Caption */}
            <p className="text-center text-white/70 mt-3 text-sm">
              {GALLERY_IMAGES[currentImageIndex].alt}
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
