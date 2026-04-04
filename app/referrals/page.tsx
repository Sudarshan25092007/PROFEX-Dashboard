'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { REFERRALS } from '@/config/referrals';
import { Fingerprint, CheckCircle2, ShieldCheck, Target, Cpu, Activity } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

/* ═══════════════════════════════════════
   3D TILT CARD COMPONENT
   ═══════════════════════════════════════ */
function TiltCard({ referral, isSelected, onClick }: { referral: any, isSelected: boolean, onClick: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative group p-8 cursor-pointer overflow-hidden flex flex-col transition-all duration-500 rounded-xl thick-glass
        ${isSelected 
          ? 'neon-border-green selected z-20' 
          : 'neon-border-violet'}
      `}
    >
      {/* Target Lock Frame (snaps on when selected) */}
      <AnimatePresence>
        {isSelected && (
          <motion.div 
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="absolute inset-0 border-2 border-[#39FF14] z-50 pointer-events-none"
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#39FF14]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#39FF14]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#39FF14]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#39FF14]"></div>
            
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#39FF14] text-black text-[8px] font-black px-2 py-0.5 tracking-[0.2em] rounded-b">
                LOCK-ON
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-start mb-10 z-10" style={{ transform: "translateZ(30px)" }}>
          <Fingerprint className={`w-10 h-10 transition-colors duration-300 ${isSelected ? 'text-[#39FF14]' : 'text-white/20 group-hover:text-[#8A2BE2]'}`} />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/20 tracking-widest hidden group-hover:block">ENCRYPTED_ID</span>
            <div className={`transition-all duration-300 ${isSelected ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`}>
              <CheckCircle2 className="w-6 h-6 text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]" />
            </div>
          </div>
      </div>
      
      <h3 className="text-xl font-black uppercase tracking-widest mb-4 z-10 transition-colors duration-300" style={{ transform: "translateZ(40px)" }}>
        {referral.name}
      </h3>

      {/* Holographic Metrics */}
      <div className="mt-6 space-y-3 z-10 font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase" style={{ transform: "translateZ(20px)" }}>
          <div className="flex justify-between border-b border-white/5 pb-2 items-center">
              <div className="flex items-center gap-2">
                <Cpu className="w-3 h-3" />
                <span>Auth_Lvl</span>
              </div>
              <span className={isSelected ? 'text-[#39FF14]' : 'text-white/50'}>L1_VERIFIED</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2 items-center">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3" />
                <span>Node_Ratio</span>
              </div>
              <span className="text-white/50">0.998_稳定</span>
          </div>
          <div className="flex justify-between pb-1 items-center">
              <div className="flex items-center gap-2">
                <Target className="w-3 h-3" />
                <span>Latency</span>
              </div>
              <span className="text-white/50">14ms_RTT</span>
          </div>
      </div>

      {/* Handshake Successful text */}
      <AnimatePresence>
        {isSelected && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-6 pt-4 border-t border-[#39FF14]/20 text-[#39FF14] font-black text-[10px] tracking-[0.3em] flex items-center justify-center gap-2"
          >
             <span className="w-1 h-1 bg-[#39FF14] rounded-full animate-ping"></span>
             HANDSHAKE SUCCESSFUL
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BrokerTerminal() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const handleProceed = () => {
    if (!selectedId) return;
    setIsDecrypting(true);
    
    setTimeout(() => {
      setIsDecrypting(false);
      setIsAuthorizing(true);
      setTimeout(() => {
        const ref = REFERRALS.find((r) => r.id === selectedId);
        if (ref && ref.url) {
          window.location.href = ref.url;
        }
      }, 1500);
    }, 600);
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-6 lg:p-24 relative overflow-hidden bg-[#040404] text-white">
      
      {/* Background Scanline Overlay */}
      <div className="scanline"></div>

      <div className="w-full max-w-6xl z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24 w-full"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-[#8A2BE2]/50"></div>
            <span className="text-white/30 font-mono text-xs tracking-[0.8em] uppercase">Security Terminal</span>
            <div className="h-[1px] w-12 bg-[#8A2BE2]/50"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase mb-6 leading-none">
            Establish Link
          </h1>
          <p className="text-white/40 max-w-md mx-auto text-[11px] font-mono tracking-[0.2em] leading-relaxed uppercase">
            Select an authorized link-point to authenticate access to the trading backbone.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {REFERRALS.map((ref) => (
            <TiltCard 
              key={ref.id} 
              referral={ref} 
              isSelected={selectedId === ref.id} 
              onClick={() => setSelectedId(ref.id)} 
            />
          ))}
        </motion.div>

        {/* Proceed Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 w-full flex flex-col items-center"
        >
          <button
            onClick={handleProceed}
            disabled={!selectedId || isAuthorizing || isDecrypting}
            className={`
              relative px-20 py-5 rounded-full font-black uppercase tracking-[0.4em] text-xs transition-all duration-500
              ${selectedId 
                ? 'bg-[#39FF14] text-black shadow-[0_0_35px_rgba(57,255,20,0.4)] hover:shadow-[0_0_50px_rgba(57,255,20,0.6)] cursor-pointer active:scale-95' 
                : 'bg-white/5 text-white/10 border border-white/10 cursor-not-allowed'
              }
            `}
          >
            {selectedId ? (
              <span className="flex items-center gap-3">
                Authorize Terminal
                <Target className="w-4 h-4" />
              </span>
            ) : 'Awaiting Link_point'}
          </button>
        </motion.div>

      </div>

      {/* Terminal Handshake Overlay (Decrypting) */}
      <AnimatePresence>
        {isDecrypting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-none"
          >
            <div className="text-white font-mono text-xl tracking-[0.4em] font-black animate-pulse">
                INITIALIZING HANDSHAKE...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Authorizing Terminal Access Overlay */}
      <AnimatePresence>
        {isAuthorizing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
          >
             <ShieldCheck className="w-16 h-16 text-[#39FF14] mb-8 animate-pulse drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]" />
             <h2 className="text-3xl font-black text-white tracking-[0.3em] uppercase">
                Synchronizing Access...
             </h2>
             <p className="text-white/30 font-mono tracking-[0.4em] mt-6 text-[10px] animate-pulse">Validating cryptographic key-pair</p>
             
             <div className="w-80 h-[2px] bg-white/5 mt-12 overflow-hidden rounded-full">
                <motion.div 
                   initial={{ width: 0 }} 
                   animate={{ width: "100%" }} 
                   transition={{ duration: 1.2, ease: "easeInOut" }} 
                   className="h-full bg-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.8)]" 
                />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
