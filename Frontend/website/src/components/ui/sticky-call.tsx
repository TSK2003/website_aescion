'use client';

import React, { useState, useEffect } from 'react';
import { PhoneCall } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function StickyCallButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = '+917550068877'; 

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 30% of viewport height
      if (window.scrollY > window.innerHeight * 0.3) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={`tel:${phoneNumber}`}
          className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-primary-600 text-white rounded-full shadow-2xl hover:bg-primary-700 transition-all duration-300 md:hidden"
          aria-label="Call Us"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <PhoneCall className="w-6 h-6 animate-pulse" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
