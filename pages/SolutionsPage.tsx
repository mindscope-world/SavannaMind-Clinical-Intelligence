
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Activity, ShieldCheck, HelpCircle } from 'lucide-react';

const SolutionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-medical-dark text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-6">
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter">Clinical <span className="text-cyan-400">Pathways.</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">From screening to triage, we optimize every stage of the medical journey.</p>
        </div>

        {/* Workflow Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="space-y-12">
            {[
              { step: "01", title: "Capture & Transmit", desc: "Scans are securely uploaded from PACS to our encrypted clinical cloud.", icon: Zap },
              { step: "02", title: "AI Neural Analysis", desc: "32 deep learning models evaluate the data for 50+ abnormal findings.", icon: Layers },
              { step: "03", title: "Instant Report Generation", desc: "Results and heatmaps delivered back to clinician within seconds.", icon: Activity }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-cyan-400 font-black font-mono group-hover:bg-cyan-400 group-hover:text-black transition-all">
                  {item.step}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
            <svg viewBox="0 0 500 500" className="w-full h-auto">
              {/* Cloud Center */}
              <circle cx="250" cy="250" r="80" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="10 5" className="animate-[spin_20s_linear_infinite]" />
              <circle cx="250" cy="250" r="60" fill="#22d3ee" fillOpacity="0.1" />
              <text x="250" y="255" textAnchor="middle" fill="#22d3ee" className="text-xs font-black uppercase tracking-widest font-mono">Quantus_Cloud</text>
              
              {/* Satellites */}
              {[
                { x: 100, y: 100, label: "PACS" },
                { x: 400, y: 100, label: "CLINIC" },
                { x: 100, y: 400, label: "MOBILE" },
                { x: 400, y: 400, label: "PACS" }
              ].map((sat, i) => (
                <g key={i}>
                  <line x1="250" y1="250" x2={sat.x} y2={sat.y} stroke="#22d3ee" strokeOpacity="0.2" />
                  <circle cx={sat.x} cy={sat.y} r="30" fill="#0b1e2e" stroke="#22d3ee" strokeWidth="1" />
                  <text x={sat.x} y={sat.y + 5} textAnchor="middle" fill="#fff" className="text-[10px] font-bold uppercase">{sat.label}</text>
                  <circle cx={sat.x} cy={sat.y} r="5" fill="#22d3ee">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                  </circle>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Problem-Solution Accordions */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-widest mb-12">The Quantus Impact</h2>
          {[
            { q: "Clinician Burnout & Workload", a: "By triaging normal scans instantly, we allow radiologists to focus on complex cases, reducing diagnostic fatigue by up to 35%." },
            { q: "Detection of Subtle Anomalies", a: "Our AI highlights findings that can be easily missed in high-volume settings, such as tiny nodules or early-stage infarcts." },
            { q: "Remote Area Access", a: "Deployable in low-resource settings via edge hardware, bringing specialist-grade diagnostics to the most remote corners of the world." }
          ].map((item, i) => (
            <details key={i} className="group bg-white/5 rounded-3xl border border-white/5 overflow-hidden transition-all hover:bg-white/10">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <span className="text-xl font-bold flex items-center gap-4">
                  <HelpCircle className="text-cyan-400" />
                  {item.q}
                </span>
                <span className="transition-transform group-open:rotate-180"><Layers /></span>
              </summary>
              <div className="px-8 pb-8 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-4 pt-4">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
