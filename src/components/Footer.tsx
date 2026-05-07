import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-card-hover bg-bg/50 backdrop-blur-md py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-text-muted">
        <p>© {new Date().getFullYear()} Le Minh Triet. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <motion.a whileHover={{ y: -2 }} href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</motion.a>
          <motion.a whileHover={{ y: -2 }} href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</motion.a>
        </div>
      </div>
    </footer>
  );
}
