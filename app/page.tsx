'use client';

import ThreeCyberGlobe from '@/components/ThreeCyberGlobe';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Power } from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [isWiping, setIsWiping] = useState(false);

  const handleGetStarted = () => {
    setIsWiping(true);
    setTimeout(() => {
      router.push('/referrals');
    }, 800); // 
  };

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 lg:px-24">
      
      {/* Dynamic 3D Cyber Environment */}
      <ThreeCyberGlobe />

      {/* Hero Content Overlay */}
      <div className="z-10 flex flex-col items-center sm:items-start text-center sm:text-left w-full h-full justify-center max-w-6xl mx-auto py-20 pointer-events-none">
        
        {/* Title Block with the Kinetiq-style fractured X */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter cursor-default pointer-events-auto">
            <span className="text-metallic-gradient">PROFE</span>
            <span className="fractured-x">X</span>
          </h1>
        </motion.div>

        {/* Top Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-[#a1a1aa] text-lg font-medium tracking-wide max-w-xl mb-12">
            Profex is a structured forex trading algorithm built to operate in live market conditions with a focus on consistency and controlled performance.
          </p>
        </motion.div>
        
        {/* Cyber Button Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pointer-events-auto mb-12"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              rotateX: 10, 
              rotateY: -5,
              boxShadow: "0px 20px 40px rgba(138, 43, 226, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="border-beam-container group w-72 h-20 transition-all duration-300"
            style={{ perspective: 1000 }}
          >
            <div className="border-beam-inner flex items-center justify-center gap-4 bg-[rgba(10,10,10,0.6)] group-hover:bg-[rgba(10,10,10,0.4)] backdrop-blur-xl transition-all duration-300">
              <Power className="w-6 h-6 text-[#39FF14] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]" />
              <span className="text-white font-bold tracking-[0.2em] uppercase text-sm drop-shadow-md">Initialize System</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-white/80 text-sm md:text-base font-medium max-w-2xl tracking-wide uppercase drop-shadow-lg">
            Profex is not built on assumptions or hype—it is built on structure, precision, and a commitment to consistent performance in the forex market.
          </p>
        </motion.div>

      </div>

      {/* Cyber Wipe Transition */}
      <AnimatePresence>
        {isWiping && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#040404] pointer-events-none origin-bottom border-t-2 border-[#39FF14]"
          />
        )}
      </AnimatePresence>
      
    </main>
  );
}
