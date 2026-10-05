'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  src: string;
  aspectRatio?: string;
  location?: string;
}

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (item: GalleryItem) => void;
}

export function GalleryLightbox({ item, items, onClose, onNavigate }: GalleryLightboxProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        const currentIndex = items.findIndex((i) => i.id === item.id);
        const nextIndex = (currentIndex + 1) % items.length;
        onNavigate(items[nextIndex]);
      }
      if (e.key === 'ArrowLeft') {
        const currentIndex = items.findIndex((i) => i.id === item.id);
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        onNavigate(items[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(items[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(items[nextIndex]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1622]/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      {/* Top Action Bar */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-[#0F2030]/90 text-[#FAF8F5] hover:text-[#FAF8F5] hover:bg-[#1E3A52] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#89ACC7] border border-[#89ACC7]/30"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#0F2030]/85 text-[#FAF8F5] hover:text-[#FAF8F5] hover:bg-[#1E3A52] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#89ACC7] border border-[#89ACC7]/30"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#0F2030]/85 text-[#FAF8F5] hover:text-[#FAF8F5] hover:bg-[#1E3A52] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#89ACC7] border border-[#89ACC7]/30"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Frame */}
      <div
        className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-16/10 rounded-lg overflow-hidden shadow-2xl bg-[#0F2030] border border-[#89ACC7]/30">
          <Image
            src={item.src}
            alt={item.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption Card in Deep Victory Navy & Victory Light Blue */}
        <div className="w-full mt-3 px-4 py-3 bg-[#0F2030]/95 text-[#FAF8F5] rounded-lg border border-[#89ACC7]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <div className="flex items-center gap-2 text-[#DCE8F2] font-mono text-[11px]">
              <span className="text-[#89ACC7] font-semibold">{item.category}</span>
              <span>·</span>
              <span>Image {currentIndex + 1} of {items.length}</span>
              {item.location && (
                <>
                  <span>·</span>
                  <span>{item.location}</span>
                </>
              )}
            </div>
            <h4 className="font-serif text-base font-semibold text-[#FAF8F5] mt-0.5">{item.title}</h4>
            <p className="text-[#DCE8F2]/80 text-xs mt-0.5 leading-relaxed">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
