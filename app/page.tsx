'use client';

import ThreeCyberGlobe from '@/components/ThreeCyberGlobe';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [isWiping, setIsWiping] = useState(false);
  const [isHandshaking, setIsHandshaking] = useState(false);

  const handleGetStarted = () => {
    setIsHandshaking(true);
    // 500ms Handshake delay before starting the wipe
    setTimeout(() => {
      setIsHandshaking(false);
      setIsWiping(true);
      setTimeout(() => {
        router.push('/referrals');
      }, 800);
    }, 600);
  };

  return (
    <main className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#000000]">
      
      {/* Globe docked bottom-right (40-50% cropped) */}
      <ThreeCyberGlobe />

      {/* Content Column (Strictly LEFT-ALIGNED) */}
      <div className="z-10 flex flex-col items-start h-full justify-center max-w-7xl px-8 md:px-16 lg:px-24 pointer-events-none">
        
        {/* 1. Logo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter cursor-default pointer-events-auto leading-[0.8] mb-4">
            <span className="text-metallic-gradient">PROFE</span>
            <span className="fractured-x">X</span>
          </h1>
          <p className="text-white/30 text-xs md:text-sm tracking-[0.5em] uppercase font-light mt-4 ml-1">
            Profit Expert
          </p>
        </motion.div>

        {/* 2. Paragraph 1 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl mb-12"
        >
          <p className="text-white/60 text-lg md:text-xl font-medium tracking-wide leading-relaxed">
            Profex is a structured forex trading algorithm built to operate in live market conditions with a focus on consistency and controlled performance.
          </p>
        </motion.div>

        {/* 3. Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap gap-5 pointer-events-auto mb-16"
        >
          <button
            onClick={handleGetStarted}
            className="px-10 py-4 rounded-full bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-white/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
          >
            Get Started
          </button>
          <button
            onClick={handleGetStarted}
            className="px-10 py-4 rounded-full bg-transparent text-white font-bold text-sm uppercase tracking-widest border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all duration-300 active:scale-95"
          >
            Learn More
          </button>
        </motion.div>

        {/* 4. Paragraph 2 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl"
        >
          <p className="text-white/40 text-sm md:text-base font-medium tracking-wide uppercase leading-loose border-l border-white/10 pl-6">
            Profex is not built on assumptions or hype—it is built on structure, precision, and a commitment to consistent performance in the forex market.
          </p>
        </motion.div>

      </div>

      {/* Terminal Handshake Overlay */}
      <AnimatePresence>
        {isHandshaking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-none"
          >
            <div className="text-white font-mono text-xl md:text-2xl tracking-[0.3em] font-black animate-pulse flex items-center gap-4">
                <span className="w-12 h-[2px] bg-white"></span>
                DECRYPTING ACCESS...
                <span className="w-12 h-[2px] bg-white"></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Wipe Transition */}
      <AnimatePresence>
        {isWiping && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#000000] pointer-events-none origin-bottom"
          />
        )}
      </AnimatePresence>
      
    </main>
  );
}
