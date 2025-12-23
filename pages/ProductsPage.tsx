
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Settings, Clock, BarChart3, ChevronRight, CheckCircle2, FileText, ShieldCheck, Lock } from 'lucide-react';
import MedicalScanner from '../components/MedicalScanner.tsx';
import ClinicalEvidencePage from './ClinicalEvidencePage.tsx';
import RegulatoryPage from './RegulatoryPage.tsx';

const FeaturesContent: React.FC<{ sliderPos: number; handleSliderChange: (e: any) => void }> = ({ sliderPos, handleSliderChange }) => {
  const specs = [
    { label: "Sensitivity", value: "97.4%", icon: BarChart3 },
    { label: "Specificity", value: "95.1%", icon: Settings },
    { label: "Processing Time", value: "< 2.5s", icon: Clock },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-10">
          <h1 className="text-6xl lg:text-[100px] font-black tracking-tighter leading-[0.9] text-white">
            sXR: The Future <br/>
            of <span className="text-cyan-400">Chest Triage.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
            SavannaMind's clinical-grade AI detects 30+ chest abnormalities with sub-millimeter precision, triaging patients instantly.
          </p>
          
          <div className="grid grid-cols-3 gap-6">
            {specs.map((spec, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all">
                <spec.icon className="text-cyan-400 mb-4" size={24} />
                <div className="text-3xl font-black text-white leading-none mb-2">{spec.value}</div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-10 bg-cyan-500/5 rounded-full blur-[100px] animate-pulse"></div>
          {/* Medical Scanner with Spotlight Bulb Effect */}
          <MedicalScanner 
            src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=2000" 
            alt="Chest X-Ray Diagnostic Overlay" 
          />
        </div>
      </div>

      <section className="py-20 border-t border-white/5">
        <div className="mb-20 space-y-4">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Capabilities</div>
          <h2 className="text-4xl font-black tracking-tighter">Deep Learning Engine V4</h2>
          <div className="w-24 h-1 bg-cyan-500 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { title: "Nodule Detection", desc: "Automated flagging of pulmonary nodules as small as 3mm with confidence heatmaps.", icon: Settings },
            { title: "TB Screening", desc: "WHO-compliant triage for high-burden community programs with digital reports.", icon: BarChart3 },
            { title: "Longitudinal Tracking", desc: "Temporal registration of scans to monitor progression or regression over time.", icon: Clock },
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                 <item.icon size={100} />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-cyan-500 transition-all duration-500">
                <item.icon className="text-cyan-400 group-hover:text-black" size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <p className="text-slate-400 text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

const ProductsPage: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState('FEATURES');

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  const tabs = ["FEATURES", "CLINICAL EVIDENCE", "REGULATORY"];

  return (
    <div className="min-h-screen bg-medical-dark text-white">
      {/* Tab Navigation matching user screenshot style */}
      <div className="sticky top-20 z-40 bg-medical-dark/95 backdrop-blur-xl border-b border-white/5 py-8 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex gap-16 mb-2">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all ${
                  activeTab === tab ? 'text-cyan-400' : 'text-slate-500 hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <AnimatePresence mode="wait">
          {activeTab === 'FEATURES' && (
            <FeaturesContent key="features" sliderPos={sliderPos} handleSliderChange={handleSliderChange} />
          )}
          {activeTab === 'CLINICAL EVIDENCE' && (
            <motion.div key="evidence" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-12">
                 <h2 className="text-3xl font-black uppercase tracking-widest mb-4">sXR Evidence</h2>
                 <p className="text-slate-500">Filtered clinical studies specifically for SavannaMind Chest X-ray solutions.</p>
              </div>
              <ClinicalEvidencePage />
            </motion.div>
          )}
          {activeTab === 'REGULATORY' && (
            <motion.div key="regulatory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-12">
                 <h2 className="text-3xl font-black uppercase tracking-widest mb-4">sXR Regulatory</h2>
                 <p className="text-slate-500">Global clearance status and security whitepapers for sXR deployment.</p>
              </div>
              <RegulatoryPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductsPage;
