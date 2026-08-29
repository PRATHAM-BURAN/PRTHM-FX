import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, CheckCircle, Mail, MessageCircle, Instagram, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { creatorProfile, whatsappDmUrl, instaMainDmUrl } from '../../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Reels / Short-form');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#E60000', '#FFFFFF', '#980000']
    });

    // Directly open user's email client formatted to Prthm's official mail
    const subject = encodeURIComponent(`Collaboration Inquiry: ${projectType} from ${name}`);
    const body = encodeURIComponent(
      `Hello Prthm,\n\nI would like to connect and discuss a video project.\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Project Focus: ${projectType}\n` +
      `Estimated Budget: ${budget || 'To be discussed'}\n\n` +
      `Brief / Message:\n${message}\n\n` +
      `Sent via Portfolio Website`
    );

    window.open(`mailto:${creatorProfile.email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9995] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg max-h-[92dvh] overflow-y-auto rounded-3xl bg-surface border border-white/15 p-6 sm:p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-surface-dim border border-white/10 text-white hover:text-primary hover:border-primary transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Glowing flare */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center mx-auto shadow-red-glow">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="font-anton text-2xl text-white tracking-wide">
                EMAIL DISPATCHED
              </h3>
              <p className="font-inter text-xs text-on-surface-variant max-w-xs mx-auto">
                Your email client has been opened to send your inquiry directly to <strong>{creatorProfile.email}</strong>.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={whatsappDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WHATSAPP DM</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-primary text-white font-mono text-xs uppercase tracking-wider font-bold shadow-red-glow"
                >
                  CLOSE
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[10px] text-primary tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DIRECT INQUIRY</span>
                </div>
                <h3 className="font-anton text-3xl text-white tracking-tight">
                  CONNECT WITH PRTHM
                </h3>
                <p className="font-inter text-xs text-on-surface-muted">
                  Send an inquiry to <strong>{creatorProfile.email}</strong> or choose instant DM.
                </p>
              </div>

              {/* Instant DM Quick Actions inside Modal */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={whatsappDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/50 font-mono text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp DM</span>
                </a>
                <a
                  href={instaMainDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-primary/10 border border-primary/40 text-primary hover:bg-primary/20 font-mono text-xs font-semibold transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram DM</span>
                </a>
              </div>

              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-on-surface-muted uppercase tracking-wider block">
                    YOUR NAME / BRAND
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name or channel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-dim border border-white/10 focus:border-primary focus:outline-none font-inter text-xs text-white placeholder:text-white/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-on-surface-muted uppercase tracking-wider block">
                    YOUR EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-dim border border-white/10 focus:border-primary focus:outline-none font-inter text-xs text-white placeholder:text-white/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-on-surface-muted uppercase tracking-wider block">
                    PROJECT FOCUS
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-dim border border-white/10 focus:border-primary focus:outline-none font-inter text-xs text-white"
                  >
                    <option value="Reels / Short-form">Reels / Shorts (Viral Pacing)</option>
                    <option value="Cinematic Short Film">Cinematic Short Film / Narrative</option>
                    <option value="Commercial / Ad">Commercial / Brand Campaign</option>
                    <option value="YouTube Long-form">YouTube Long-form Video / Vlog</option>
                    <option value="Color Grading Only">Color Grading & Finishing</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-on-surface-muted uppercase tracking-wider block">
                    ESTIMATED BUDGET / RATE
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹5,000 / $500 / Negotiable"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-dim border border-white/10 focus:border-primary focus:outline-none font-inter text-xs text-white placeholder:text-white/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-on-surface-muted uppercase tracking-wider block">
                    BRIEF DESCRIPTION
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Footage details, timeline, goals..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-dim border border-white/10 focus:border-primary focus:outline-none font-inter text-xs text-white placeholder:text-white/30 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-anton text-lg tracking-wider uppercase shadow-red-glow active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>SEND EMAIL TO PRTHM</span>
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
