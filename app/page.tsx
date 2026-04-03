'use client';

import ThreeAbstractMesh from '@/components/ThreeAbstractMesh';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [isWiping, setIsWiping] = useState(false);

  const handleGetStarted = () => {
    setIsWiping(true);
    setTimeout(() => {
      router.push('/referrals');
    }, 600); // Wait for wipe animation to cover screen
  };

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      
      {/* 3D Abstract Background */}
      <ThreeAbstractMesh />

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center"
      >
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 text-metallic-gradient">
          PROFEX
        </h1>
        
        <p className="text-white/60 text-base md:text-lg font-light tracking-wide max-w-2xl mx-auto mb-12">
          Profex is a structured forex trading algorithm built to operate in live market conditions with a focus on consistency and controlled performance.
        </p>
        
        {/* Border-Beam Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="border-beam-container group w-64 h-16 cursor-pointer hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)] transition-all duration-500 active:scale-95 mb-12"
        >
          <div className="border-beam-inner flex items-center justify-center gap-3">
            <span className="text-white font-semibold tracking-widest uppercase text-sm">Get Started</span>
            <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" />
          </div>
        </button>

        <p className="text-white/40 text-sm md:text-base font-light max-w-3xl mx-auto tracking-wide">
          Profex is not built on assumptions or hype—it is built on structure, precision, and a commitment to consistent performance in the forex market.
        </p>
      </motion.div>

      {/* Page Wipe Transition overlay */}
      <AnimatePresence>
        {isWiping && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] pointer-events-none"
          />
        )}
      </AnimatePresence>
      
    </main>
  );
}
