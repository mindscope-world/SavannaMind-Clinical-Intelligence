
import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-4">
          <h3 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Testimonials</h3>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A2540] max-w-xl">
            Trusted by World-Class Institutions
          </h2>
        </div>
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div 
        className="max-w-7xl mx-auto px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[400px]">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                idx === currentIndex 
                  ? 'opacity-100 translate-x-0' 
                  : idx < currentIndex ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-full items-center">
                <div className="lg:col-span-8 bg-slate-50 p-12 rounded-[2.5rem] relative group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <Quote className="absolute top-8 left-8 text-blue-100 w-24 h-24 -z-0" />
                  <div className="relative z-10 space-y-8">
                    <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-4 border-white shadow-md"
                      />
                      <div>
                        <h4 className="text-lg font-bold text-[#0A2540]">{testimonial.name}</h4>
                        <p className="text-slate-500 italic text-sm">{testimonial.title}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:col-span-4 lg:flex flex-col gap-6">
                  {/* Partner Logos Decoration */}
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-slate-100 h-24 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                         <div className="font-bold text-slate-400 opacity-50 uppercase text-xs">PARTNER LOGO</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white flex flex-col justify-center">
                    <h5 className="text-3xl font-extrabold mb-2">30M+</h5>
                    <p className="text-blue-100 font-medium text-sm leading-snug">Lives touched through our AI network global clinical reach.</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
