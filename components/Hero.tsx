
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headline = "QuantusRad: Clinical Intelligence Redefined";
  const words = headline.split(" ");
  
  const subtitleText = "Empowering doctors with high-fidelity deep learning diagnostics. QuantusRad is currently active at";
  const subtitleWords = subtitleText.split(" ");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
  };

  const subtitleContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 1.0, // Delay to start after headline words are mostly visible
      }
    }
  };

  const subtitleItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero px-6">
      {/* Dynamic Background Parallax */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none grayscale brightness-50"
        style={{ 
          transform: `translateY(${offset * 0.3}px) scale(1.1)`,
          backgroundImage: `url('https://images.unsplash.com/photo-1579154235884-331505f56284?auto=format&fit=crop&q=80&w=2070')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'plus-lighter'
        }}
      />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-32">
        <div className="flex flex-col space-y-10">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-x-5"
          >
            {words.map((word, i) => (
              <motion.span 
                key={i}
                variants={item}
                className={`text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter ${word.includes('QuantusRad') ? 'text-cyan-400' : 'text-white'}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.p 
            variants={subtitleContainer}
            initial="hidden"
            animate="show"
            className="text-xl md:text-2xl text-slate-400 max-w-xl leading-relaxed font-medium"
          >
            {subtitleWords.map((word, i) => (
              <motion.span key={i} variants={subtitleItem} className="inline-block mr-1.5">
                {word}
              </motion.span>
            ))}
            <motion.span variants={subtitleItem} className="text-white inline-block font-bold">
              3,000+ clinical sites
            </motion.span>
            <motion.span variants={subtitleItem} className="inline-block ml-1">
              worldwide.
            </motion.span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start gap-6"
          >
            <button data-magnetic className="relative group overflow-hidden bg-cyan-400 text-black px-12 py-5 rounded-2xl font-black text-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all transform active:scale-95 uppercase tracking-widest">
              <span className="relative z-10">Request Pilot</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button data-magnetic className="px-12 py-5 rounded-2xl font-black text-lg text-white border-2 border-white/10 hover:border-cyan-400/50 hover:bg-white/5 transition-all flex items-center gap-3 uppercase tracking-widest">
              See the Tech
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            </button>
          </motion.div>
        </div>

        {/* HUD UI Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="hidden lg:flex justify-end relative"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-cyan-500/20 rounded-[3rem] blur-2xl animate-pulse"></div>
            <div className="relative bg-[#011627]/80 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-2xl w-full max-w-md shadow-3xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white tracking-widest uppercase">QR_V4 Metrics</h3>
                <span className="text-xs font-mono text-cyan-400">ENCRYPTED_STREAM</span>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "Voxel Processing", val: "98.2%", color: "bg-cyan-500" },
                  { label: "Diagnostic Accuracy", val: "99.9%", color: "bg-medical-gold" },
                  { label: "Global Nodes", val: "1,242", color: "bg-blue-500" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span>{stat.label}</span>
                      <span className="text-white">{stat.val}</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: stat.val }}
                        transition={{ duration: 2, delay: 2.0 + (i * 0.2) }}
                        className={`h-full ${stat.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-4 border border-cyan-500/20 rounded-xl bg-cyan-500/5">
                <p className="text-[10px] font-mono text-cyan-400/70 leading-relaxed">
                  // QUANTUSRAD_SYS_V4.2<br/>
                  // CORE_NEURAL_LINK: ONLINE<br/>
                  // SYNCING_GLOBAL_PATHWAYS...
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Intelligence</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
