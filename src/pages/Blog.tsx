import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
import content from '../data/contentData.json';

export default function Blog() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 pt-12 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
          Engineering Logs
        </h1>
        <p className="text-xl text-text-soft">
          Thoughts, learnings, and deep dives into backend architecture.
        </p>
      </motion.div>

      <div className="space-y-8">
        {content.blog.map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group block p-8 rounded-[24px] bg-card border border-card-border backdrop-blur-md hover:border-white/10 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 text-sm text-text-muted font-mono mb-4">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-text-muted" />
                  <span className="flex items-center gap-1.5 text-cyan">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold font-display mb-3 group-hover:text-purple transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-text-soft">
                  {post.summary}
                </p>
              </div>
              
              <div className="hidden md:flex w-12 h-12 rounded-full border border-card-border items-center justify-center group-hover:bg-white group-hover:border-white transition-all shrink-0">
                <ArrowUpRight className="w-5 h-5 text-text-soft group-hover:text-black transition-colors" />
              </div>
            </div>
            
            {/* Reading progress indicator bar on hover */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple to-cyan w-0 group-hover:w-full transition-all duration-1000 ease-in-out" />
          </motion.article>
        ))}
      </div>
    </div>
  );
}
