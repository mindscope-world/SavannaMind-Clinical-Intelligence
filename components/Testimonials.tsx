
import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000); // Updated to 4 seconds as per request

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-6">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px]"
          >
            Clinical Feedback
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#0A2540] tracking-tighter leading-none"
          >
            Trusted by the <br/><span className="text-slate-400">Pioneers.</span>
          </motion.h2>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                data-magnetic
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentIndex === idx ? 'w-12 bg-blue-600' : 'w-4 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button 
              data-magnetic
              onClick={handlePrev}
              className="p-4 rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              data-magnetic
              onClick={handleNext}
              className="p-4 rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div 
        className="max-w-7xl mx-auto px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative min-h-[500px] lg:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8 group relative">
                  <div className="absolute -inset-4 bg-blue-500/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative bg-slate-50/80 backdrop-blur-sm p-12 lg:p-16 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                    <Quote className="absolute top-12 left-12 text-blue-100 w-24 h-24 -z-0 opacity-40" />
                    <div className="relative z-10 space-y-10">
                      <p className="text-2xl md:text-4xl font-bold text-slate-800 leading-tight tracking-tight">
                        "{TESTIMONIALS[currentIndex].quote}"
                      </p>
                      <div className="flex items-center gap-6 pt-6 border-t border-slate-200/50 w-fit">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-blue-500/10 rounded-full animate-pulse"></div>
                          <img 
                            src={TESTIMONIALS[currentIndex].avatar} 
                            alt={TESTIMONIALS[currentIndex].name}
                            className="relative w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-[#0A2540]">{TESTIMONIALS[currentIndex].name}</h4>
                          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">
                            {TESTIMONIALS[currentIndex].title} — <span className="text-blue-600">{TESTIMONIALS[currentIndex].company}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:col-span-4 lg:flex flex-col gap-6 h-full">
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    {[1, 2, 3, 4].map(i => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-50 border border-slate-100 h-full min-h-[100px] rounded-3xl flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:border-blue-200 transition-all duration-500 cursor-default p-4 text-center"
                      >
                         <div className="font-black text-slate-400 uppercase text-[9px] tracking-widest">Global<br/>Partner</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-blue-600 p-10 rounded-[3rem] text-white flex flex-col justify-center shadow-2xl shadow-blue-600/30"
                  >
                    <h5 className="text-4xl font-black mb-2 tracking-tighter">30M+</h5>
                    <p className="text-blue-100 font-bold uppercase tracking-widest text-[10px] leading-relaxed">
                      Lives transformed through <br/>clinical AI integration.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
