import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface PortraitSceneProps {
  portraitUrl: string;
  onExploreWork: () => void;
}

export const PortraitScene: React.FC<PortraitSceneProps> = ({ portraitUrl, onExploreWork }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth) - 0.5;
      const normalizedY = (e.clientY / innerHeight) - 0.5;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Dynamic 3D Scroll Transforms
  // As user scrolls down, portrait moves backward in Z-space, tilts, scales down, blurs, and fades out
  const scrollProgress = Math.min(scrollY / 700, 1.2);
  const zTranslate = -scrollProgress * 450;
  const yTranslate = scrollProgress * 120;
  const scale = Math.max(0.55, 1 - scrollProgress * 0.4);
  const opacity = Math.max(0, 1 - scrollProgress * 1.35);
  const blur = scrollProgress * 14;
  const scrollRotateX = scrollProgress * 18;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center perspective-1000 select-none"
    >
      {/* 3D Motion Container */}
      <motion.div
        style={{
          x: translateX,
          y: translateY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px] aspect-[3/4] transition-transform duration-75 ease-out cursor-pointer group"
        onClick={onExploreWork}
        data-cursor="explore"
        data-cursor-label="EXPLORE"
      >
        {/* Scroll-Driven Dynamic 3D Layer */}
        <div
          style={{
            transform: `translate3d(0px, ${yTranslate}px, ${zTranslate}px) scale(${scale}) rotateX(${scrollRotateX}deg)`,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.05s linear, opacity 0.05s linear, filter 0.05s linear',
          }}
          className="relative w-full h-full"
        >
          {/* Atmospheric Red Halo Glow behind Portrait */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-primary/40 via-primary-container/20 to-transparent blur-[90px] rounded-full -z-10 animate-glow-breathe pointer-events-none" />

          {/* Secondary Volumetric Light Cone */}
          <div className="absolute -top-24 -left-20 w-[400px] h-[500px] bg-primary/20 blur-[120px] -rotate-45 pointer-events-none rounded-full" />

          {/* Frame Container */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden rim-light-hover rim-light bg-surface/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            {/* Real Portrait Image of Prthm */}
            <img
              src={portraitUrl}
              alt="Prthm — Video Editor & Visual Storyteller"
              className="w-full h-full object-cover object-top filter contrast-[1.12] brightness-95 group-hover:scale-105 group-hover:contrast-[1.18] transition-all duration-700 ease-out"
              loading="eager"
            />

            {/* Subtle Gradient Overlays for Cinematic Mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 pointer-events-none mix-blend-overlay" />

            {/* Live Interactive Tag / HUD badge on portrait */}
            <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 flex items-center justify-between p-2 sm:p-3 rounded-xl bg-surface/85 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/20 border border-primary/40 shrink-0">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-ping" />
                  <span className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[8px] sm:text-[10px] text-primary tracking-widest uppercase font-bold">
                    AVAILABLE FOR PROJECTS
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/90 font-medium">
                    4K HDR • REELS & FILMS
                  </span>
                </div>
              </div>

              {/* Status cue badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/90 text-white font-mono text-[10px] tracking-wider uppercase shadow-red-glow">
                <span>VIEW WORK</span>
              </div>
            </div>

            {/* Cinematic Corner Accents */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-2.5 sm:w-3 h-2.5 sm:h-3 border-t-2 border-l-2 border-primary/70 pointer-events-none" />
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-2.5 sm:w-3 h-2.5 sm:h-3 border-t-2 border-r-2 border-primary/70 pointer-events-none" />
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-2.5 sm:w-3 h-2.5 sm:h-3 border-b-2 border-l-2 border-primary/70 pointer-events-none" />
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-2.5 sm:w-3 h-2.5 sm:h-3 border-b-2 border-r-2 border-primary/70 pointer-events-none" />
          </div>

          {/* Floating 3D Spec Badges in Z-Space */}
          <div
            style={{ transform: 'translateZ(35px)' }}
            className="absolute -top-3 sm:-top-4 -right-2 sm:-right-4 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-surface-container-high/90 border border-primary/40 backdrop-blur-md font-mono text-[9px] sm:text-[11px] text-primary tracking-widest font-semibold shadow-red-glow uppercase"
          >
            DIRECTOR'S EYE
          </div>

          <div
            style={{ transform: 'translateZ(45px)' }}
            className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-surface-container-high/90 border border-white/15 backdrop-blur-md font-mono text-[8px] sm:text-[10px] text-on-surface-variant tracking-widest font-medium uppercase"
          >
            VN • CAPCUT PRO • DAVINCI
          </div>
        </div>
      </motion.div>
    </div>
  );
};
