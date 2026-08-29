import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, AtSign, Youtube, ExternalLink, QrCode, HardDrive, Sparkles, ArrowUpRight, Film, Radio } from 'lucide-react';
import { socialLinks, youtubeChannelUrl, mainDriveUrl } from '../../data/portfolioData';

export const SocialSection: React.FC = () => {
  return (
    <section id="socials" className="relative py-28 px-4 md:px-12 lg:px-20 bg-surface-dim/40 border-y border-white/5">
      {/* Red ambient glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-primary tracking-[0.3em] uppercase">
              <Radio className="w-4 h-4 text-primary animate-pulse" />
              <span>LIVE CHANNELS & VAULT</span>
            </div>
            <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none">
              FROM MY SOCIALS
            </h2>
            <p className="font-inter text-base text-on-surface-variant max-w-lg">
              Watch live reels, visual transitions, and color grading stories directly on <strong>@prthm_fx</strong> and <strong>@pratham_buran</strong>.
            </p>
          </div>

          {/* Direct Profile Links Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                data-cursor-label="OPEN"
                className="px-4 py-2 rounded-full bg-surface border border-white/10 hover:border-primary/50 text-xs font-mono text-on-surface-variant hover:text-white flex items-center gap-2 transition-all shadow-sm group"
              >
                {s.platform === 'instagram' && <Instagram className="w-3.5 h-3.5 text-primary" />}
                {s.platform === 'youtube' && <Youtube className="w-3.5 h-3.5 text-red-500" />}
                {s.platform === 'linkedin' && <Linkedin className="w-3.5 h-3.5 text-primary" />}
                {s.platform === 'threads' && <AtSign className="w-3.5 h-3.5 text-primary" />}
                {s.platform === 'direct' && <HardDrive className="w-3.5 h-3.5 text-primary" />}
                <span>{s.label}</span>
                <span className="text-primary font-bold">{s.handle}</span>
                <ExternalLink className="w-3 h-3 text-on-surface-muted group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* QR Code & Channel Showcase Cards */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-primary tracking-widest uppercase">
            <QrCode className="w-4 h-4" />
            <span>SCAN QR OR CLICK TO OPEN LIVE PLATFORMS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Instagram Creator / FX */}
            <a
              href="https://www.instagram.com/prthm_fx?igsi=dXBhcXg3Zjc1YnZh"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-surface/90 rim-light-red rim-light-hover flex flex-col justify-between items-center text-center gap-5 group cursor-pointer shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-full aspect-square max-w-[210px] rounded-2xl overflow-hidden border border-white/10 p-2 bg-white flex items-center justify-center shadow-md">
                <img
                  src="/assets/qr/qr_insta_creator.jpg"
                  alt="Instagram Creator QR @prthm_fx"
                  className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-1.5 w-full">
                <div className="font-anton text-xl text-white tracking-wide flex items-center justify-center gap-1.5">
                  <Instagram className="w-4 h-4 text-primary" />
                  <span>@PRTHM_FX</span>
                </div>
                <span className="font-mono text-xs text-primary font-bold uppercase block tracking-wider">
                  CREATOR & VFX REELS
                </span>
                <p className="font-inter text-xs text-on-surface-muted line-clamp-2">
                  Velocity speed ramps, glitch transitions, and cinematic sound design.
                </p>
              </div>
              <div className="w-full py-2.5 rounded-xl bg-primary/20 group-hover:bg-primary border border-primary/40 text-primary group-hover:text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                <span>WATCH REELS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* 2. Instagram Main Profile */}
            <a
              href="https://www.instagram.com/pratham_buran?igsi=M2w1bjRnc2gybWdv"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-surface/90 rim-light rim-light-hover flex flex-col justify-between items-center text-center gap-5 group cursor-pointer shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-full aspect-square max-w-[210px] rounded-2xl overflow-hidden border border-white/10 p-2 bg-white flex items-center justify-center shadow-md">
                <img
                  src="/assets/qr/qr_insta_main.jpg"
                  alt="Instagram Main QR @pratham_buran"
                  className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-1.5 w-full">
                <div className="font-anton text-xl text-white tracking-wide flex items-center justify-center gap-1.5">
                  <Instagram className="w-4 h-4 text-primary" />
                  <span>@PRATHAM_BURAN</span>
                </div>
                <span className="font-mono text-xs text-on-surface-muted uppercase block tracking-wider">
                  MAIN PROFILE & STORIES
                </span>
                <p className="font-inter text-xs text-on-surface-muted line-clamp-2">
                  Lifestyle chronicles, travel adventures, campus memories, and vlogs.
                </p>
              </div>
              <div className="w-full py-2.5 rounded-xl bg-surface-dim group-hover:bg-primary border border-white/10 group-hover:border-primary text-on-surface-variant group-hover:text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                <span>VIEW PROFILE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* 3. YouTube Channel Showcase */}
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-surface/90 rim-light-red rim-light-hover flex flex-col justify-between items-center text-center gap-5 group cursor-pointer shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-full aspect-square max-w-[210px] rounded-2xl overflow-hidden border border-red-500/30 p-4 bg-gradient-to-br from-red-950/40 via-surface-dim to-black flex flex-col items-center justify-center gap-3 shadow-md">
                <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all shadow-[0_0_20px_rgba(230,0,0,0.4)]">
                  <Youtube className="w-8 h-8" />
                </div>
                <span className="font-anton text-lg text-white tracking-wider">
                  WATCH VIDEOS
                </span>
              </div>
              <div className="space-y-1.5 w-full">
                <div className="font-anton text-xl text-white tracking-wide flex items-center justify-center gap-1.5">
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>@PRTHM_FX</span>
                </div>
                <span className="font-mono text-xs text-red-400 font-bold uppercase block tracking-wider">
                  YOUTUBE STUDIO
                </span>
                <p className="font-inter text-xs text-on-surface-muted line-clamp-2">
                  High-bitrate timeline exports, visual edits, and widescreen cinematic showcases.
                </p>
              </div>
              <div className="w-full py-2.5 rounded-xl bg-red-950/30 group-hover:bg-red-600 border border-red-500/40 text-red-400 group-hover:text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                <span>OPEN YOUTUBE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* 4. Threads Micro-Posts */}
            <a
              href="https://www.threads.com/@pratham_buran"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-surface/90 rim-light rim-light-hover flex flex-col justify-between items-center text-center gap-5 group cursor-pointer shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-full aspect-square max-w-[210px] rounded-2xl overflow-hidden border border-white/10 p-2 bg-black flex items-center justify-center shadow-md">
                <img
                  src="/assets/qr/qr_threads.jpg"
                  alt="Threads QR @pratham_buran"
                  className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-1.5 w-full">
                <div className="font-anton text-xl text-white tracking-wide flex items-center justify-center gap-1.5">
                  <AtSign className="w-4 h-4 text-primary" />
                  <span>@PRATHAM_BURAN</span>
                </div>
                <span className="font-mono text-xs text-on-surface-muted uppercase block tracking-wider">
                  THREADS POSTS & THOUGHTS
                </span>
                <p className="font-inter text-xs text-on-surface-muted line-clamp-2">
                  Creative workflow breakdowns, timeline snippets, and micro-stories.
                </p>
              </div>
              <div className="w-full py-2.5 rounded-xl bg-surface-dim group-hover:bg-primary border border-white/10 group-hover:border-primary text-on-surface-variant group-hover:text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                <span>OPEN THREADS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>

        {/* Master Google Drive Vault Interactive Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-surface/90 rim-light-red flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0 shadow-red-glow">
              <HardDrive className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] text-primary tracking-widest font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>UNCOMPRESSED MASTER ASSETS</span>
              </div>
              <h3 className="font-anton text-3xl sm:text-4xl text-white tracking-wide uppercase">
                MASTER GOOGLE DRIVE VAULT
              </h3>
              <p className="font-inter text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                Access full uncompressed 4K master timeline renders, high-bitrate color graded sequences, and raw archive assets directly in Prthm's official cloud vault.
              </p>
            </div>
          </div>

          <a
            href={mainDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            data-cursor-label="VAULT"
            className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-mono text-xs font-bold uppercase tracking-wider shadow-red-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shrink-0 cursor-pointer"
          >
            <span>OPEN 4K DRIVE VAULT</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
