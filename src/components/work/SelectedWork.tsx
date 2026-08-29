import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, LayoutGrid, Layers, Film, Sparkles, HardDrive, ExternalLink } from 'lucide-react';
import { VideoCard } from './VideoCard';
import { Project } from '../../types';
import { projects, mainDriveUrl } from '../../data/portfolioData';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('grid');
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const filters = [
    { label: 'ALL WORK', key: 'ALL' },
    { label: 'REELS & SHORTS', key: 'reels' },
    { label: 'COLLEGE LIFE', key: 'college-life' },
    { label: 'TRAVEL', key: 'travel' },
    { label: 'SHORT FILMS', key: 'short-films' },
    { label: 'VLOGS', key: 'vlogs' },
    { label: 'PROJECTS', key: 'projects' },
    { label: 'EXPERIMENTAL', key: 'experimental' }
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'ALL') return true;
    return p.categorySlug === activeFilter;
  });

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="work" className="relative py-28 px-4 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-primary-dim/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-primary tracking-[0.3em] uppercase">
              <Film className="w-4 h-4" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none">
              SELECTED WORK
            </h2>
            <p className="font-inter text-base sm:text-lg text-on-surface-variant max-w-md">
              Frames I've turned into stories — from high-energy vertical reels to widescreen cinematic edits.
            </p>
          </div>

          {/* Controls: View Mode Switcher & Carousel Nav */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 rounded-xl bg-surface border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-primary text-white shadow-red-glow' : 'text-on-surface-muted hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('carousel')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'carousel' ? 'bg-primary text-white shadow-red-glow' : 'text-on-surface-muted hover:text-white'
                }`}
                title="3D Reel Carousel View"
              >
                <Layers className="w-4 h-4" />
              </button>
            </div>

            {viewMode === 'carousel' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollCarousel('left')}
                  className="p-2.5 rounded-xl bg-surface border border-white/10 text-white hover:text-primary hover:border-primary transition-colors cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollCarousel('right')}
                  className="p-2.5 rounded-xl bg-surface border border-white/10 text-white hover:text-primary hover:border-primary transition-colors cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-primary text-white font-bold shadow-red-glow border border-primary'
                  : 'bg-surface/70 hover:bg-surface border border-white/10 text-on-surface-variant hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Content */}
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <VideoCard
                key={project.id}
                project={project}
                index={idx}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        ) : (
          /* 3D Perspective Carousel View */
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-8 pt-4 perspective-1000 scroll-smooth snap-x snap-mandatory"
          >
            {filteredProjects.map((project, idx) => (
              <div key={project.id} className="min-w-[320px] sm:min-w-[380px] lg:min-w-[420px] snap-center">
                <VideoCard
                  project={project}
                  index={idx}
                  onSelect={onSelectProject}
                />
              </div>
            ))}
          </div>
        )}

        {/* Master Google Drive Archive Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface/90 rim-light-red flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0 shadow-red-glow">
              <HardDrive className="w-7 h-7" />
            </div>
            <div>
              <div className="font-anton text-2xl text-white tracking-wide uppercase">
                LOOKING FOR COMPLETE RAW EDITS & FOOTAGE?
              </div>
              <p className="font-inter text-xs sm:text-sm text-on-surface-variant mt-1">
                Access the official Google Drive archive with full uncompressed renders, project files, and timeline exports.
              </p>
            </div>
          </div>

          <a
            href={mainDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            data-cursor-label="VAULT"
            className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-mono text-xs font-bold uppercase tracking-wider shadow-red-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 shrink-0"
          >
            <span>OPEN MAIN DRIVE</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
