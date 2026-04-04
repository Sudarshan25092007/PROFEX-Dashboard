'use client';

import ThreeCyberGlobe from '@/components/ThreeCyberGlobe';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

/* ═══════════════════════════════════════
   DATA STREAM BACKDROP COMPONENT
   ═══════════════════════════════════════ */
function DataStreamBackdrop() {
  const items = useMemo(() => [
    "XAUUSD +0.05%", "SYSTEM_AUTH_OK", "REALTIME_PRECISION_ENABLED", 
    "BTCUSD -1.24%", "KERNEL_SYNCH_COMPLETE", "VOLATILITY_OFFSET_0.02",
    "ETHUSD +0.88%", "ENCRYPT_HANDSHAKE_256", "SESSION_ACTIVE_04:00",
    "EURUSD +0.12%", "BUFFER_CLEAR_14ms", "ALGORITHM_LOCK_ACTIVE"
  ], []);

  return (
    <div className="absolute left-0 top-0 h-full w-48 overflow-hidden pointer-events-none opacity-[0.05] z-0 select-none hidden md:block">
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex flex-col gap-8 py-4 font-mono text-[10px] tracking-[0.2em] uppercase text-white"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [isWiping, setIsWiping] = useState(false);
  const [isHandshaking, setIsHandshaking] = useState(false);

  const handleGetStarted = () => {
    setIsHandshaking(true);
    // 600ms Handshake delay before starting the wipe
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
      
      {/* TERMINAL SCANLINE OVERLAY (The Glass Effect) */}
      <div 
        className="fixed inset-0 z-[99] pointer-events-none opacity-[0.03]" 
        style={{
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.02), rgba(0, 255, 0, 0.03))",
          backgroundSize: "100% 4px, 4px 100%"
        }}
      ></div>

      {/* Globe docked bottom-right (40-50% cropped) */}
      <ThreeCyberGlobe />

      {/* Content Column (Strictly LEFT-ALIGNED) */}
      <div className="z-10 flex flex-col items-start h-full justify-center max-w-7xl px-8 md:px-16 lg:px-24 pointer-events-none">
        
        {/* BRAND LOGO WATERMARK (Top-Left) */}
        <motion.div
          initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-16 left-8 md:left-16 lg:left-24 z-50 pointer-events-auto group"
        >
          {/* High-Contrast "Light Mode" Badge */}
          <div className="relative p-1 rounded-lg border border-white/20 bg-slate-200/60 backdrop-blur-2xl overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.15)] flex items-center justify-center">
            {/* Shimmering Scanline Effect */}
            <motion.div 
               animate={{ y: ["-200%", "200%"] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none"
            />
            
            <img 
              src="profex-logo-metallic.jpeg" 
              alt="Profex Logo" 
              className="h-28 w-auto relative rounded-md opacity-95 group-hover:opacity-100 transition-opacity duration-300" 
            />
          </div>
        </motion.div>

        {/* 1. Logo Header (CRITICAL LOCK: DO NOT ALTER) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col items-center self-start"
        >
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter cursor-default pointer-events-auto leading-[0.8] mb-6">
            <span className="text-metallic-gradient">PROFE</span>
            <span className="fractured-x">X</span>
          </h1>
          <p className="text-white font-black text-xs md:text-sm tracking-[0.8em] uppercase text-center ml-4">
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

        {/* 4. Paragraph 2 (With DATA-STREAM Backdrop) */}
        <div className="relative">
          <DataStreamBackdrop />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-2xl relative z-10"
          >
            <p className="text-white/40 text-sm md:text-base font-medium tracking-wide uppercase leading-loose border-l border-white/10 pl-6 bg-black/20 backdrop-blur-[2px]">
              Profex is not built on assumptions or hype—it is built on structure, precision, and a commitment to consistent performance in the forex market.
            </p>
          </motion.div>
        </div>

      </div>

      {/* Terminal Handshake Overlay (AUTHORIZING ACCESS) */}
      <AnimatePresence>
        {isHandshaking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md pointer-events-none"
          >
            <div className="text-white font-mono text-xl md:text-2xl tracking-[0.4em] font-black animate-pulse flex items-center gap-4 mb-8">
              AUTHORIZING ACCESS...
            </div>
            {/* High-tech loading bar */}
            <div className="w-64 h-[2px] bg-white/10 overflow-hidden rounded-full">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "100%" }} 
                transition={{ duration: 0.5, ease: "easeInOut" }} 
                className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
              />
            </div>
            <div className="mt-4 text-white/30 font-mono text-[10px] tracking-[0.2em] uppercase animate-pulse">
                Establishing Secure Link...
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
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[110] bg-[#000000] pointer-events-none origin-bottom"
          />
        )}
      </AnimatePresence>
      
    </main>
  );
}
