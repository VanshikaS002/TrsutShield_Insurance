import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 1. Import all images from the assets folder
import img1 from '../assets/WhatsApp Image 2026-04-04 at 14.11.58.jpeg';
import img2 from '../assets/WhatsApp Image 2026-04-04 at 14.11.59 (1).jpeg';
import img3 from '../assets/WhatsApp Image 2026-04-04 at 14.11.59 (2).jpeg';
import img4 from '../assets/WhatsApp Image 2026-04-04 at 14.11.59.jpeg';
import img5 from '../assets/WhatsApp Image 2026-04-04 at 14.12.01 (1).jpeg';
import img6 from '../assets/WhatsApp Image 2026-04-04 at 14.12.01.jpeg';

const banners = [
  { url: img1, alt: 'LIC Banner 1' },
  { url: img2, alt: 'LIC Banner 2' },
  { url: img3, alt: 'LIC Banner 3' },
  { url: img4, alt: 'LIC Banner 4' },
  { url: img5, alt: 'LIC Banner 5' },
  { url: img6, alt: 'LIC Banner 6' }
];

export const BannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % banners.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden glass mb-12 group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={banners[currentIndex].url}
          alt={banners[currentIndex].alt}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={prev}
          className="p-2 glass rounded-full hover:bg-white/20 transition-all text-slate-800"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={next}
          className="p-2 glass rounded-full hover:bg-white/20 transition-all text-slate-800"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === i ? 'bg-blue-600 w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};