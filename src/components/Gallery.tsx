'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY_IMAGES = [
  { id: 1, url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop', alt: 'Fresh seafood dish' },
  { id: 2, url: 'https://images.unsplash.com/photo-1553787537-cd265bc6f25b?w=800&h=600&fit=crop', alt: 'Restaurant ambiance' },
  { id: 3, url: 'https://images.unsplash.com/photo-1504674900968-a85b86418e5f?w=800&h=600&fit=crop', alt: 'Grilled fish' },
  { id: 4, url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e4313?w=800&h=600&fit=crop', alt: 'Pasta dish' },
  { id: 5, url: 'https://images.unsplash.com/photo-1546084646-e9e99c1b86d2?w=800&h=600&fit=crop', alt: 'Seafood platter' },
  { id: 6, url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop', alt: 'Waterfront dining' },
  { id: 7, url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop', alt: 'Calamari' },
  { id: 8, url: 'https://images.unsplash.com/photo-1517521231527-c8ff086f1f1f?w=800&h=600&fit=crop', alt: 'Restaurant view' },
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
    <section id="gallery" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-gray-600 text-lg">
            Stunning views and delicious dishes from Gerthela
          </p>
        </div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightbox(index)}
              className="relative h-48 rounded-lg overflow-hidden cursor-pointer group"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_IMAGES[currentImageIndex].url}
              alt={GALLERY_IMAGES[currentImageIndex].alt}
              className="w-full h-auto rounded-lg"
            />

            {/* Controls */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
            >
              <ChevronRight size={24} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {GALLERY_IMAGES.length}
            </div>

            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
