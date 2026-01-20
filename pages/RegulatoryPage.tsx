
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Globe, Download, Lock, CheckCircle, ChevronDown, FileCheck, Mail, ShieldAlert, Award } from 'lucide-react';
import { REGULATORY_BADGES, CLEARANCE_TABLE } from '../constants.tsx';

const RegulatoryPage: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState('Global');

  const filteredClearances = activeRegion === 'Global' 
    ? CLEARANCE_TABLE 
    : CLEARANCE_TABLE.filter(row => row.region === activeRegion);

  const regions = ["Global", "USA", "EU", "Canada"];

  return (
    <div className="min-h-screen bg-medical-dark text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Compliance Hero */}
        <div className="text-center mb-32 space-y-8">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-cyan-400/20"
          >
            <ShieldCheck className="text-cyan-400" size={40} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-9xl font-black tracking-tighter leading-none"
          >
            Global <span className="text-cyan-400">Trust.</span>
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The world's most rigorously cleared medical AI platform. Safe, compliant, and ready for deployment in 90+ jurisdictions.
          </p>
          <div className="flex justify-center gap-6 pt-10">
            <button className="group flex items-center gap-3 bg-white text-black px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl transition-all hover:bg-cyan-400 active:scale-95">
              <Download size={18} /> Compliance Pack (PDF)
            </button>
            <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">
              Regulatory Deep-Dive
            </button>
          </div>
        </div>

        {/* Badge Grid with Grayscale to Color Transition */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-40">
          {REGULATORY_BADGES.map((badge) => (
            <motion.div 
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              className="relative bg-medical-slate/20 border border-white/5 p-12 rounded-[4rem] text-center space-y-6 group overflow-hidden transition-all duration-500 hover:bg-white/[0.05]"
            >
              <div className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center mx-auto mb-8 grayscale group-hover:grayscale-0 group-hover:bg-cyan-500/10 transition-all duration-700 border border-white/5 group-hover:border-cyan-500/20 shadow-inner">
                  {badge.logo === 'ShieldCheck' ? <ShieldCheck className="text-slate-600 group-hover:text-cyan-400" size={48} /> : <Globe className="text-slate-600 group-hover:text-cyan-400" size={48} />}
                </div>
                <h3 className="text-xl font-black text-slate-400 group-hover:text-white transition-colors">{badge.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 group-hover:text-cyan-400 transition-colors mt-2">{badge.region} Certified</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clearance Tables Section */}
        <div className="mb-40 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tighter">Active Product Clearances</h2>
              <div className="w-20 h-1 bg-cyan-500/30 rounded-full"></div>
            </div>
            <div className="flex bg-white/5 p-2 rounded-[2rem] border border-white/10 backdrop-blur-md">
              {regions.map(region => (
                <button 
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeRegion === region ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'}`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-[#0b1e2e]/60 rounded-[4rem] border border-white/5 overflow-hidden shadow-3xl backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/5">
                    <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Clinical Asset</th>
                    <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Registry Body</th>
                    <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Certificate No.</th>
                    <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Region</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {filteredClearances.map((row, i) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        key={i} 
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-12 py-10 font-black text-xl text-white group-hover:text-cyan-400 transition-colors">{row.product}</td>
                        <td className="px-12 py-10 font-bold text-slate-400">{row.body}</td>
                        <td className="px-12 py-10 font-mono text-xs text-slate-500 group-hover:text-white transition-colors">{row.cert}</td>
                        <td className="px-12 py-10">
                          <span className="px-5 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 shadow-sm">
                            {row.region}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Security Deep Dive Layered UX */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-40">
          <div className="space-y-16">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 text-cyan-400 font-mono text-[10px] font-black uppercase tracking-[0.4em]">
                <ShieldAlert size={16} /> Cybersecurity Protocol
              </div>
              <h2 className="text-5xl font-black leading-tight tracking-tighter">Data Privacy <br/>Architecture.</h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                We implement zero-trust data pathways and clinical-grade de-identification as our core standard.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { title: "AES-256 Cloud Encryption", content: "All patient data in transit uses TLS 1.3, while data at rest is encrypted using AES-256 standard on Tier-4 data centers with 99.99% durability." },
                { q: "PHI De-identification", content: "Our edge gateway automatically strips DICOM tags containing PHI (Name, DOB, ID) before the pixels leave the hospital firewall." },
                { q: "SOC2 Type II / GDPR", content: "QuantusRad undergoes annual independent SOC2 Type II audits and is fully compliant with EU GDPR and US HIPAA mandates." }
              ].map((item, i) => (
                <details key={i} className="group bg-white/5 rounded-[2.5rem] border border-white/5 overflow-hidden transition-all hover:bg-white/[0.08] backdrop-blur-md">
                  <summary className="flex items-center justify-between p-10 cursor-pointer list-none">
                    <span className="text-lg font-bold flex items-center gap-6">
                      <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                        <Lock size={20} />
                      </div>
                      {item.title || item.q}
                    </span>
                    <ChevronDown size={20} className="text-slate-500 group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <div className="px-10 pb-10 text-slate-400 leading-relaxed text-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-8 bg-black/40 rounded-3xl border border-white/5 border-dashed">
                      {item.content}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="relative sticky top-32">
            <div className="absolute -inset-20 bg-cyan-500/5 rounded-full blur-[120px] animate-pulse"></div>
            <div className="relative glass p-12 lg:p-16 rounded-[5rem] border border-white/10 space-y-12 shadow-3xl overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 text-white">
                 <Award size={200} />
              </div>
              
              <div className="relative z-10 w-24 h-24 bg-cyan-500 rounded-[2.5rem] flex items-center justify-center shadow-3xl shadow-cyan-500/40 mx-auto mb-10 transform -rotate-6">
                <FileCheck className="text-black" size={48} />
              </div>
              
              <div className="text-center space-y-6 relative z-10">
                <h3 className="text-4xl font-black tracking-tighter">Audit Portal</h3>
                <p className="text-slate-400 leading-relaxed max-w-xs mx-auto text-lg">Direct access for Institutional Review Boards and Compliance Officers.</p>
              </div>

              <div className="space-y-4 relative z-10">
                {[
                  "SOC2 Type II Assurance Report",
                  "Privacy Impact Assessment (PIA)",
                  "Cyber Liability Certificate",
                  "Anonymization Protocol Whitepaper"
                ].map((li, i) => (
                  <div key={i} className="flex items-center gap-5 p-5 bg-white/5 border border-white/5 rounded-[1.5rem] hover:bg-white/10 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                      <CheckCircle size={18} />
                    </div>
                    <span className="text-sm font-bold text-slate-300">{li}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-xs transition-all transform active:scale-95 shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-4 relative z-10">
                <Mail size={18} /> Contact Compliance Officer
              </button>
              
              <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 relative z-10">
                Avg. Lead Time: 4-6 Business Hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryPage;
