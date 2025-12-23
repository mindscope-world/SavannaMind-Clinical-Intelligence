
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, ExternalLink, Filter, X, BarChart3, ArrowRight, Download, Copy } from 'lucide-react';
import { CLINICAL_STUDIES } from '../constants.tsx';

const StudyCard: React.FC<{ study: any; onOpenAbstract: (study: any) => void }> = ({ study, onOpenAbstract }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-medical-slate/40 border border-white/5 p-8 rounded-[2.5rem] group hover:bg-white/[0.08] transition-all flex flex-col h-full shadow-lg backdrop-blur-sm"
    >
      <div className="flex justify-between items-start mb-6">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-lg border border-cyan-400/20">
          {study.journal.name}
        </span>
        {study.is_featured && (
          <span className="text-[9px] bg-medical-gold/10 text-medical-gold border border-medical-gold/20 px-3 py-1 rounded-full font-black uppercase tracking-wider">
            Featured
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-tight">
        {study.title}
      </h3>
      <p className="text-slate-400 italic text-sm mb-6">
        {study.authors}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {study.tags.care_area.map((tag: string) => (
          <span key={tag} className="text-[10px] font-bold text-slate-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>

      {study.metrics && (
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 mb-8 bg-black/20 rounded-2xl px-6">
          {study.metrics.map((metric: any) => (
            <div key={metric.label}>
              <div className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1">{metric.label}</div>
              <div className="text-2xl font-black text-cyan-400">{metric.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between pt-4">
        <button 
          onClick={() => onOpenAbstract(study)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-cyan-400 transition-colors"
        >
          <FileText size={16} className="text-cyan-400" />
          View Abstract
        </button>
        <a 
          href={study.journal.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 bg-white/5 hover:bg-cyan-500 hover:text-black rounded-full transition-all"
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

  const careAreas = ["Lung Health", "Neurocritical Care", "TB", "Stroke", "Public Health"];

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
    <div className="min-h-screen bg-medical-dark text-white py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Evidence Count Hero */}
        <div className="text-center mb-24 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block"
          >
            <div className="text-[80px] lg:text-[120px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">
              200+
            </div>
            <div className="text-xl font-black uppercase tracking-[0.4em] text-cyan-400 -mt-4">
              Peer-Reviewed Publications
            </div>
          </motion.div>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Establishing the trust backbone of diagnostic AI through rigorous, independent clinical validation.
          </p>
        </div>

        {/* Search Bar with Auto-suggest feel */}
        <div className="relative max-w-2xl mx-auto mb-20 group">
          <div className="absolute -inset-1 bg-cyan-400/20 rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
            <input 
              type="text" 
              placeholder="Search by Sensitivity, Author, or Pathology..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-lg focus:outline-none focus:border-cyan-400 transition-all placeholder:text-slate-600 shadow-2xl"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sticky Filter Sidebar */}
          <aside className="lg:w-72 space-y-12 lg:sticky lg:top-32 h-fit">
            <div className="pb-8 border-b border-white/5">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Library Status</div>
              <div className="text-4xl font-black">{filteredStudies.length} <span className="text-slate-500 text-xl font-bold">Results</span></div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-6 flex items-center gap-2">
                  <Filter size={14} /> Care Areas
                </h3>
                <div className="flex flex-col gap-4">
                  {careAreas.map(area => (
                    <label key={area} className="flex items-center gap-4 group cursor-pointer">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          checked={selectedCareAreas.includes(area)}
                          onChange={() => toggleFilter(area)}
                          className="peer appearance-none w-5 h-5 border border-white/20 rounded bg-white/5 checked:bg-cyan-500 checked:border-transparent transition-all cursor-pointer"
                        />
                        <X size={12} className="absolute left-1 text-black opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      <span className={`text-sm font-bold transition-colors ${selectedCareAreas.includes(area) ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                        {area}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {selectedCareAreas.length > 0 && (
              <button 
                onClick={() => setSelectedCareAreas([])}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-cyan-400 transition-colors underline underline-offset-8"
              >
                Clear all filters
              </button>
            )}
          </aside>

          {/* Evidence Grid */}
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              {filteredStudies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredStudies.map(study => (
                    <StudyCard key={study.id} study={study} onOpenAbstract={setActiveStudy} />
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-40 text-center space-y-6">
                  <div className="text-5xl font-black text-slate-800">No Evidence Found</div>
                  <p className="text-slate-500 max-w-sm mx-auto">Try widening your care area filters or search criteria.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Abstract Modal / Side Panel */}
      <AnimatePresence>
        {activeStudy && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStudy(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-xl bg-medical-dark border-l border-white/10 z-[101] shadow-2xl p-12 overflow-y-auto"
            >
              <button onClick={() => setActiveStudy(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
                <X size={32} />
              </button>
              
              <div className="space-y-10 pt-12">
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">{activeStudy.journal.name}</span>
                  <h2 className="text-3xl font-black leading-tight">{activeStudy.title}</h2>
                  <p className="text-slate-400 font-medium italic">{activeStudy.authors}</p>
                </div>

                <div className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Abstract Preview</h4>
                  <p className="text-slate-300 leading-relaxed text-lg italic">
                    {activeStudy.abstract_preview}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <a 
                    href={activeStudy.journal.link} 
                    target="_blank" 
                    className="flex items-center justify-center gap-3 bg-cyan-500 text-black py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-cyan-500/20"
                  >
                    Download PDF <ExternalLink size={16} />
                  </a>
                  <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">
                    Copy Citation
                  </button>
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
