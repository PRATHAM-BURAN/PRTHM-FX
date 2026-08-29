import React from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles, Send, Instagram, Linkedin, AtSign, Youtube, HardDrive, ExternalLink } from 'lucide-react';
import { PortraitScene } from './PortraitScene';
import { creatorProfile, socialLinks, mainDriveUrl } from '../../data/portfolioData';

interface HeroProps {
  onExploreWork: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onContactClick }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-14 px-4 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-8 items-center relative z-10">
        {/* Main Column: Storytelling, Headline & CTAs */}
        <div className="w-full lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-5 lg:space-y-6">
          {/* Top Pill / Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container border border-primary/30 w-fit backdrop-blur-md shadow-red-glow"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs text-primary font-semibold tracking-widest uppercase">
              PORTFOLIO 2026 NOW LIVE
            </span>
          </motion.div>

          {/* Huge Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1"
          >
            <h1 className="font-anton text-5xl sm:text-6xl md:text-8xl xl:text-9xl text-white tracking-tight leading-[0.9] select-none">
              HELLO,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-on-surface to-primary text-glow-red">
                I'M PRTHM
              </span>
            </h1>
          </motion.div>

          {/* MOBILE ONLY: Perfectly Centered Portrait Card in Primary Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:hidden w-full flex justify-center py-2 my-1"
          >
            <div className="w-[240px] sm:w-[290px] aspect-[3/4]">
              <PortraitScene
                portraitUrl={creatorProfile.portraitUrl}
                onExploreWork={onExploreWork}
              />
            </div>
          </motion.div>

          {/* Sub-Headline & Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-2 lg:space-y-3"
          >
            <p className="font-mono text-xs sm:text-sm md:text-base text-primary font-bold tracking-[0.2em] uppercase">
              {creatorProfile.subHeadline}
            </p>
            <p className="font-inter text-sm sm:text-base md:text-lg text-on-surface-variant/90 max-w-xl leading-relaxed">
              Crafting high-impact reels, cinematic visuals, and frame-by-frame stories engineered to hold attention, evoke emotion, and conquer modern feeds.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
          >
            {/* Primary Explore Work Button */}
            <button
              onClick={onExploreWork}
              data-cursor="explore"
              data-cursor-label="EXPLORE"
              className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-primary text-white font-anton text-base sm:text-lg tracking-wider uppercase shadow-red-glow-lg hover:shadow-red-glow-intense hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <span>EXPLORE WORK</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
            </button>

            {/* Main Google Drive Link Button */}
            <a
              href={mainDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              data-cursor-label="DRIVE"
              className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-primary/40 hover:border-primary font-mono text-xs tracking-widest text-primary font-bold uppercase shadow-red-glow transition-all duration-300 group"
            >
              <HardDrive className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span>MAIN DRIVE</span>
              <ExternalLink className="w-3.5 h-3.5 text-on-surface-muted group-hover:text-primary transition-colors" />
            </a>

            {/* Secondary Contact Button */}
            <button
              onClick={onContactClick}
              className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-surface/80 hover:bg-surface-container border border-white/10 hover:border-primary/40 font-mono text-xs tracking-widest text-on-surface uppercase transition-all duration-300 cursor-pointer"
            >
              <Send className="w-4 h-4 text-primary" />
              <span>GET IN TOUCH</span>
            </button>
          </motion.div>

          {/* Social Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
          >
            <span className="font-mono text-[11px] text-on-surface-muted uppercase tracking-widest mr-1">
              CONNECT:
            </span>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                data-cursor-label="OPEN"
                className="w-9 h-9 rounded-full bg-surface border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 hover:shadow-red-glow transition-all duration-300"
                title={`${s.label}: ${s.handle}`}
              >
                {s.platform === 'instagram' && <Instagram className="w-4 h-4" />}
                {s.platform === 'youtube' && <Youtube className="w-4 h-4 text-red-500" />}
                {s.platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
                {s.platform === 'threads' && <AtSign className="w-4 h-4" />}
                {s.platform === 'direct' && <HardDrive className="w-4 h-4" />}
              </a>
            ))}
          </motion.div>
        </div>

        {/* DESKTOP ONLY: 3D Parallax Portrait Scene on Right Column */}
        <div className="hidden lg:flex lg:col-span-5 items-center justify-center h-[560px] xl:h-[640px]">
          <PortraitScene
            portraitUrl={creatorProfile.portraitUrl}
            onExploreWork={onExploreWork}
          />
        </div>
      </div>

      {/* Scroll Down Cue */}
      <motion.button
        onClick={onExploreWork}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-on-surface-variant/60 hover:text-primary transition-colors cursor-pointer group"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase group-hover:text-primary">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-primary flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-primary"
          />
        </div>
      </motion.button>
    </section>
  );
};
