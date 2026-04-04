'use client';

import { useEffect, useState } from 'react';

export default function TerminalHeader() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-14 z-[100] bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 font-mono text-[10px] uppercase tracking-widest text-white/50">
      
      {/* Left side */}
      <div className="flex items-center gap-6">
        <div className="font-sans font-black flex items-center text-sm">
            <span className="text-white">PROFE</span>
            <span className="text-white ml-[1px] opacity-100">X</span>
        </div>
        
        {/* Status Indicator - Blue/White pulsing instead of green */}
        <div className="hidden sm:flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </div>
            <span className="text-white/80">System: Online</span>
        </div>

        {/* Active Pair */}
        <div className="hidden md:flex items-center gap-2">
            <span className="opacity-40">Pair:</span>
            <span className="text-white font-bold opacity-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">XAU/USD</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end">
            <span className="opacity-40 text-[9px]">Latency</span>
            <span className="text-white font-medium text-[10px]">14ms</span>
        </div>
        {time ? (
            <div className="w-20 text-right text-white/80 tracking-tighter">{time} UTC</div>
        ) : (
            <div className="w-20 text-right opacity-0">00:00:00</div>
        )}
      </div>

    </header>
  );
}
