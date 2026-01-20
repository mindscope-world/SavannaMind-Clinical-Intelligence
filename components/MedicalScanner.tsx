
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

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(localX, springConfig);
  const smoothY = useSpring(localY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    localX.set(e.clientX - rect.left);
    localY.set(e.clientY - rect.top);
  };

  // Mask template for the spotlight bulb effect - smoother falloff
  const maskImage = useMotionTemplate`radial-gradient(
    350px circle at ${smoothX}px ${smoothY}px,
    black 0%,
    rgba(0, 0, 0, 0.6) 40%,
    transparent 100%
  )`;

  return (
    <div className="flex flex-col gap-4">
      {/* Label above the scanner */}
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
        <span className="text-xl font-black text-white tracking-tight uppercase text-[10px] tracking-[0.3em]">Diagnostic Analysis Engine</span>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-medical-dark shadow-[0_0_100px_rgba(0,0,0,0.6)] border border-white/10 group cursor-none grainy-glass"
      >
        {/* Base Layer: More visible than before, but still themed */}
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover grayscale brightness-[0.35] contrast-110 transition-all duration-700 group-hover:brightness-[0.45]"
        />

        {/* Dynamic Subtle Glow Layer (Ambient light following cursor) */}
        <motion.div 
          className="absolute inset-0 z-[5] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(34, 211, 238, 0.08), transparent 80%)`
          }}
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
            className="w-full h-full object-cover grayscale-0 brightness-110 contrast-125"
          />
        </motion.div>

        {/* Scanning Line Animation */}
        <motion.div 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-cyan-400/30 z-20 pointer-events-none shadow-[0_0_15px_rgba(34,211,238,0.5)]"
        />

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
             <div className="w-20 h-20 border border-cyan-400/40 rounded-full flex items-center justify-center bg-cyan-400/5 backdrop-blur-[2px]">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]"></div>
                {/* Crosshair markers */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-cyan-400/50"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-cyan-400/50"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-px bg-cyan-400/50"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-px bg-cyan-400/50"></div>
             </div>
             
             {/* Coordinate HUD */}
             <div className="absolute top-1/2 left-full ml-6 -translate-y-1/2 text-[9px] font-mono text-cyan-400 whitespace-nowrap bg-black/80 px-3 py-2 rounded-xl border border-cyan-400/20 backdrop-blur-md shadow-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping"></span>
                  <span className="font-black">ANALYZING_PATHOLOGY</span>
                </div>
                COORD_X: {Math.round(localX.get())}<br/>
                COORD_Y: {Math.round(localY.get())}<br/>
                CONFIDENCE: 99.4%
             </div>
          </div>
        </motion.div>

        {/* Corner Brackets */}
        <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-white/20 rounded-tl-3xl transition-all group-hover:border-cyan-400/40"></div>
        <div className="absolute top-10 right-10 w-16 h-16 border-t-2 border-r-2 border-white/20 rounded-tr-3xl transition-all group-hover:border-cyan-400/40"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 border-b-2 border-l-2 border-white/20 rounded-bl-3xl transition-all group-hover:border-cyan-400/40"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-white/20 rounded-br-3xl transition-all group-hover:border-cyan-400/40"></div>

        {/* HUD Overlay Bottom */}
        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end z-20 pointer-events-none">
           <div className="px-6 py-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Neural Engine v4.2 Active</span>
              </div>
           </div>
           
           <div className="text-[10px] font-mono text-cyan-400/40 group-hover:text-cyan-400/80 transition-colors uppercase tracking-widest">
              Scan_ID: QR_X8829
           </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalScanner;
