
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Trophy, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-medical-dark text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="space-y-8">
            <h1 className="text-6xl font-black tracking-tighter">Decade of <span className="text-cyan-400">Scale.</span></h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Founded in 2016, Qure.ai has grown from a specialized research lab to the world's most adopted AI platform, serving over 30 million patients across 90 countries.
            </p>
            <div className="flex gap-12 pt-4">
              <div>
                <div className="text-4xl font-black">200+</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Experts</div>
              </div>
              <div>
                <div className="text-4xl font-black">15+</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Countries</div>
              </div>
              <div>
                <div className="text-4xl font-black">FDA</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Cleared</div>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <svg viewBox="0 0 500 500" className="w-full h-full grayscale opacity-40">
              {/* Minimal SVG Map Placeholder */}
              <path d="M100 150 Q 150 100 200 150 T 300 150 T 400 150" fill="none" stroke="#fff" strokeOpacity="0.2" />
              <path d="M50 250 Q 150 300 250 250 T 450 250" fill="none" stroke="#fff" strokeOpacity="0.2" />
              {/* Pulsing Dots */}
              {[
                { x: 120, y: 140 }, { x: 380, y: 160 }, { x: 250, y: 320 }, { x: 420, y: 380 }, { x: 180, y: 410 }
              ].map((dot, i) => (
                <g key={i}>
                  <circle cx={dot.x} cy={dot.y} r="4" fill="#22d3ee" />
                  <circle cx={dot.x} cy={dot.y} r="15" fill="#22d3ee" fillOpacity="0.2" className="animate-ping" />
                </g>
              ))}
            </svg>
            <div className="absolute bottom-10 right-10 bg-black/50 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex items-center gap-4">
               <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-black font-black">90+</div>
               <div className="text-xs font-bold uppercase tracking-widest">Countries Reached</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-widest text-center mb-20">Our Journey</h2>
          {[
            { year: "2016", title: "Inception", desc: "Launched first deep learning models for chest imaging." },
            { year: "2018", title: "Global Expansion", desc: "First international deployments across Europe and SEA." },
            { year: "2020", title: "FDA Clearance", desc: "qXR receives clearance for automated triage." },
            { year: "2023", title: "30M+ Patients", desc: "Reached milestone of touching 30 million lives globally." }
          ].map((milestone, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-12 relative"
            >
              {i < 3 && <div className="absolute left-[23px] top-12 bottom-0 w-[2px] bg-white/10"></div>}
              <div className="w-12 h-12 flex-shrink-0 rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400 font-bold z-10">
                <MapPin size={18} />
              </div>
              <div className="pb-16">
                <div className="text-cyan-400 font-black text-2xl mb-1">{milestone.year}</div>
                <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                <p className="text-slate-400 leading-relaxed">{milestone.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
