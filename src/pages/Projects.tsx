import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import content from '../data/contentData.json';

export default function Projects() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 pt-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 text-white">
          Active Deployments
        </h1>
        <p className="text-xl text-text-soft max-w-2xl mx-auto">
          Systems and architectures I have designed, built, and shipped.
        </p>
      </motion.div>

      <div className="space-y-32">
        {content.projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="group relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    >
      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
        <div className="relative rounded-[2rem] overflow-hidden bg-card border border-card-border aspect-[4/3]">
          {/* Glass Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60 z-10" />
          
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" fill="%230B0B0B"><rect width="100%" height="100%"/></svg>';
            }}
          />

          {/* Border Glow */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-electric/20 rounded-[2rem] transition-colors duration-500 z-20 pointer-events-none" />
        </div>
      </div>

      <div className={`flex flex-col ${index % 2 === 1 ? "lg:order-1 lg:items-end lg:text-right" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="text-[11px] uppercase tracking-[2px] font-bold text-purple mr-2">Featured System</div>
          {project.tags.map((tag: string) => (
            <span key={tag} className="px-2.5 py-1 rounded-[4px] bg-white/5 border border-white/10 text-[10px] text-text-muted uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
        
        <h2 className="text-3xl md:text-[40px] font-display font-bold text-white mb-6">
          {project.title}
        </h2>
        
        <p className="text-[15px] text-text-muted mb-8 leading-[1.6] max-w-lg font-light">
          {project.shortDescription}
        </p>
        
        <Link 
          to={`/projects/${project.id}`}
          className="inline-flex items-center gap-2 group/btn px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors self-start lg:self-auto text-sm"
        >
          View Architecture
          <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
