import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, Instagram, Youtube, HardDrive, Sparkles, Film } from 'lucide-react';
import { Project } from '../../types';

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isVertical = project.aspect === '9:16';
  const targetUrl = project.sourceUrl || project.videoUrl;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9990] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 overflow-y-auto"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-[9999] p-3 rounded-full bg-surface-dim border border-white/15 text-white hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110 cursor-pointer shadow-red-glow"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full max-w-5xl rounded-3xl bg-surface border border-white/15 overflow-hidden shadow-[0_0_80px_rgba(230,0,0,0.3)] my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Media Column */}
            <div
              className={`relative bg-black flex items-center justify-center overflow-hidden ${
                isVertical ? 'lg:col-span-6 min-h-[480px] lg:min-h-[600px]' : 'lg:col-span-7 min-h-[360px] lg:min-h-[500px]'
              }`}
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

              {/* Center Play & Watch CTA */}
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 hover:bg-black/20 transition-all p-6 text-center group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-red-glow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <div className="space-y-1">
                  <span className="font-anton text-2xl text-white tracking-wider uppercase block group-hover:text-primary transition-colors">
                    {project.platform === 'youtube'
                      ? 'WATCH ON YOUTUBE'
                      : project.platform === 'direct'
                      ? 'OPEN IN GOOGLE DRIVE'
                      : 'WATCH ORIGINAL ON INSTAGRAM'}
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant group-hover:text-white flex items-center justify-center gap-1.5">
                    <span>Click to open live high-quality video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>

              {/* Platform Header Badge */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-md">
                {project.platform === 'youtube' && <Youtube className="w-4 h-4 text-red-500" />}
                {project.platform === 'instagram' && <Instagram className="w-4 h-4 text-primary" />}
                {project.platform === 'direct' && <HardDrive className="w-4 h-4 text-primary" />}
                <span className="font-mono text-xs text-white font-bold tracking-wider uppercase">
                  {project.client}
                </span>
              </div>
            </div>

            {/* Project Details Sidebar */}
            <div
              className={`p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-surface-container/80 backdrop-blur-md ${
                isVertical ? 'lg:col-span-6' : 'lg:col-span-5'
              }`}
            >
              <div className="space-y-5">
                {/* Header / Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 font-mono text-xs text-primary font-bold tracking-wider uppercase">
                    {project.category}
                  </span>
                  <span className="font-mono text-xs text-on-surface-muted">
                    {project.year} • {project.aspect}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-anton text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="font-inter text-sm text-on-surface-variant leading-relaxed">
                  {project.description}
                </p>

                {/* Meta details table */}
                <div className="space-y-2.5 pt-3 border-t border-white/10 font-mono text-xs">
                  {project.client && (
                    <div className="flex justify-between">
                      <span className="text-on-surface-muted">SOURCE / CHANNEL:</span>
                      <span className="text-white font-medium">{project.client}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-on-surface-muted">STATUS:</span>
                    <span className="text-primary font-bold">Original Creator Content</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-muted">SOFTWARE:</span>
                    <span className="text-white">VN • CapCut Pro • DaVinci</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-surface border border-white/10 font-mono text-[10px] text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Open Link */}
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-anton text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-red-glow hover:shadow-red-glow-lg group"
              >
                <span>
                  {project.platform === 'youtube'
                    ? 'WATCH ON YOUTUBE (@PRTHM_FX)'
                    : project.platform === 'direct'
                    ? 'OPEN GOOGLE DRIVE VAULT'
                    : 'WATCH ON INSTAGRAM'}
                </span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
