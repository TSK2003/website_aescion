'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Maximize2, X } from 'lucide-react';

export type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  title: string;
};

interface MediaGalleryProps {
  items: MediaItem[];
}

export function MediaGallery({ items }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape' && isExpanded) setIsExpanded(false);
    },
    [nextSlide, prevSlide, isExpanded]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getCardStyle = (index: number) => {
    const diff = (index - currentIndex + items.length) % items.length;
    
    // 0 is active, 1 is right, items.length - 1 is left, 2 is far right, items.length - 2 is far left
    if (diff === 0) {
      return {
        scale: 1,
        x: '0%',
        zIndex: 30,
        rotateY: 0,
        opacity: 1,
        filter: 'blur(0px)',
      };
    } else if (diff === 1) {
      return {
        scale: 0.85,
        x: '60%',
        zIndex: 20,
        rotateY: -25,
        opacity: 0.6,
        filter: 'blur(4px)',
      };
    } else if (diff === items.length - 1) {
      return {
        scale: 0.85,
        x: '-60%',
        zIndex: 20,
        rotateY: 25,
        opacity: 0.6,
        filter: 'blur(4px)',
      };
    } else if (diff === 2) {
      return {
        scale: 0.7,
        x: '100%',
        zIndex: 10,
        rotateY: -35,
        opacity: 0.2,
        filter: 'blur(8px)',
      };
    } else if (diff === items.length - 2) {
      return {
        scale: 0.7,
        x: '-100%',
        zIndex: 10,
        rotateY: 35,
        opacity: 0.2,
        filter: 'blur(8px)',
      };
    } else {
      return {
        scale: 0.5,
        x: '0%',
        zIndex: 0,
        rotateY: 0,
        opacity: 0,
        filter: 'blur(10px)',
      };
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden bg-neutral-950 py-20 flex flex-col items-center justify-center min-h-[600px] md:min-h-[800px] perspective-[1200px]">
      
      {/* Dynamic Background Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
        {items[currentIndex].type === 'image' ? (
          <img src={items[currentIndex].src} className="w-full h-full object-cover blur-3xl scale-110 transition-all duration-1000" alt="bg" />
        ) : (
          <video src={items[currentIndex].src} className="w-full h-full object-cover blur-3xl scale-110 transition-all duration-1000" muted />
        )}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-[400px] md:h-[600px] flex items-center justify-center transform-style-3d">
        <AnimatePresence initial={false}>
          {items.map((item, index) => {
            const style = getCardStyle(index);
            const isActive = index === currentIndex;

            return (
              <motion.div
                key={item.id}
                className={`absolute w-full max-w-[280px] md:max-w-[700px] aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-2xl ${isActive ? 'ring-2 ring-primary-500/50 shadow-primary-500/20' : ''}`}
                initial={false}
                animate={style}
                transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1 }}
                onClick={() => {
                  if (!isActive) {
                    setCurrentIndex(index);
                  } else if (item.type === 'image') {
                    // Only auto-expand images on click; videos should use their native controls
                    setIsExpanded(true);
                  }
                }}
              >
                {item.type === 'image' ? (
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="relative w-full h-full bg-black">
                    <GalleryVideo 
                      src={item.src} 
                      isActive={isActive} 
                      isExpanded={isExpanded} 
                    />
                    {!isActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                        <Play className="w-12 h-12 text-white/80" />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Overlay for active item to click to expand */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent flex flex-col justify-start p-6 md:p-10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="pointer-events-auto">
                      <h3 className="text-white font-bold text-xl md:text-2xl mb-2 drop-shadow-md">{item.title}</h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsExpanded(true);
                        }}
                        className="flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold text-sm drop-shadow-md"
                      >
                        <Maximize2 className="w-4 h-4" /> Click to view full screen
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="relative z-20 mt-12 flex items-center gap-6">
        <button 
          onClick={prevSlide}
          className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === currentIndex ? 'w-8 bg-primary-500' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Full Screen Lightbox Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button 
                onClick={() => setIsExpanded(false)}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 pb-20">
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl h-full max-h-[75vh] flex items-center justify-center"
              >
                {items[currentIndex].type === 'image' ? (
                  <img 
                    src={items[currentIndex].src} 
                    alt={items[currentIndex].title} 
                    className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl" 
                  />
                ) : (
                  <video 
                    src={items[currentIndex].src} 
                    controls 
                    autoPlay 
                    playsInline
                    className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl bg-black"
                  />
                )}
              </motion.div>
            </div>

            <div className="absolute bottom-6 left-0 w-full flex justify-center items-center gap-8 px-6">
              <button onClick={prevSlide} className="text-white/70 hover:text-white transition-colors p-2"><ChevronLeft className="w-8 h-8" /></button>
              <h3 className="text-white text-xl font-medium tracking-wide hidden md:block">
                {items[currentIndex].title} <span className="text-white/40 ml-4">{currentIndex + 1} / {items.length}</span>
              </h3>
              <button onClick={nextSlide} className="text-white/70 hover:text-white transition-colors p-2"><ChevronRight className="w-8 h-8" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function GalleryVideo({ src, isActive, isExpanded }: { src: string; isActive: boolean; isExpanded: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && !isExpanded) {
        // Play the active video, but pause it if the full-screen modal is open
        videoRef.current.play().catch(() => {});
      } else {
        // Pause inactive videos
        videoRef.current.pause();
      }
    }
  }, [isActive, isExpanded]);

  return (
    <video 
      ref={videoRef}
      src={src} 
      className="w-full h-full object-contain"
      muted
      loop
      playsInline
      controls={isActive}
    />
  );
}
