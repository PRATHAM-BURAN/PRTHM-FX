import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface FrameSequencePlayerProps {
  totalFrames?: number;
  onExploreWork?: () => void;
}

export const FrameSequencePlayer: React.FC<FrameSequencePlayerProps> = ({
  totalFrames = 300,
  onExploreWork
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Preload all 300 image frames into memory
  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const padZero = (num: number, size = 3) => {
      let s = num + '';
      while (s.length < size) s = '0' + s;
      return s;
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameIndex = padZero(i, 3);
      img.src = `/assets/sequence/ezgif-frame-${frameIndex}.png`;
      img.onload = () => {
        if (!mounted) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= Math.min(30, totalFrames)) {
          // Ready to start rendering as soon as initial buffer is ready
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      mounted = false;
    };
  }, [totalFrames]);

  // Render a specific frame onto the high-DPI canvas
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const idx = Math.max(0, Math.min(totalFrames - 1, Math.floor(frameIdx)));
    const img = imagesRef.current[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate aspect ratio cover
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.save();
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Subtle cinematic vignette
    const gradient = ctx.createRadialGradient(
      canvasWidth / 2,
      canvasHeight / 2,
      canvasWidth * 0.2,
      canvasWidth / 2,
      canvasHeight / 2,
      canvasWidth * 0.75
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.restore();
  }, [totalFrames]);

  // Smooth lerp render loop using requestAnimationFrame
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      // Smooth linear interpolation (lerp) toward target frame
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.14;

      // Keep target moving slightly for natural ambient motion when idle
      if (Math.abs(diff) < 0.05) {
        currentFrameRef.current = targetFrameRef.current;
      }

      renderFrame(currentFrameRef.current);
      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  // Handle scroll to smoothly map scroll position to target frame
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 1200; // Sequence completes over first 1200px of scroll
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      targetFrameRef.current = progress * (totalFrames - 1);
    };

    // Auto-play when idle / hovering
    let autoPlayTimer: any;
    const startAutoPlay = () => {
      if (window.scrollY < 50) {
        targetFrameRef.current = (targetFrameRef.current + 1.2) % totalFrames;
      }
    };

    const interval = setInterval(startAutoPlay, 33); // ~30fps subtle idle playback

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [totalFrames]);

  // Canvas resize handler for Retina / HiDPI display
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      renderFrame(currentFrameRef.current);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [renderFrame]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-[3/4] select-none group cursor-pointer"
      onClick={onExploreWork}
    >
      {/* Ambient Red Nebula Glow behind sequence */}
      <div className="absolute -inset-8 bg-gradient-to-tr from-primary/50 via-primary/20 to-transparent blur-[80px] rounded-full -z-10 animate-glow-breathe pointer-events-none" />

      {/* Frame Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden rim-light-hover rim-light bg-surface/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
        {/* Canvas Frame Sequence Renderer */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
        />

        {/* Loading Indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-surface/90 backdrop-blur-md flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <span className="font-mono text-[10px] text-primary tracking-widest uppercase">
              BUFFERING SEQUENCE ({Math.round((loadedCount / totalFrames) * 100)}%)
            </span>
          </div>
        )}

        {/* Cinematic Corner Accents */}
        <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-primary/70 pointer-events-none" />
        <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-primary/70 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-primary/70 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-primary/70 pointer-events-none" />

        {/* Live HUD Badge */}
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between p-3 rounded-xl bg-surface/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/40">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="absolute w-2 h-2 rounded-full bg-primary" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-mono text-[10px] text-primary tracking-widest uppercase font-bold">
                SCROLL TIMELINE LIVE
              </span>
              <span className="font-mono text-[11px] text-white/90">
                FRAME {Math.floor(currentFrameRef.current) + 1} / {totalFrames}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/90 text-white font-mono text-[10px] tracking-wider uppercase shadow-red-glow">
            <span>SCROLL TO SCRUB</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
