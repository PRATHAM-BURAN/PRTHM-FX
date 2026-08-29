import React, { useEffect, useRef, useState, useCallback } from 'react';

interface BackgroundSequenceProps {
  totalFrames?: number;
  maxFadeScroll?: number; // Scroll distance in px at which the sequence fully fades out
}

export const BackgroundSequence: React.FC<BackgroundSequenceProps> = ({
  totalFrames = 300,
  maxFadeScroll = 1200
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [opacity, setOpacity] = useState(0.85);

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Preload all 300 sequence images
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
        if (loaded >= 20) {
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

  // Render frame to canvas with aspect ratio centering & cinematic vignette
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const idx = Math.max(0, Math.min(totalFrames - 1, Math.floor(frameIdx)));
    const img = imagesRef.current[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate aspect ratio cover / containment centered
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

    // Deep cinematic radial vignette
    const radialGrad = ctx.createRadialGradient(
      canvasWidth / 2,
      canvasHeight / 2,
      canvasWidth * 0.15,
      canvasWidth / 2,
      canvasHeight / 2,
      Math.max(canvasWidth, canvasHeight) * 0.65
    );
    radialGrad.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
    radialGrad.addColorStop(0.6, 'rgba(5, 5, 5, 0.6)');
    radialGrad.addColorStop(1, 'rgba(5, 5, 5, 0.96)');
    ctx.fillStyle = radialGrad;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Subtle red atmospheric ambient tone
    const redGlow = ctx.createRadialGradient(
      canvasWidth / 2,
      canvasHeight * 0.45,
      10,
      canvasWidth / 2,
      canvasHeight * 0.45,
      canvasWidth * 0.6
    );
    redGlow.addColorStop(0, 'rgba(230, 0, 0, 0.12)');
    redGlow.addColorStop(0.7, 'rgba(152, 0, 0, 0.04)');
    redGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = redGlow;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.restore();
  }, [totalFrames]);

  // High-performance smooth animation loop (Lerp)
  useEffect(() => {
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.12;

      if (Math.abs(diff) < 0.04) {
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

  // Scroll listener: maps scroll to sequence frame & calculates slow smooth fade-out
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Map scroll to frame index across the hero / first sections
      const scrollRange = 1000;
      const scrollProgress = Math.min(Math.max(scrollY / scrollRange, 0), 1);
      targetFrameRef.current = scrollProgress * (totalFrames - 1);

      // Slow smooth fade out as user scrolls down
      // At scroll 0 -> opacity 0.85
      // As scroll approaches maxFadeScroll (e.g. 1100px) -> opacity fades to 0
      const fadeProgress = Math.min(scrollY / maxFadeScroll, 1);
      const currentOpacity = Math.max(0, 0.85 * (1 - Math.pow(fadeProgress, 1.2)));
      setOpacity(currentOpacity);
    };

    // Ambient idle animation when sitting at the top of the page
    const idleInterval = setInterval(() => {
      if (window.scrollY < 20) {
        targetFrameRef.current = (targetFrameRef.current + 0.8) % totalFrames;
      }
    }, 40);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearInterval(idleInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [totalFrames, maxFadeScroll]);

  // Canvas resize listener
  useEffect(() => {
    const updateSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      renderFrame(currentFrameRef.current);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, [renderFrame]);

  if (opacity <= 0.005) {
    return null; // Don't render canvas when fully faded out
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden transition-opacity duration-150 ease-out"
      style={{ opacity: opacity }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
      />
    </div>
  );
};
