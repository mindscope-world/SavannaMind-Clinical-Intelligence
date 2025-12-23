
import React from 'react';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-medical-slate border-t border-white/5 text-slate-400 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <img 
               src="https://api.dicebear.com/7.x/initials/svg?seed=SM&backgroundColor=d4af37,22d3ee" 
               className="w-8 h-8 rounded-full border border-medical-gold/20" 
               alt="SavannaMind Logo"
             />
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Savanna<span className="text-cyan-400">Mind</span>
            </span>
          </div>
          <p className="leading-relaxed">
            Advancing clinical diagnostics with the world's most sophisticated AI neural pathways.
          </p>
          <div className="flex space-x-4">
            {[Linkedin, Twitter, Github].map((Icon, idx) => (
              <a key={idx} href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Solutions</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><button onClick={() => onNavigate('products')} className="hover:text-cyan-400 transition-colors">Chest X-Ray (sXR)</button></li>
            <li><button onClick={() => onNavigate('products')} className="hover:text-cyan-400 transition-colors">Neuro Triage (sER)</button></li>
            <li><button onClick={() => onNavigate('products')} className="hover:text-cyan-400 transition-colors">Vascular AI</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors">About SavannaMind</button></li>
            <li><button onClick={() => onNavigate('solutions')} className="hover:text-cyan-400 transition-colors">Global Impact</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors">Contact</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Intelligence Digest</h4>
          <p className="mb-6 text-xs leading-relaxed">Join 50k+ medical professionals receiving our clinical AI updates.</p>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="email" 
                placeholder="Medical Email"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 text-sm text-white transition-colors"
              />
            </div>
            <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-cyan-500/10 uppercase text-xs tracking-widest">
              Join Network
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
        <p>© 2024 SavannaMind Intelligence Inc.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Privacy Protocol</a>
          <a href="#" className="hover:text-white">Clinical Terms</a>
          <a href="#" className="hover:text-white">Data Security</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
