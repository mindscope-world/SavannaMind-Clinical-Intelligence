
import React from 'react';
import { Linkedin, Twitter, Github, Mail, ShieldCheck, Lock, FileText, Activity } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-medical-slate border-t border-white/5 text-slate-400 py-20 px-6 relative overflow-hidden">
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 relative z-10">
        <div className="space-y-8">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <img 
               src="https://api.dicebear.com/7.x/initials/svg?seed=QR&backgroundColor=d4af37,22d3ee" 
               className="w-10 h-10 rounded-full border border-medical-gold/20 shadow-lg shadow-black/50 transition-transform group-hover:scale-110" 
               alt="QuantusRad Logo"
             />
            <span className="text-2xl font-black tracking-tighter text-white">
              Quantus<span className="text-cyan-400">Rad</span>
            </span>
          </div>
          <p className="leading-relaxed text-sm max-w-xs">
            Advancing clinical diagnostics with the world's most sophisticated AI neural pathways. Trusted in 90+ countries.
          </p>
          <div className="flex space-x-4">
            {[Linkedin, Twitter, Github].map((Icon, idx) => (
              <a key={idx} href="#" data-magnetic className="p-3 bg-white/5 hover:bg-cyan-500 hover:text-black rounded-xl transition-all border border-white/5">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-black mb-8 uppercase tracking-[0.4em] text-[10px]">Clinical Portals</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
            <li>
              <button onClick={() => onNavigate('products')} className="group hover:text-cyan-400 transition-colors flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Chest X-Ray (qXR)
                <span className="text-[8px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">PRODUCT</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('products')} className="group hover:text-cyan-400 transition-colors flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Neuro Triage (qER)
                <span className="text-[8px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">PRODUCT</span>
              </button>
            </li>
            <li><button onClick={() => onNavigate('products')} className="hover:text-cyan-400 transition-colors flex items-center gap-2">Vascular AI</button></li>
            <li><button onClick={() => onNavigate('clinical')} className="hover:text-cyan-400 transition-colors flex items-center gap-2">Independent Evidence</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black mb-8 uppercase tracking-[0.4em] text-[10px]">Global Operations</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
            <li><button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors">Our History</button></li>
            <li><button onClick={() => onNavigate('regulatory')} className="hover:text-cyan-400 transition-colors">Compliance Hub</button></li>
            <li><button onClick={() => onNavigate('solutions')} className="hover:text-cyan-400 transition-colors">Enterprise API</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors">Support Registry</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black mb-8 uppercase tracking-[0.4em] text-[10px]">Intelligence Digest</h4>
          <p className="mb-6 text-[11px] leading-relaxed">Secure registration for clinical AI updates and regulatory whitepapers.</p>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                type="email" 
                placeholder="Medical Email"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500 text-xs text-white transition-all placeholder:text-slate-600"
              />
            </div>
            <button data-magnetic className="w-full bg-white hover:bg-cyan-400 text-black py-4 rounded-2xl font-black transition-all transform active:scale-95 shadow-xl shadow-cyan-500/10 uppercase text-[10px] tracking-widest">
              Join Clinical Network
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <p className="text-slate-600">© 2024 QuantusRad Intelligence Inc.</p>
          <div className="h-4 w-px bg-white/5 hidden md:block"></div>
          <p className="text-slate-500">
            Powered By: <span className="text-cyan-400">OpenCurrent</span>
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <button onClick={() => onNavigate('regulatory')} className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
            <Lock size={12} className="text-slate-600 group-hover:text-cyan-400" />
            Privacy Protocol
          </button>
          <button onClick={() => onNavigate('clinical')} className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
            <FileText size={12} className="text-slate-600 group-hover:text-cyan-400" />
            Clinical Terms
          </button>
          <button onClick={() => onNavigate('regulatory')} className="hover:text-cyan-400 transition-colors flex items-center gap-2 group">
            <ShieldCheck size={12} className="text-slate-600 group-hover:text-cyan-400" />
            Data Security
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
