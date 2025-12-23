
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, ExternalLink, Filter, X, BarChart3, Download, Copy, Bookmark } from 'lucide-react';
import { CLINICAL_STUDIES } from '../constants.tsx';

const StudyCard: React.FC<{ study: any; onOpenAbstract: (study: any) => void }> = ({ study, onOpenAbstract }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grainy-glass p-8 rounded-[2.5rem] group flex flex-col h-full shadow-lg transition-all duration-500 hover:border-cyan-400/30 bento-card"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-lg border border-cyan-400/20 w-fit">
            {study.journal.name}
          </span>
          <span className="text-[10px] font-mono text-slate-500 mt-1">{study.publication_date}</span>
        </div>
        {study.is_featured && (
          <div className="flex items-center gap-2 text-[9px] bg-medical-gold/10 text-medical-gold border border-medical-gold/20 px-3 py-1.5 rounded-full font-black uppercase tracking-wider">
            <Bookmark size={10} fill="currentColor" />
            Featured Proof
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-tight">
        {study.title}
      </h3>
      <p className="text-slate-400 italic text-sm mb-6 font-medium">
        {study.authors}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {study.tags.care_area.map((tag: string) => (
          <span key={tag} className="text-[10px] font-bold text-slate-300 bg-white/5 border border-white/10 px-2 py-1 rounded-md uppercase tracking-tighter">
            {tag}
          </span>
        ))}
      </div>

      {study.metrics && (
        <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5 mb-8 bg-black/30 rounded-3xl px-6">
          {study.metrics.map((metric: any) => (
            <div key={metric.label} className="space-y-1">
              <div className="text-[8px] uppercase font-black text-slate-500 tracking-[0.2em]">{metric.label}</div>
              <div className="text-2xl font-black text-cyan-400 tracking-tighter">{metric.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between pt-4">
        <button 
          data-magnetic
          onClick={() => onOpenAbstract(study)}
          className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-cyan-400 transition-colors py-2 px-1"
        >
          <FileText size={16} className="text-cyan-400" />
          View Abstract
        </button>
        <a 
          data-magnetic
          href={study.journal.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 bg-white/5 hover:bg-cyan-500 hover:text-black rounded-2xl transition-all border border-white/10"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </motion.div>
  );
};

const ClinicalEvidencePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCareAreas, setSelectedCareAreas] = useState<string[]>([]);
  const [activeStudy, setActiveStudy] = useState<any | null>(null);

  const careAreas = ["Lung Health", "Neurocritical Care", "TB", "Stroke", "Public Health", "Chest X-ray"];

  const filteredStudies = useMemo(() => {
    return CLINICAL_STUDIES.filter(study => {
      const matchesSearch = study.title.toLowerCase().includes(search.toLowerCase()) || 
                          study.authors.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = selectedCareAreas.length === 0 || 
                           study.tags.care_area.some(tag => selectedCareAreas.includes(tag));
      return matchesSearch && matchesFilter;
    });
  }, [search, selectedCareAreas]);

  const toggleFilter = (area: string) => {
    setSelectedCareAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  return (
    <div className="min-h-screen bg-medical-dark text-white py-20 px-6 relative overflow-hidden">
      {/* Decorative Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-40"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-medical-gold/5 rounded-full blur-[100px] pointer-events-none -ml-40 -mb-40"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Evidence Count Hero */}
        <div className="text-center mb-24 space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <div className="text-[100px] lg:text-[150px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 select-none">
              200+
            </div>
            <div className="text-xl font-black uppercase tracking-[0.5em] text-cyan-400 -mt-6">
              Peer-Reviewed Proofs
            </div>
          </motion.div>
          <p className="text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Establishing the trust backbone of diagnostic AI through rigorous, independent clinical validation across the globe.
          </p>
        </div>

        {/* Search & Filter bar combined */}
        <div className="relative max-w-3xl mx-auto mb-20 group">
          <div className="absolute -inset-1 bg-cyan-400/20 rounded-[2.5rem] blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
            <input 
              type="text" 
              placeholder="Filter by Pathology, Author, or Metric..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] py-7 pl-20 pr-10 text-xl focus:outline-none focus:border-cyan-400 transition-all placeholder:text-slate-600 shadow-2xl backdrop-blur-xl"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sticky Filter Sidebar */}
          <aside className="lg:w-72 space-y-12 lg:sticky lg:top-32 h-fit">
            <div className="pb-8 border-b border-white/5">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Live Registry</div>
              <div className="text-5xl font-black tracking-tighter">{filteredStudies.length} <span className="text-slate-600 text-xl font-bold uppercase tracking-widest">Studies</span></div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-8 flex items-center gap-3">
                  <Filter size={14} /> Care Context
                </h3>
                <div className="flex flex-col gap-6">
                  {careAreas.map(area => (
                    <label key={area} className="flex items-center gap-4 group cursor-pointer" data-magnetic>
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          checked={selectedCareAreas.includes(area)}
                          onChange={() => toggleFilter(area)}
                          className="peer appearance-none w-6 h-6 border border-white/20 rounded-lg bg-white/5 checked:bg-cyan-500 checked:border-transparent transition-all cursor-pointer"
                        />
                        <X size={14} className="absolute left-1.5 text-black opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      <span className={`text-sm font-black uppercase tracking-widest transition-colors ${selectedCareAreas.includes(area) ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                        {area}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {selectedCareAreas.length > 0 && (
              <button 
                data-magnetic
                onClick={() => setSelectedCareAreas([])}
                className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-cyan-400 transition-colors border border-white/5 rounded-2xl bg-white/5"
              >
                Reset Filters
              </button>
            )}
          </aside>

          {/* Evidence Grid */}
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              {filteredStudies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {filteredStudies.map((study, idx) => (
                    <StudyCard key={study.id} study={study} onOpenAbstract={setActiveStudy} />
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-40 text-center space-y-10">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                    <Search className="text-slate-600" size={40} />
                  </div>
                  <div className="space-y-4">
                    <div className="text-4xl font-black text-slate-800">Criteria Mismatch</div>
                    <p className="text-slate-500 max-w-sm mx-auto">No independent publications match your current parameters.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Abstract Modal - High-End Side Panel */}
      <AnimatePresence>
        {activeStudy && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStudy(null)}
              className="fixed inset-0 bg-medical-dark/90 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-2xl bg-medical-dark border-l border-white/10 z-[101] shadow-3xl overflow-y-auto grainy-glass shadow-cyan-500/5"
            >
              <div className="sticky top-0 p-8 flex justify-end bg-medical-dark/50 backdrop-blur-xl z-10">
                 <button 
                  data-magnetic
                  onClick={() => setActiveStudy(null)} 
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group"
                 >
                   <X size={24} className="group-hover:rotate-90 transition-transform" />
                 </button>
              </div>
              
              <div className="px-12 pb-20 space-y-12">
                <div className="space-y-6">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-cyan-400 bg-cyan-400/5 px-4 py-2 rounded-xl border border-cyan-400/20">{activeStudy.journal.name}</span>
                  <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tighter">{activeStudy.title}</h2>
                  <div className="flex items-center gap-4 text-slate-400 font-medium italic text-lg border-l-2 border-cyan-400 pl-6">
                    {activeStudy.authors}
                  </div>
                </div>

                <div className="bg-black/40 p-10 rounded-[3rem] border border-white/10 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <FileText size={120} />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Peer-Reviewed Abstract</h4>
                  <p className="text-slate-300 leading-relaxed text-xl font-light">
                    {activeStudy.abstract_preview}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <a 
                    data-magnetic
                    href={activeStudy.journal.link} 
                    target="_blank" 
                    className="flex items-center justify-center gap-4 bg-cyan-500 text-black py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-cyan-500/30 transition-all active:scale-95"
                  >
                    Download Full Text <ExternalLink size={18} />
                  </a>
                  <button 
                    data-magnetic
                    className="flex items-center justify-center gap-4 bg-white/5 border border-white/10 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all active:scale-95"
                  >
                    Copy APA Citation <Copy size={18} />
                  </button>
                </div>

                <div className="pt-12 border-t border-white/5">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">Metadata Analysis</h5>
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      { label: "Study Type", value: activeStudy.tags.asset_type[0] },
                      { label: "Date of Release", value: activeStudy.publication_date },
                      { label: "Clinical Modality", value: activeStudy.tags.modality[0] }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-6 bg-white/5 rounded-2xl border border-white/5">
                        <span className="text-sm font-bold text-slate-500">{item.label}</span>
                        <span className="text-sm font-black text-white uppercase tracking-widest">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClinicalEvidencePage;
