'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const heroImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1920&h=1080";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Text comes from behind (scale up, fade in, rotate 3D)
  const textScale = useTransform(scrollYProgress, [0, 0.25], [0.8, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 1]);
  const textRotateX = useTransform(scrollYProgress, [0, 0.25], [20, 0]);

  // Left and Right door split animation for the image
  // Added a 5% deadzone at the start to ensure no gap if scroll is slightly off on load
  const leftX = useTransform(scrollYProgress, [0, 0.05, 0.25], ["0%", "0%", "-50%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.05, 0.25], ["0%", "0%", "50%"]);
  const doorOpacity = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white" style={{ perspective: "1500px" }}>
        
        {/* Grid overlay in the background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0" />

        {/* Text Content (Behind Image) */}
        <motion.div 
          style={{
            scale: textScale,
            opacity: textOpacity,
            rotateX: textRotateX,
            y: 0,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 container mx-auto px-6 max-w-7xl pt-32 pointer-events-none"
        >

          {/* Headline */}
          <h1 className="max-w-5xl text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 mb-8 leading-[1.1]">
            Architecting the Future of <br className="hidden md:block" />
            <span className="text-primary-600">
              Intelligent Software
            </span> & AI
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed">
            Premium enterprise software development, automation, and corporate training. We build scalable technology solutions that drive sustainable growth and give you a competitive advantage.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pointer-events-auto">
            <Link 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="w-full sm:w-auto px-8 py-4 bg-secondary-500 text-white rounded-xl font-semibold text-base hover:bg-secondary-600 transition-all shadow-lg shadow-secondary-500/30 hover:shadow-secondary-500/50 hover:-translate-y-1 flex items-center justify-center gap-2 group cursor-default"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-900 rounded-xl font-semibold text-base hover:bg-neutral-50 transition-all border border-neutral-200 hover:border-neutral-300 hover:-translate-y-1 flex items-center justify-center gap-2 group shadow-sm cursor-default"
            >
              Explore Services
              <ChevronRight className="w-5 h-5 group-hover:text-primary-600 transition-colors" />
            </Link>
          </div>
        </motion.div>

          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Left Half Image */}
            <motion.div
              initial={{ x: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: 'inset(0 50% 0 0)',
                x: leftX,
                opacity: doorOpacity,
              }}
              className="z-20 overflow-hidden"
            >
              <Image 
                src={heroImage} 
                alt="Hero Left" 
                fill 
                priority 
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
            {/* Right Half Image */}
            <motion.div
              initial={{ x: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: 'inset(0 0 0 50%)',
                x: rightX,
                opacity: doorOpacity,
              }}
              className="z-20 overflow-hidden"
            >
              <Image 
                src={heroImage} 
                alt="Hero Right" 
                fill 
                priority 
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </div>
        
        {/* Scroll indicator overlay */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 text-white pointer-events-none"
        >
          {/* Spacer to replace Slider Indicators */}
          <div className="flex items-center h-2.5"></div>

          <div className="flex flex-col items-center gap-2 mt-4">
            <span className="text-sm font-bold tracking-widest uppercase drop-shadow-md">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1 shadow-lg">
              <motion.div 
                animate={{ y: [0, 12, 0] }} 
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-white rounded-full shadow-md"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
