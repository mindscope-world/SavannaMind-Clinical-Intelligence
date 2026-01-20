
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CoreTechnology: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [1.1, 1]);

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black border-y border-white/5">
      {/* Background Image - The provided skeleton image */}
      <motion.div 
        style={{ 
          y, 
          scale,
          backgroundImage: `url('https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=2070')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute inset-0 opacity-40 grayscale"
      >
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-medical-dark via-transparent to-medical-dark"></div>
      </motion.div>

      {/* HUD Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-medical-gold"></span>
              <span className="text-medical-gold font-mono text-[10px] font-bold tracking-[0.3em] uppercase">QuantusRad Intelligence V.001</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight">
              Clinical <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-gold via-white to-cyan-400">Authority.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Our neural core identifies complex pathologies through the lens of millions of clinical data points, ensuring no detail is overlooked.
            </p>
            <div className="pt-6 flex gap-4">
               <div className="p-4 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <div className="text-xs font-mono text-cyan-400/60 mb-1 tracking-widest uppercase">Neural Density</div>
                  <div className="text-2xl font-black text-white">0.85mm</div>
               </div>
               <div className="p-4 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <div className="text-xs font-mono text-cyan-400/60 mb-1 tracking-widest uppercase">Certainty</div>
                  <div className="text-2xl font-black text-white">99.8%</div>
               </div>
            </div>
          </motion.div>

          {/* Floating HUD Annotations */}
          <div className="hidden lg:block relative">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 p-6 border border-cyan-400/20 rounded-3xl bg-cyan-500/5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest">QUANTUSRAD_SCAN_001</span>
                <div className="w-2 h-2 rounded-full bg-medical-gold animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-1 w-48 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "80%" }}
                    className="h-full bg-medical-gold"
                  />
                </div>
                <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    className="h-full bg-cyan-400"
                  />
                </div>
              </div>
              <div className="mt-6 font-mono text-[8px] text-slate-500">
                CORE_ID: QR_X_4492<br/>
                LOCATION: CLOUD_NODE_09<br/>
                STATUS: ANALYZING_VOLUMETRIC_DATA
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Corner Brackets decoration */}
      <div className="absolute top-12 left-12 w-12 h-12 border-t-2 border-l-2 border-white/10"></div>
      <div className="absolute bottom-12 right-12 w-12 h-12 border-b-2 border-r-2 border-white/10"></div>
    </section>
  );
};

export default CoreTechnology;
