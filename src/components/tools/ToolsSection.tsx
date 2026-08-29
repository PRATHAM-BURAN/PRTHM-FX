import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Layers, Sliders, Box, Film } from 'lucide-react';
import { softwareTools } from '../../data/portfolioData';

export const ToolsSection: React.FC = () => {
  return (
    <section id="tools" className="relative py-28 px-4 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Ambient Streaks */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-primary tracking-[0.3em] uppercase">
            <Cpu className="w-4 h-4" />
            <span>ARSENAL & PIPELINE</span>
          </div>
          <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none">
            PRODUCTION TOOLS
          </h2>
          <p className="font-inter text-base text-on-surface-variant">
            Industry-standard digital post-production suite tuned for high performance, color grading, and viral short-form editing.
          </p>
        </div>

        {/* 3D Magnetic Software Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {softwareTools.map((tool, idx) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-7 rounded-3xl bg-surface/90 rim-light rim-light-hover flex flex-col justify-between gap-6 shadow-xl transition-all duration-300"
            >
              {/* Glow Accent behind tool */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
                style={{ backgroundColor: tool.color }}
              />

              <div className="space-y-4">
                {/* Header: Icon / Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-anton text-xl font-bold border border-white/10 shadow-lg"
                    style={{
                      backgroundColor: `${tool.color}15`,
                      color: tool.color,
                      borderColor: `${tool.color}40`
                    }}
                  >
                    {tool.name.includes('VN') && 'VN'}
                    {tool.name.includes('CapCut') && 'CC'}
                    {tool.name.includes('DaVinci') && 'Dv'}
                    {tool.name.includes('Google Flow') && 'GF'}
                    {tool.name.includes('Gemini') && '✦'}
                    {tool.name.includes('Alight') && 'AM'}
                    {tool.name.includes('Instagram') && 'IG'}
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-surface-dim border border-white/10 text-white font-semibold">
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-anton text-2xl text-white tracking-wide group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <span className="font-mono text-xs text-primary block mt-0.5">
                    {tool.category}
                  </span>
                </div>

                <p className="font-inter text-xs text-on-surface-muted leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Technical Precision Metric */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center font-mono text-[11px]">
                  <span className="text-on-surface-muted uppercase">WORKFLOW MASTERY</span>
                  <span className="text-white font-bold">{tool.proficiency}% OPTIMIZED</span>
                </div>

                {/* Segmented Timeline Meter (Cinematic instead of standard bar) */}
                <div className="flex gap-1 h-1.5 w-full">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const active = i < Math.floor(tool.proficiency / 10);
                    return (
                      <div
                        key={i}
                        className={`h-full flex-1 rounded-xs transition-colors duration-500 ${
                          active ? 'bg-primary shadow-[0_0_8px_rgba(230,0,0,0.5)]' : 'bg-white/10'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
