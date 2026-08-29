import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Instagram, Linkedin, AtSign, Youtube, Mail, MapPin, CheckCircle, Sparkles, ArrowUpRight, MessageCircle, MessageSquare, PhoneCall, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { creatorProfile, socialLinks, whatsappDmUrl, instaMainDmUrl, instaCreatorDmUrl, youtubeChannelUrl, mainDriveUrl } from '../../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Reels & Viral Content',
    budget: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.85 },
      colors: ['#E60000', '#FF2A2A', '#980000', '#FFFFFF']
    });

    // Format mailto redirect
    const mailtoSubject = encodeURIComponent(`Project Collaboration: ${formState.projectType} [${formState.name}]`);
    const mailtoBody = encodeURIComponent(
      `Hello Prthm,\n\nI would like to collaborate on a project.\n\n` +
      `Name: ${formState.name}\n` +
      `Email: ${formState.email}\n` +
      `Project Category: ${formState.projectType}\n` +
      `Estimated Budget: ${formState.budget || 'To be discussed'}\n\n` +
      `Project Details / References:\n${formState.message}\n\n` +
      `Looking forward to hearing from you!`
    );

    // Open mail client
    window.location.href = `mailto:${creatorProfile.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const projectTypes = [
    'Reels & Viral Content',
    'Cinematic Short Film',
    'YouTube Vlog Series',
    'Commercial / Brand Ad',
    'Color Grading & Mastering',
    'VFX & Speed Transitions'
  ];

  return (
    <section id="contact" className="relative py-32 px-4 md:px-12 lg:px-20 bg-background overflow-hidden">
      <div className="w-full max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-semibold tracking-widest uppercase">
            <Send className="w-3.5 h-3.5" />
            <span>INSTANT COLLABORATION & INQUIRIES</span>
          </div>
          <h2 className="font-anton text-5xl sm:text-6xl md:text-8xl text-white tracking-tight leading-none">
            CONNECT WITH ME
          </h2>
          <p className="font-inter text-base sm:text-lg text-on-surface-variant leading-relaxed">
            Ready to bring high-energy visual rhythm, cinematic color grading, and viral hooks to your next project? Reach out directly via WhatsApp DM, Instagram, YouTube, or dispatch a brief below.
          </p>
        </div>

        {/* Two-Column Grid: Instant DMs / Info on Left + Project Pitch Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Instant Social DMs & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Instant Direct Message (DM) Hub */}
            <div className="p-8 rounded-3xl bg-surface/90 rim-light-red space-y-5 backdrop-blur-xl shadow-xl">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-primary tracking-[0.25em] font-bold uppercase block">
                  FASTEST RESPONSE
                </span>
                <h3 className="font-anton text-2xl text-white tracking-wide uppercase">
                  INSTANT DIRECT MESSAGING (DM)
                </h3>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {/* WhatsApp Direct DM */}
                <a
                  href={whatsappDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  data-cursor-label="WHATSAPP"
                  className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 hover:border-emerald-400 text-white transition-all duration-300 group shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase block tracking-wider">
                        INSTANT WHATSAPP DM
                      </span>
                      <span className="text-sm font-semibold text-white">DM on WhatsApp</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Instagram Direct DM (Main) */}
                <a
                  href={instaMainDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  data-cursor-label="INSTA DM"
                  className="flex items-center justify-between p-4 rounded-2xl bg-surface-dim hover:bg-primary/20 border border-primary/30 hover:border-primary text-white transition-all duration-300 group shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-primary font-bold uppercase block tracking-wider">
                        INSTAGRAM DIRECT
                      </span>
                      <span className="text-sm font-semibold text-white">DM on @pratham_buran</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Instagram Direct DM (Creator/FX) */}
                <a
                  href={instaCreatorDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  data-cursor-label="FX DM"
                  className="flex items-center justify-between p-4 rounded-2xl bg-surface-dim hover:bg-primary/20 border border-white/10 hover:border-primary text-white transition-all duration-300 group shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-surface text-on-surface-variant flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-on-surface-muted uppercase block tracking-wider">
                        CREATOR & VFX ACCOUNT
                      </span>
                      <span className="text-sm font-semibold text-white">DM on @prthm_fx</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-on-surface-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* 2. Direct Channels (YouTube, Email & Vault) */}
            <div className="p-8 rounded-3xl bg-surface/90 rim-light space-y-4 backdrop-blur-xl">
              <h3 className="font-anton text-xl text-white tracking-wide uppercase">
                OFFICIAL INBOX, YOUTUBE & VAULT
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {/* Official YouTube Channel */}
                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-surface-dim hover:bg-red-950/40 border border-red-500/30 hover:border-red-500 text-white transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-red-600/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Youtube className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-red-400 uppercase block font-bold">YOUTUBE CHANNEL</span>
                      <span className="text-xs font-semibold">@prthm_fx</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-on-surface-muted group-hover:text-red-400 transition-colors" />
                </a>

                {/* Official Email */}
                <a
                  href={`mailto:${creatorProfile.email}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-surface-dim hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-white transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-on-surface-muted uppercase block">DIRECT EMAIL</span>
                      <span className="text-xs font-semibold">{creatorProfile.email}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-on-surface-muted group-hover:text-primary transition-colors" />
                </a>

                {/* Google Drive Vault */}
                <a
                  href={mainDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-surface-dim hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-white transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-on-surface-muted uppercase block">MAIN GOOGLE DRIVE</span>
                      <span className="text-xs font-semibold">Open High-Res Raw Vault</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-on-surface-muted group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Project Pitch & Email Sender Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-surface/90 rim-light-hover rim-light backdrop-blur-xl shadow-2xl">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center mx-auto shadow-red-glow">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-anton text-3xl text-white tracking-wide">
                    EMAIL DISPATCHED
                  </h3>
                  <p className="font-inter text-sm text-on-surface-variant max-w-md mx-auto">
                    Your brief has been formatted for <strong>{creatorProfile.email}</strong>. Prthm will review and reply within 24 hours.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={whatsappDmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>FOLLOW UP ON WHATSAPP</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-surface-dim border border-white/10 font-mono text-xs text-primary uppercase tracking-wider hover:bg-surface"
                    >
                      SEND ANOTHER BRIEF
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-anton text-2xl text-white tracking-wide uppercase">
                      SEND PROJECT BRIEF VIA EMAIL
                    </h3>
                    <p className="font-inter text-xs text-on-surface-muted mt-1">
                      Directly dispatches your project brief to <strong>{creatorProfile.email}</strong>.
                    </p>
                  </div>

                  {/* Project Type Picker */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-on-surface-muted uppercase tracking-wider block">
                      PROJECT GENRE / TYPE
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormState({ ...formState, projectType: type })}
                          className={`p-2.5 rounded-xl font-mono text-[11px] text-center border transition-all cursor-pointer ${
                            formState.projectType === type
                              ? 'bg-primary text-white border-primary shadow-red-glow font-bold'
                              : 'bg-surface-dim border-white/10 text-on-surface-variant hover:border-white/20'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-on-surface-muted uppercase tracking-wider block">
                        YOUR NAME / BRAND
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe / Studio"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface-dim border border-white/10 focus:border-primary focus:outline-none font-inter text-sm text-white placeholder:text-white/30 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-on-surface-muted uppercase tracking-wider block">
                        YOUR EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface-dim border border-white/10 focus:border-primary focus:outline-none font-inter text-sm text-white placeholder:text-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Budget Manual Input */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-on-surface-muted uppercase tracking-wider block">
                      ESTIMATED BUDGET / RATE
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹5,000 / $500 / Negotiable"
                      value={formState.budget}
                      onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-dim border border-white/10 focus:border-primary focus:outline-none font-inter text-sm text-white placeholder:text-white/30 transition-colors"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-on-surface-muted uppercase tracking-wider block">
                      PROJECT DETAILS & REFERENCES
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me about your footage, turnaround date, visual references, and goals..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-dim border border-white/10 focus:border-primary focus:outline-none font-inter text-sm text-white placeholder:text-white/30 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-anton text-xl tracking-wider uppercase shadow-red-glow-lg hover:shadow-red-glow-intense active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    <span>DISPATCH BRIEF TO PRTHM</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Editorial Footer Bottom Bar */}
        <footer className="pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="font-anton text-2xl text-white tracking-widest">
              PRTHM
            </div>
            <div className="font-mono text-[10px] text-on-surface-muted uppercase tracking-widest">
              © {new Date().getFullYear()} PRTHM DIRECTORS CUT. ALL RIGHTS RESERVED.
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-on-surface-variant">
            <a href="#home" className="hover:text-primary transition-colors uppercase">
              TOP OF TIMELINE ↑
            </a>
            <span>•</span>
            <a href="#categories" className="hover:text-primary transition-colors uppercase">
              GENRES
            </a>
            <span>•</span>
            <a href="#socials" className="hover:text-primary transition-colors uppercase">
              SOCIALS
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};
