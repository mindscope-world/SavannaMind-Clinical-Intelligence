
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { STATS } from '../constants';

const ImpactCounter: React.FC<{ targetValue: number; label: string; suffix: string; delay: number }> = ({ targetValue, label, suffix, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, targetValue, {
        duration: 2.5,
        ease: "easeOut",
        delay: delay,
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return () => controls.stop();
    }
  }, [isInView, targetValue, delay]);

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="p-6 text-center lg:text-left border-l border-white/5 group"
    >
      <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-500">
        {count.toLocaleString()}{suffix}
      </h2>
      <p className="text-slate-500 uppercase tracking-[0.2em] text-[10px] font-bold">
        {label}
      </p>
    </motion.div>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="py-24 bg-[#011627] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <ImpactCounter 
              key={idx} 
              targetValue={stat.value} 
              label={stat.label} 
              suffix={stat.suffix} 
              delay={idx * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
