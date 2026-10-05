'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 380) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-[#0F2030] text-[#FAF8F5] hover:bg-[#1E3A52] dark:bg-[#DCE8F2] dark:text-[#0F2030] dark:hover:bg-[#C8DFF0] shadow-md hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#89ACC7] border border-[#89ACC7]/40 group"
      aria-label="Scroll to top of page"
      title="Scroll to top"
    >
      <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </button>
  );
}
