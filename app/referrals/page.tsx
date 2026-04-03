'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { REFERRALS } from '@/config/referrals';
import { User, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Container variant for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function ReferralsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleProceed = () => {
    if (!selectedId) return;
    const ref = REFERRALS.find((r) => r.id === selectedId);
    if (ref && ref.url) {
      window.location.href = ref.url;
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-6 pb-24 relative overflow-hidden bg-[#040404] text-white">
      
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[0%] left-[20%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-5xl z-10 flex flex-col items-center mt-12 md:mt-0">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Select Prime Broker
          </h1>
          <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">
            Please choose your assigned relationship manager to proceed to your secure allocation portal.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4"
        >
          {REFERRALS.map((ref) => {
            const isSelected = selectedId === ref.id;
            return (
              <motion.div
                key={ref.id}
                variants={itemVariants}
                onClick={() => setSelectedId(ref.id)}
                className={`
                  relative group p-8 rounded-xl cursor-pointer overflow-hidden flex flex-col items-center bg-white/5 backdrop-blur-md transition-all duration-300
                  ${isSelected ? 'border border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'border border-white/10 hover:scale-[1.02]'}
                `}
              >
                {/* Neon Shimmer Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f0ff]/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none z-0" style={{ backgroundSize: '200% 100%' }} />

                {/* Inner Glow over overlay */}
                {isSelected && (
                  <div className="absolute inset-0 bg-[#00f0ff]/5 pointer-events-none z-0" />
                )}

                {/* Active Indicator */}
                <div className={`absolute top-4 right-4 transition-opacity duration-300 z-10 ${isSelected ? 'opacity-100 text-[#00f0ff]' : 'opacity-0'}`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>

                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 border border-white/10 z-10 ${isSelected ? 'bg-[#00f0ff]/10 border-[#00f0ff]/50 text-[#00f0ff]' : 'bg-transparent text-white/30 group-hover:text-white/60 group-hover:border-white/30'}`}>
                  <User className="w-8 h-8" />
                </div>
                
                <h3 className={`text-xl tracking-wide z-10 transition-colors duration-300 ${isSelected ? 'text-white font-semibold' : 'text-white/70 font-medium'}`}>
                  {ref.name}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Proceed Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 w-full max-w-sm flex flex-col items-center"
        >
          <button
            onClick={handleProceed}
            disabled={!selectedId}
            className={`
              relative w-full flex justify-center items-center gap-3 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-500 overflow-hidden
              ${selectedId 
                ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 cursor-pointer' 
                : 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
              }
            `}
          >
            {selectedId && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            )}
            <span className="relative z-10">Proceed</span>
            <ArrowRight className={`relative z-10 w-5 h-5 ${selectedId ? 'text-black' : 'text-white/30'}`} />
          </button>
        </motion.div>

        {/* Return Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <Link href="/" className="text-white/30 hover:text-white/80 text-xs tracking-widest uppercase transition-colors">
            Return to Terminal
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
