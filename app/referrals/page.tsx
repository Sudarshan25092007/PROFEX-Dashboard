'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REFERRALS } from '@/config/referrals';
import { Fingerprint, CheckCircle2, Terminal, ShieldAlert } from 'lucide-react';

export default function BrokerTerminal() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleProceed = () => {
    if (!selectedId) return;
    setIsAuthorizing(true);
    
    // Simulate secure handshake overlay before redirect
    setTimeout(() => {
      const ref = REFERRALS.find((r) => r.id === selectedId);
      if (ref && ref.url) {
        window.location.href = ref.url;
      }
    }, 1500); 
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-6 lg:p-24 relative overflow-hidden bg-[#040404] text-white">
      
      {/* Background Grid & Cyber Textures */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1)_0%,transparent_60%)]" />
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="w-full max-w-6xl z-10 flex flex-col items-center">
        
        {/* Scroll Zoom-In Entry */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 w-full"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Terminal className="w-8 h-8 text-[#39FF14]" />
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase shadow-sm">
              Terminal Verification
            </h1>
          </div>
          <p className="text-[#8A2BE2] max-w-lg mx-auto text-sm font-semibold tracking-widest uppercase mb-2">
            Secure Node Initialization
          </p>
          <p className="text-white/40 max-w-lg mx-auto text-xs tracking-wider">
            Select your isolated broker network to request encrypted authorization.
          </p>
        </motion.div>

        {/* Holographic Kinetiq Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {REFERRALS.map((ref, index) => {
            const isSelected = selectedId === ref.id;
            return (
              <motion.div
                key={ref.id}
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                onClick={() => setSelectedId(ref.id)}
                className={`
                  relative group p-8 cursor-pointer overflow-hidden flex flex-col transition-all duration-300 backdrop-blur-xl border-t border-l
                  ${isSelected ? 'bg-[rgba(57,255,20,0.05)] border-[#39FF14] shadow-[0_0_30px_rgba(57,255,20,0.2)] scale-[1.02]' : 'bg-[rgba(255,255,255,0.02)] border-white/10 hover:border-[#8A2BE2]/50 hover:bg-[rgba(138,43,226,0.05)] hover:shadow-[0_0_20px_rgba(138,43,226,0.15)]'}
                `}
                style={{
                    borderRadius: '4px',
                    borderRight: isSelected ? '1px solid #39FF14' : '1px solid rgba(255,255,255,0.05)',
                    borderBottom: isSelected ? '1px solid #39FF14' : '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {/* Thick glass shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
                
                {/* Holographic Grid Lines */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjIikiLz48L3N2Zz4=')] opacity-50" />

                <div className="flex justify-between items-start mb-8 z-10">
                    <Fingerprint className={`w-10 h-10 transition-colors duration-300 ${isSelected ? 'text-[#39FF14]' : 'text-[#8A2BE2] group-hover:text-[#39FF14]'}`} />
                    {/* System Lock-on */}
                    <div className={`transition-all duration-300 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <CheckCircle2 className="w-8 h-8 text-[#39FF14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]" />
                    </div>
                </div>
                
                <h3 className={`text-2xl font-black uppercase tracking-wider mb-2 z-10 transition-colors duration-300 ${isSelected ? 'text-[#39FF14]' : 'text-white'}`}>
                  {ref.name}
                </h3>

                {/* Simulated Bio/Terminal Data */}
                <div className="mt-4 space-y-2 z-10 font-mono text-[10px] text-white/50 tracking-widest uppercase">
                    <div className="flex justify-between border-b border-white/10 pb-1">
                        <span>Node Status</span>
                        <span className={isSelected ? 'text-[#39FF14]' : 'text-white/80'}>{isSelected ? 'AUTH GRANTED' : 'STANDBY'}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-1">
                        <span>Endpoint</span>
                        <span>XAUUSD_NET</span>
                    </div>
                    <div className="flex justify-between pb-1">
                        <span>Security</span>
                        <span>Tier 1 Encrypted</span>
                    </div>
                </div>

                {/* Animated Scanner line on select */}
                {isSelected && (
                  <motion.div 
                    initial={{ top: '-10%' }}
                    animate={{ top: '110%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#39FF14]/50 to-transparent shadow-[0_0_15px_rgba(57,255,20,0.8)] z-20 pointer-events-none"
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Proceed Action Block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 w-full flex flex-col items-center"
        >
          <button
            onClick={handleProceed}
            disabled={!selectedId || isAuthorizing}
            className={`
              relative flex items-center justify-center gap-6 px-16 py-5 font-black uppercase tracking-[0.3em] text-sm transition-all duration-500 overflow-hidden rounded-sm border
              ${selectedId 
                ? 'bg-[#0A0A0A] border-[#39FF14] text-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_40px_rgba(57,255,20,0.6)] hover:bg-[#39FF14]/10 cursor-pointer active:scale-95' 
                : 'bg-[#0A0A0A] border-white/10 text-white/20 shadow-[0_0_10px_rgba(255,255,255,0.02)] cursor-not-allowed'
              }
            `}
          >
             {/* "High Energy" Glow pulse when selected */}
             {selectedId && !isAuthorizing && (
                <div className="absolute inset-0 bg-[#39FF14]/20 animate-pulse pointer-events-none" />
             )}
            <span className="relative z-10">{selectedId ? 'Execute Connection' : 'Awaiting Target'}</span>
          </button>
        </motion.div>

      </div>

      {/* Authorizing Terminal Access Overlay */}
      <AnimatePresence>
        {isAuthorizing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040404]/90 backdrop-blur-md"
          >
             <ShieldAlert className="w-16 h-16 text-[#39FF14] mb-6 animate-pulse" />
             <h2 className="text-3xl font-black text-[#39FF14] tracking-widest uppercase shadow-sm drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]">
                Authorizing Terminal Access...
             </h2>
             <p className="text-white/50 font-mono tracking-widest mt-4 text-sm animate-pulse">Establishing secure handshake with prime broker node</p>
             
             {/* progress bar */}
             <div className="w-64 h-1 bg-white/10 mt-8 overflow-hidden rounded-full">
                <motion.div 
                   initial={{ width: 0 }} 
                   animate={{ width: "100%" }} 
                   transition={{ duration: 1.2, ease: "easeInOut" }} 
                   className="h-full bg-[#39FF14] shadow-[0_0_10px_rgba(57,255,20,1)]" 
                />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
