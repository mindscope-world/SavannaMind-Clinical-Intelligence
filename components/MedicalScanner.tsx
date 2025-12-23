
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

interface MedicalScannerProps {
  src: string;
  alt: string;
}

const MedicalScanner: React.FC<MedicalScannerProps> = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor movement
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Mask template for the spotlight bulb effect
  const maskImage = useMotionTemplate`radial-gradient(
    250px circle at ${smoothX}px ${smoothY}px,
    black 0%,
    rgba(0, 0, 0, 0.8) 40%,
    transparent 80%
  )`;

  return (
    <div className="flex flex-col gap-4">
      {/* Label above the scanner */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-white tracking-tight">Anomalous Analysis Engine</span>
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
          className="w-full h-full object-cover grayscale brightness-[0.15] contrast-125 transition-all duration-700"
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
            className="w-full h-full object-cover grayscale-0 brightness-110 contrast-110 shadow-inner"
          />
        </motion.div>

        {/* Spotlight "Glow" Ring decoration */}
        <motion.div
          className="absolute z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            left: smoothX,
            top: smoothY,
            x: "-50%",
            y: "-50%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)",
            border: "1px solid rgba(34, 211, 238, 0.1)"
          }}
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
             <div className="w-16 h-16 border border-cyan-400/50 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
             </div>
             {/* Dynamic Coordinates */}
             <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 text-[8px] font-mono text-cyan-400 whitespace-nowrap bg-black/40 px-2 py-1 rounded backdrop-blur-md border border-cyan-400/20">
                X: {Math.round(mouseX.get())} / Y: {Math.round(mouseY.get())}<br/>
                SCANNING_REGION_0X4
             </div>
          </div>
        </motion.div>

        {/* AI Bounding Box (Revealed when scanning or always present for high-tech feel) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="relative w-1/2 h-1/2 border border-cyan-400/20 rounded-sm">
            <div className="absolute inset-2 border border-cyan-400/10 rounded-sm"></div>
            
            {/* Label in Box */}
            <div className="absolute top-4 left-4 flex flex-col gap-1">
              <span className="text-[8px] font-mono text-cyan-400 opacity-60">SM_AI_VALIDATED</span>
              <div className="w-8 h-[1px] bg-cyan-400/30"></div>
              <span className="text-[10px] font-black text-white uppercase tracking-tighter">Diagnostic Overlay</span>
            </div>
          </div>
        </motion.div>

        {/* The Animated Scanning Line (Stays on top but behind cursor lens) */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none mix-blend-screen"
          style={{
              boxShadow: '0 0 20px 2px rgba(34, 211, 238, 0.4)',
              background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)'
          }}
          animate={{ top: ["5%", "95%", "5%"] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Corner Brackets */}
        <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-white/20 rounded-tl-xl transition-all group-hover:border-cyan-400/40"></div>
        <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-white/20 rounded-tr-xl transition-all group-hover:border-cyan-400/40"></div>
        <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-white/20 rounded-bl-xl transition-all group-hover:border-cyan-400/40"></div>
        <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-white/20 rounded-br-xl transition-all group-hover:border-cyan-400/40"></div>

        {/* HUD Elements */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Active Neural Link</span>
           </div>
           <div className="w-px h-3 bg-white/10"></div>
           <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">FPS: 60.0</span>
        </div>
      </div>
    </div>
  );
};

export default MedicalScanner;
