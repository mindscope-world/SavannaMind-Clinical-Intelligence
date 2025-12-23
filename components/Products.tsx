
import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants.tsx';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import MedicalScanner from './MedicalScanner.tsx';

const ProductSection: React.FC<{ product: typeof PRODUCTS[0]; index: number }> = ({ product, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center py-24`}
    >
      <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'} space-y-8`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-[10px] tracking-[0.2em] uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          {product.subtitle}
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
          {product.title}
        </h2>
        
        <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
          {product.description}
        </p>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.features.map((feature, i) => (
            <motion.li 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="flex items-center gap-3 text-slate-300 font-medium group"
            >
              <CheckCircle2 className="text-cyan-400 group-hover:scale-125 transition-transform" size={18} />
              <span className="text-sm tracking-wide">{feature}</span>
            </motion.li>
          ))}
        </ul>
        
        <div className="pt-6">
          <button className="group relative px-8 py-4 bg-white text-black font-extrabold rounded-xl hover:bg-cyan-400 transition-all duration-300 flex items-center gap-3">
            EXPLORE {product.id}
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'} relative`}>
        <MedicalScanner src={product.imageUrl} alt={product.title} />
      </div>
    </motion.div>
  );
};

const Products: React.FC = () => {
  return (
    <section id="products" className="py-20 bg-[#011627]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-6">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-500 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            Clinical Excellence
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white"
          >
            Diagnostics Reinvented
          </motion.h2>
          <div className="w-24 h-1 bg-cyan-500/30 mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-12">
          {PRODUCTS.map((product, idx) => (
            <ProductSection key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
