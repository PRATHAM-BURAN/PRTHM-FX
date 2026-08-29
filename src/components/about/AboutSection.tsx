import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Film, Palette, Wand2, Volume2, Move } from 'lucide-react';
import { creatorProfile, specialties } from '../../data/portfolioData';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section id="about" className="relative py-28 px-4 md:px-12 lg:px-20 overflow-hidden bg-surface-dim/30">
      {/* Red ambient haze */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Main Grid: Portrait & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Stylized Editorial Portrait Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Red Atmospheric Backdrop */}
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl -z-10" />

            <div className="relative rounded-3xl overflow-hidden rim-light-hover rim-light bg-surface shadow-2xl group">
              <img
                src={creatorProfile.portraitUrl}
                alt="Prthm Behind the Frame"
                className="w-full aspect-[4/5] object-cover object-top filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="font-anton text-2xl text-white tracking-wide">
                  PRTHM
                </div>
                <div className="font-mono text-xs text-primary font-bold tracking-widest uppercase">
                  DIRECTOR & LEAD EDITOR
                </div>
              </div>

              {/* Corner Tech Marks */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-white/50 tracking-widest uppercase px-2 py-1 rounded bg-black/60 backdrop-blur-md">
                REC [●] 24FPS
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Bio & Statements */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary tracking-[0.3em] uppercase">
              <Sparkles className="w-4 h-4" />
              <span>THE MANIFESTO</span>
            </div>

            <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none">
              THE EDITOR BEHIND THE FRAME
            </h2>

            {/* Editable Bio Quote */}
            <div className="relative p-6 rounded-2xl bg-surface-container/70 border-l-4 border-primary rim-light backdrop-blur-md">
              <p className="font-inter text-lg sm:text-xl text-white font-light italic leading-relaxed">
                "{creatorProfile.bio}"
              </p>
            </div>

            <p className="font-inter text-base text-on-surface-variant leading-relaxed">
              Every video is more than just clips stitched on a timeline—it's a psychological dance of pacing, rhythm, color, and frequency. I collaborate with visionary creators, brands, and agencies to transform raw rushes into unforgettable visual journeys that dominate feeds and stick in people's minds.
            </p>
          </motion.div>
        </div>

        {/* Editing Specialties Interactive Matrix */}
        <div className="space-y-6 pt-10 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-primary tracking-widest uppercase">
                CORE CAPABILITIES
              </span>
              <h3 className="font-anton text-3xl sm:text-4xl text-white tracking-wide uppercase mt-1">
                EDITING SPECIALTIES & CRAFT
              </h3>
            </div>
            <span className="font-mono text-xs text-on-surface-muted">
              MASTERED TECHNIQUES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {specialties.map((spec, idx) => (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-surface/90 rim-light rim-light-hover flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-red-glow">
                    {idx === 0 && <Film className="w-5 h-5" />}
                    {idx === 1 && <Palette className="w-5 h-5" />}
                    {idx === 2 && <Sparkles className="w-5 h-5" />}
                    {idx === 3 && <Wand2 className="w-5 h-5" />}
                    {idx === 4 && <Volume2 className="w-5 h-5" />}
                    {idx === 5 && <Move className="w-5 h-5" />}
                  </div>

                  <h4 className="font-anton text-xl text-white tracking-wide group-hover:text-primary transition-colors">
                    {spec.title}
                  </h4>

                  <p className="font-inter text-xs text-on-surface-muted leading-relaxed">
                    {spec.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {spec.tags.map((t, i) => (
                    <span
                      key={i}
                      className="font-mono text-[9px] text-on-surface-variant bg-surface-dim px-2 py-0.5 rounded border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
