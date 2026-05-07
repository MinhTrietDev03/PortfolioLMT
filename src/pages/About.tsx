import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Server, Cpu, Database, Cloud } from 'lucide-react';
import content from '../data/contentData.json';

const iconMap: Record<string, React.ReactNode> = {
  "Front-End": <Cpu className="w-8 h-8 text-cyan" />,
  "Back-End": <Server className="w-8 h-8 text-electric" />,
  "Database": <Database className="w-8 h-8 text-purple" />,
  "Tools & DevOps": <Cloud className="w-8 h-8 text-text-soft" />
};

export default function About() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 pt-12 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
          {content.about.title}
        </h1>
        <p className="text-xl text-text-soft max-w-3xl mx-auto leading-relaxed">
          {content.about.description}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        {content.about.stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-8 rounded-[24px] bg-card border border-card-border backdrop-blur-md relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-text-soft mb-2">
              {stat.value}
            </h3>
            <p className="text-text-muted font-medium tracking-wide uppercase text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Skills Architecture */}
      <div className="mb-20">
        <h2 className="text-3xl font-display font-bold mb-12 text-center">Technical Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.about.skills.map((skillGroup, idx) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-8 rounded-[24px] bg-card border border-card-border backdrop-blur-md hover:border-white/10 transition-colors group relative"
            >
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-electric/0 via-electric/10 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-card rounded-2xl border border-card-hover text-white">
                    {iconMap[skillGroup.category] || <Cpu className="w-8 h-8" />}
                  </div>
                  <h3 className="text-2xl font-bold">{skillGroup.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {skillGroup.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 bg-white/5 rounded-[4px] border border-white/10 text-[10px] uppercase tracking-wider text-text-muted hover:text-white transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
