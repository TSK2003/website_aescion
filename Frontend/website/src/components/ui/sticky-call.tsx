'use client';

import React from 'react';
import { PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

export function StickyCallButton() {
  const phoneNumber = '+917550068877'; 

  return (
    <motion.a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-primary-600 text-white rounded-full shadow-2xl hover:bg-primary-700 hover:scale-110 transition-all duration-300 md:hidden"
      aria-label="Call Us"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
    >
      <PhoneCall className="w-6 h-6 animate-pulse" />
    </motion.a>
  );
}
