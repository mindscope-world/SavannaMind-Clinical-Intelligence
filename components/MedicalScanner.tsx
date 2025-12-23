
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

interface MedicalScannerProps {
  src: string;
  alt: string;
}

const MedicalScanner: React.FC<MedicalScannerProps> = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Local motion values for spotlight within the container
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(localX, springConfig);
  const smoothY = useSpring(localY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    localX.set(e.clientX - rect.left);
    localY.set(e.clientY - rect.top);
  };

  // Mask template for the spotlight bulb effect
  const maskImage = useMotionTemplate`radial-gradient(
    300px circle at ${smoothX}px ${smoothY}px,
    black 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  )`;

  return (
    <div className="flex flex-col gap-4">
      {/* Label above the scanner */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-white tracking-tight">Diagnostic Analysis Engine</span>
        <span className="text-xl font-bold text-cyan-400 animate-pulse">{">)>"}</span>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-black shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10 group cursor-none"
      >
        {/* Base Layer: Dimmed Background Image */}
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover grayscale brightness-[0.1] contrast-125 transition-all duration-700"
        />

        {/* Bulb Layer: Fully Lit Image revealed by Mask */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ 
            maskImage: maskImage,
            WebkitMaskImage: maskImage 
          }}
        >
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover grayscale-0 brightness-110 contrast-110"
          />
        </motion.div>

        {/* Interactive Cursor "Lens" */}
        <motion.div
          className="absolute z-30 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            left: smoothX,
            top: smoothY,
            x: "-50%",
            y: "-50%",
          }}
        >
          <div className="relative">
             <div className="w-16 h-16 border border-cyan-400/50 rounded-full flex items-center justify-center bg-cyan-400/5">
                <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
             </div>
             {/* Coordinate HUD */}
             <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 text-[8px] font-mono text-cyan-400 whitespace-nowrap bg-medical-dark/80 px-2 py-1 rounded border border-cyan-400/20 backdrop-blur-sm">
                X: {Math.round(localX.get())} / Y: {Math.round(localY.get())}<br/>
                ANALYZING_FINDINGS...
             </div>
          </div>
        </motion.div>

        {/* Corner Brackets */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/20 rounded-tl-xl transition-all group-hover:border-cyan-400/40"></div>
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-white/20 rounded-tr-xl transition-all group-hover:border-cyan-400/40"></div>
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-white/20 rounded-bl-xl transition-all group-hover:border-cyan-400/40"></div>
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/20 rounded-br-xl transition-all group-hover:border-cyan-400/40"></div>

        {/* HUD Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Neural Link Active</span>
           </div>
           <div className="w-px h-3 bg-white/10"></div>
           <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">SM_SCAN_V4</span>
        </div>
      </div>
    </div>
  );
};

export default MedicalScanner;
