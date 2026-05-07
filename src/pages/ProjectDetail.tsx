import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Layers, CheckCircle2 } from 'lucide-react';
import content from '../data/contentData.json';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = content.projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const { detail } = project;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pt-8 pb-24 text-white">
      <Link 
        to="/projects" 
        className="inline-flex items-center gap-2 text-text-soft hover:text-white transition-colors mb-12 group font-medium"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
          {project.title}
        </h1>
        
        <div className="flex flex-wrap gap-3 mb-12">
          {project.tags.map((tag: string) => (
            <span key={tag} className="px-2.5 py-1 rounded-[4px] bg-white/5 border border-white/10 text-[10px] text-text-muted uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-20 border border-card-hover bg-surface"
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" fill="%230B0B0B"><rect width="100%" height="100%"/></svg>';
          }}
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="md:col-span-2 space-y-16">
          <Section title="Overview" delay={0.3}>
            <p className="text-xl text-text-soft leading-relaxed font-sans">
              {detail.overview}
            </p>
          </Section>

          <Section title="System Architecture" delay={0.4}>
            <div className="p-8 rounded-[24px] bg-card border border-card-border backdrop-blur-md text-text-soft leading-[1.6]">
              <Layers className="w-8 h-8 text-cyan mb-6" />
              <p>{detail.architecture}</p>
            </div>
          </Section>

          <Section title="Challenges & Solutions" delay={0.5}>
            <p className="text-lg text-text-soft leading-relaxed">
              {detail.challenges}
            </p>
          </Section>
        </div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 rounded-[24px] bg-card border border-card-border backdrop-blur-md"
          >
            <h3 className="text-2xl font-display font-bold mb-6">Key Features</h3>
            <ul className="space-y-4">
              {detail.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-text-soft">
                  <CheckCircle2 className="w-5 h-5 text-electric shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-4"
          >
            {detail.demoUrl && (
              <a 
                href={detail.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm"
              >
                Launch Demo
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            {detail.githubUrl && (
              <a 
                href={detail.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-transparent border border-card-border text-white rounded-xl font-semibold hover:bg-white/5 transition-colors text-sm"
              >
                Source Code
                <Github className="w-5 h-5" />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Section({ children, title, delay = 0 }: { children: React.ReactNode, title: string, delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      <h2 className="text-3xl font-display font-bold mb-8">{title}</h2>
      {children}
    </motion.section>
  );
}
