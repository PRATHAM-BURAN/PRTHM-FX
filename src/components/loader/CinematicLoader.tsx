import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'revealing' | 'done'>('counting');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setPhase('revealing');
          setTimeout(() => {
            setPhase('done');
            onComplete();
          }, 600);
          return 100;
        }
        // Organic progress curve
        const increment = prev < 60 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (phase === 'done') return null;

  const formattedProgress = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.08,
          filter: 'blur(20px)',
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }}
        className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center select-none overflow-hidden"
      >
        {/* Background Subtle Red Radial Flare */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px] pointer-events-none" />

        {/* Ambient Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f100e15_1px,transparent_1px),linear-gradient(to_bottom,#1f100e15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          {/* Studio Top Label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 font-mono text-xs tracking-[0.35em] text-primary uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            DIRECTOR'S CUT // CINEMATIC PORTFOLIO
          </motion.div>

          {/* Huge Brand Typography */}
          <motion.h1
            initial={{ letterSpacing: '0.3em', opacity: 0, scale: 0.9 }}
            animate={{ letterSpacing: '0.08em', opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-anton text-7xl md:text-9xl tracking-tight text-white drop-shadow-[0_0_35px_rgba(230,0,0,0.4)]"
          >
            PRTHM
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-mono text-xs md:text-sm tracking-[0.25em] text-on-surface-variant uppercase"
          >
            VIDEO EDITOR • VISUAL STORYTELLER
          </motion.p>

          {/* Loading Progress Bar & Counter */}
          <div className="w-64 md:w-80 mt-6 flex flex-col gap-2">
            <div className="flex justify-between items-center font-mono text-[11px] text-on-surface-muted tracking-widest">
              <span>LOADING FRAMES</span>
              <span className="text-primary font-bold">{formattedProgress}%</span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-primary shadow-[0_0_12px_#E60000]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Technical Tag */}
        <div className="absolute bottom-10 flex items-center gap-4 font-mono text-[10px] text-white/30 tracking-widest uppercase">
          <span>4K TIMELINE</span>
          <span>•</span>
          <span>ACES COLOR MATRIX</span>
          <span>•</span>
          <span>2026 EDITION</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
