import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import content from '../data/contentData.json';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center justify-center relative" ref={containerRef}>
      <motion.div 
        style={{ y, opacity }}
        className="max-w-4xl mx-auto px-6 text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-electric/20 bg-electric/10 text-[11px] font-semibold text-electric uppercase tracking-[1px] mb-6"
        >
          <span className="w-1.5 h-1.5 bg-electric rounded-full shadow-[0_0_8px_#4F8CFF]"></span>
          {content.hero.availability}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-[82px] font-display font-bold tracking-[-3px] leading-[0.95] mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
        >
          <span className="block">Engineering the</span>
          <span className="block">infrastructure</span>
          <span className="block">of tomorrow.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[18px] text-text-muted leading-[1.6] max-w-[500px] mx-auto mb-10 font-light"
        >
          Hi, I'm <span className="text-white font-medium">{content.hero.name}</span>, a {content.hero.title}. {content.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/projects"
            className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Deployments
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="group flex items-center gap-2 px-8 py-4 bg-transparent border border-card-border text-white rounded-xl text-sm font-semibold hover:bg-white/5 transition-all"
          >
            <Terminal className="w-5 h-5 text-text-muted group-hover:text-white transition-colors" />
            Initialize Contact
          </Link>
        </motion.div>
      </motion.div>

      {/* Background ambient glow specific to home */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric/5 rounded-full blur-[120px] pointer-events-none z-0" />
    </div>
  );
}
