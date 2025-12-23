
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);

  if (submitted) {
    return (
      <div className="min-h-screen bg-medical-dark flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass p-12 rounded-[3rem] text-center space-y-6"
        >
          <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} className="text-black" />
          </div>
          <h2 className="text-3xl font-black">Transmission Complete.</h2>
          <p className="text-slate-400">Our clinical team has received your inquiry. We typically respond within 24 operational hours.</p>
          <button onClick={() => window.location.reload()} className="text-cyan-400 font-bold uppercase text-xs tracking-widest mt-8">Return to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-medical-dark text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <h1 className="text-6xl font-black tracking-tighter leading-none">Connect with <span className="text-cyan-400">Clinical AI.</span></h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-md">
            Whether you're looking for a pilot program or a global enterprise integration, our team is ready to scale with you.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5">
              <Mail className="text-cyan-400" />
              <div>
                <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Email Us</div>
                <div className="font-bold">clinical@qure.ai</div>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5">
              <Phone className="text-cyan-400" />
              <div>
                <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Call Support</div>
                <div className="font-bold">+1 (800) QURE-AI</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 pt-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center gap-2">
               <ShieldCheck size={32} />
               <span className="text-[8px] font-bold uppercase tracking-widest">HIPAA Compliant</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <Globe size={32} />
               <span className="text-[8px] font-bold uppercase tracking-widest">ISO 27001</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <ShieldCheck size={32} />
               <span className="text-[8px] font-bold uppercase tracking-widest">GDPR Ready</span>
            </div>
          </div>
        </div>

        <div className="glass p-10 lg:p-16 rounded-[3rem] relative">
          <div className="flex gap-2 mb-12">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-cyan-400' : 'bg-white/10'}`}></div>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); if (step === 3) setSubmitted(true); else nextStep(); }}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-2xl font-bold mb-8">Clinical Profile</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-cyan-400 transition-colors" />
                  <input type="email" placeholder="Professional Medical Email" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-cyan-400 transition-colors" />
                  <input type="text" placeholder="Institution / Hospital" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-cyan-400 transition-colors" />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-2xl font-bold mb-8">Area of Interest</h3>
                <div className="grid grid-cols-1 gap-4">
                  {["Chest Imaging (qXR)", "Neuro Triage (qER)", "MSK AI", "Public Health Screening"].map((opt) => (
                    <label key={opt} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:border-cyan-400 transition-all">
                      <input type="radio" name="interest" className="accent-cyan-400" />
                      <span className="font-bold">{opt}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-2xl font-bold mb-8">Message Details</h3>
                <textarea placeholder="Describe your current clinical workflow challenge..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 h-40 focus:outline-none focus:border-cyan-400 transition-colors"></textarea>
              </motion.div>
            )}

            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-5 rounded-2xl font-black uppercase tracking-widest mt-10 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3">
              {step === 3 ? "Submit Transmission" : "Next Step"}
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
