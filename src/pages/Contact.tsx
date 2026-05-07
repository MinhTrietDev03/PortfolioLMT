import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail } from 'lucide-react';
import content from '../data/contentData.json';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('submitted'), 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-12 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-electric/20 bg-electric/10 text-[11px] font-semibold text-electric uppercase tracking-[1px] mb-6">
            <span className="w-1.5 h-1.5 bg-electric rounded-full shadow-[0_0_8px_#4F8CFF]"></span>
            {content.hero.availability}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
            Let's build something <span className="bg-gradient-to-r from-cyan to-electric bg-clip-text text-transparent">epic.</span>
          </h1>
          
          <p className="text-xl text-text-soft mb-12">
            Looking to architect a new back-end system, optimize your database, or just want to say hi? My inbox is always open.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-text-muted hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-cyan" />
              </div>
              <span className="text-lg">{content.contact.email}</span>
            </div>
            <div className="flex items-center gap-4 text-text-muted hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-electric" />
              </div>
              <span className="text-lg">{content.contact.location}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 md:p-10 rounded-[24px] bg-card border border-card-border backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-text-soft font-mono uppercase tracking-wider">Name</label>
              <input 
                type="text" 
                id="name" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-text-muted/50 focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-text-soft font-mono uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                id="email" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-text-muted/50 focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-text-soft font-mono uppercase tracking-wider">Message</label>
              <textarea 
                id="message" 
                rows={5}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-text-muted/50 focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button 
              type="submit"
              disabled={formState !== 'idle'}
              className="mt-4 group relative w-full flex items-center justify-center gap-2 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              {formState === 'idle' && (
                <>
                  <span className="relative z-10">Send Transmission</span>
                  <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
              {formState === 'submitting' && <span className="animate-pulse">Encrypting...</span>}
              {formState === 'submitted' && <span className="text-green-600">Transmission Received</span>}
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
