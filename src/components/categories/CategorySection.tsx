import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Compass,
  RotateCw,
  Gauge,
  Eye,
  Activity,
  LayoutGrid,
  HardDrive,
  ExternalLink,
  Youtube
} from 'lucide-react';
import { categories, mainDriveUrl } from '../../data/portfolioData';

interface CategorySectionProps {
  onContactClick?: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'3d-wheel' | 'matrix'>('3d-wheel');
  const [isHoveringStage, setIsHoveringStage] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const wheelDebounceRef = useRef<number>(0);
  const lastMouseMoveX = useRef<number>(0);
  const mouseMoveAccumulator = useRef<number>(0);

  const totalCategories = categories.length;
  const activeCategory = categories[activeIndex] || categories[0];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigate forward / backward in circular loop
  const stepIndex = useCallback((direction: 'next' | 'prev') => {
    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % totalCategories;
      } else {
        return (prev - 1 + totalCategories) % totalCategories;
      }
    });
  }, [totalCategories]);

  // Handle mouse movement across the 3D stage for subtle perspective tilt only
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    
    // Smooth, gentle normalized coordinates for 3D card tilt (-1 to 1)
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseTilt({ x: normX * 8, y: -normY * 6 });
  };

  const handleStageMouseLeave = () => {
    setIsHoveringStage(false);
    setMouseTilt({ x: 0, y: 0 });
  };

  // Wheel scrub over the 3D carousel
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - wheelDebounceRef.current < 320) return;
    
    if (Math.abs(e.deltaX) > 25 || Math.abs(e.deltaY) > 25) {
      wheelDebounceRef.current = now;
      if (e.deltaX > 0 || e.deltaY > 0) {
        stepIndex('next');
      } else {
        stepIndex('prev');
      }
    }
  };

  // Single-Step Touch Swipe support for mobile devices
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchLastXRef = useRef<number | null>(null);
  const lastSwipeTimeRef = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
      touchLastXRef.current = e.touches[0].clientX;
      isSwipingRef.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipingRef.current || touchStartXRef.current === null) return;
    const currentX = e.touches[0].clientX;
    touchLastXRef.current = currentX;
  };

  const handleTouchEnd = () => {
    if (!isSwipingRef.current || touchStartXRef.current === null || touchLastXRef.current === null) {
      isSwipingRef.current = false;
      return;
    }

    const now = Date.now();
    // Debounce to guarantee exactly 1 card movement per swipe gesture
    if (now - lastSwipeTimeRef.current > 280) {
      const diffX = touchLastXRef.current - touchStartXRef.current;
      if (Math.abs(diffX) >= 35) {
        lastSwipeTimeRef.current = now;
        if (diffX < 0) {
          stepIndex('next'); // Swiped left -> EXACTLY +1 card
        } else {
          stepIndex('prev'); // Swiped right -> EXACTLY -1 card
        }
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchLastXRef.current = null;
    isSwipingRef.current = false;
    setMouseTilt({ x: 0, y: 0 });
  };

  // Pointer Drag support for desktop & trackpads (mouse only)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      setDragStartX(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && dragStartX !== null) {
      const diff = e.clientX - dragStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          stepIndex('next');
        } else {
          stepIndex('prev');
        }
      }
      setDragStartX(null);
    }
  };

  // Keyboard navigation when hovering
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHoveringStage) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        stepIndex('next');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        stepIndex('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHoveringStage, stepIndex]);

  return (
    <section id="categories" className="relative py-28 px-4 md:px-12 lg:px-20 overflow-hidden select-none">
      {/* Background Red Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header with View Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary tracking-[0.3em] uppercase">
              <Sparkles className="w-4 h-4" />
              <span>SPECIALIZED NICHES & GENRES</span>
            </div>
            <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none">
              EXPLORE MY WORK
            </h2>
            <p className="font-inter text-sm sm:text-base text-on-surface-variant">
              Interactive 3D rotational queue. Move cursor or swipe to rotate through genres and access direct Google Drive archives for each category.
            </p>
          </div>

          {/* Mode Switcher & Quick Navigation */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="flex items-center p-1 rounded-xl bg-surface border border-white/10 shadow-lg">
              <button
                onClick={() => setViewMode('3d-wheel')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === '3d-wheel'
                    ? 'bg-primary text-white shadow-red-glow font-bold'
                    : 'text-on-surface-muted hover:text-white'
                }`}
                title="3D Rotational Watch Queue"
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">3D QUEUE</span>
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'matrix'
                    ? 'bg-primary text-white shadow-red-glow font-bold'
                    : 'text-on-surface-muted hover:text-white'
                }`}
                title="Grid Matrix View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">GRID MATRIX</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D ROTATING CIRCULAR LOOP QUEUE VIEW */}
        {viewMode === '3d-wheel' ? (
          <div className="space-y-8">
            {/* Interactive Rotary Dial / Watch Crown Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-surface/80 border border-white/10 backdrop-blur-md">
              {/* Bezel Title & Current Indicator */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-center text-primary shadow-red-glow">
                  <Gauge className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase">
                      3D DIAL POSITION
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  </div>
                  <div className="font-anton text-lg text-white tracking-wide uppercase flex items-center gap-2">
                    <span>{activeCategory.name}</span>
                    <span className="text-on-surface-muted font-mono text-xs font-normal">
                      [{String(activeIndex + 1).padStart(2, '0')} / {String(totalCategories).padStart(2, '0')}]
                    </span>
                  </div>
                </div>
              </div>

              {/* Rotary Bezel Ticks (Clickable Dial Markers) */}
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-dim/80 border border-white/5">
                {categories.map((c, i) => {
                  const isCurrent = i === activeIndex;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveIndex(i)}
                      className={`group relative flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        isCurrent ? 'scale-110' : 'opacity-40 hover:opacity-100'
                      }`}
                      title={c.name}
                    >
                      <span
                        className={`w-2.5 h-7 rounded-full transition-all ${
                          isCurrent
                            ? 'bg-primary shadow-red-glow h-8'
                            : 'bg-white/20 group-hover:bg-primary/50'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Navigation Crown Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => stepIndex('prev')}
                  className="p-2.5 rounded-xl bg-surface-dim hover:bg-surface border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-all active:scale-95 cursor-pointer shadow-md"
                  aria-label="Previous Category"
                  title="Previous Category (Arrow Left / Scroll Up)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="px-3 py-1.5 rounded-lg bg-surface-dim border border-white/5 font-mono text-[11px] text-on-surface-muted">
                  <span className="text-primary font-bold">DRAG</span> OR <span className="text-primary font-bold">SCROLL</span>
                </div>
                <button
                  onClick={() => stepIndex('next')}
                  className="p-2.5 rounded-xl bg-surface-dim hover:bg-surface border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-all active:scale-95 cursor-pointer shadow-md"
                  aria-label="Next Category"
                  title="Next Category (Arrow Right / Scroll Down)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3D CIRCULAR PERSPECTIVE ARENA */}
            <div
              ref={stageRef}
              onMouseEnter={() => setIsHoveringStage(true)}
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className="relative h-[410px] sm:h-[440px] w-full flex items-center justify-center overflow-hidden rounded-3xl bg-radial-gradient border border-white/10 perspective-1000 cursor-grab active:cursor-grabbing touch-pan-y"
              style={{
                background: 'radial-gradient(circle at center, rgba(230,0,0,0.08) 0%, rgba(12,12,12,0.95) 75%)'
              }}
            >
              {/* Circular Dial Compass Track Graphics in Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[500px] h-[500px] rounded-full border border-dashed border-primary/40 animate-spin-slow" />
                <div className="absolute w-[360px] h-[360px] rounded-full border border-primary/20" />
                <div className="absolute w-[220px] h-[220px] rounded-full border border-white/10" />
              </div>

              {/* 3D Circular Revolving Carousel Items */}
              <div
                className="relative w-full h-full flex items-center justify-center transform-3d transition-transform duration-500 ease-out touch-pan-y"
                style={{
                  transform: `rotateX(${mouseTilt.y * 0.4}deg) rotateY(${mouseTilt.x * 0.4}deg)`
                }}
              >
                {categories.map((cat, idx) => {
                  // Calculate shortest circular offset in [-total/2, total/2]
                  let offset = (idx - activeIndex) % totalCategories;
                  if (offset > totalCategories / 2) offset -= totalCategories;
                  if (offset < -totalCategories / 2) offset += totalCategories;

                  const isCenter = offset === 0;
                  const isVisible = Math.abs(offset) <= 3; // Render only nearest visible cards in queue
                  if (!isVisible) return null;

                  // 3D positioning coordinates tailored for mobile screens vs desktop
                  const isMobile = windowWidth < 640;
                  const isTablet = windowWidth >= 640 && windowWidth < 1024;
                  const stepSeparation = isMobile ? 165 : isTablet ? 200 : 240;
                  const xOffset = offset * stepSeparation; // horizontal separation
                  const zOffset = -Math.abs(offset) * (isMobile ? 120 : 170); // depth receding
                  const rotateY = -offset * (isMobile ? 22 : 26); // angular circular tilt
                  const scale = isCenter ? 1.03 : Math.max(0.72, 1 - Math.abs(offset) * 0.14);
                  const opacity = isCenter ? 1 : Math.max(0.2, 1 - Math.abs(offset) * (isMobile ? 0.35 : 0.28));
                  const zIndex = 20 - Math.abs(offset) * 3;

                  return (
                    <motion.div
                      key={cat.id}
                      onClick={() => setActiveIndex(idx)}
                      animate={{
                        x: xOffset,
                        z: zOffset,
                        rotateY: rotateY,
                        scale: scale,
                        opacity: opacity,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 28,
                        mass: 0.8
                      }}
                      style={{
                        zIndex,
                        transformStyle: 'preserve-3d',
                      }}
                      className={`absolute w-[82vw] max-w-[280px] sm:max-w-[330px] p-5 sm:p-7 rounded-3xl transition-shadow duration-300 select-none touch-pan-y ${
                        isCenter
                          ? 'bg-surface-container-high/95 rim-light-red shadow-red-glow backdrop-blur-xl cursor-default ring-1 ring-primary/40'
                          : 'bg-surface/80 hover:bg-surface border border-white/10 hover:border-primary/40 backdrop-blur-md cursor-pointer hover:shadow-lg'
                      }`}
                    >
                      {/* Floating Card Watch-Effect Gloss & Radial Highlight */}
                      <div
                        className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-primary/25 blur-2xl transition-opacity pointer-events-none ${
                          isCenter ? 'opacity-100' : 'opacity-0'
                        }`}
                      />

                      {/* Spotlight Floating HUD Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isCenter ? 'bg-primary animate-pulse' : 'bg-white/20'
                            }`}
                          />
                          <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest">
                            {isCenter ? 'SPOTLIGHT' : 'IN QUEUE'}
                          </span>
                        </div>

                        {isCenter && (
                          <div className="flex items-center gap-1 text-[10px] font-mono text-white/70 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                            <Eye className="w-3 h-3 text-primary" />
                            <span>ACTIVE</span>
                          </div>
                        )}
                      </div>

                      {/* Genre Title & Bio */}
                      <div className="space-y-2.5">
                        <h3
                          className={`font-anton text-2xl sm:text-3xl tracking-wide uppercase transition-colors ${
                            isCenter ? 'text-white text-glow-red' : 'text-on-surface-variant'
                          }`}
                        >
                          {cat.name}
                        </h3>
                        <p className="font-inter text-xs text-on-surface-muted leading-relaxed line-clamp-2">
                          {cat.description}
                        </p>
                      </div>

                      {/* Highlighted Links on Card */}
                      {isCenter ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="mt-5 pt-4 border-t border-white/10 space-y-2"
                        >
                          {cat.youtubePlaylistUrl && (
                            <a
                              href={cat.youtubePlaylistUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-full flex items-center justify-between p-3 rounded-2xl bg-red-600/20 hover:bg-red-600 text-white border border-red-500/40 hover:border-red-500 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-mono text-xs font-bold uppercase tracking-wider group/yt"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-6 h-6 rounded-lg bg-red-600 group-hover/yt:bg-black/30 flex items-center justify-center text-white transition-colors">
                                  <Youtube className="w-3.5 h-3.5" />
                                </div>
                                <span>YOUTUBE PLAYLIST</span>
                              </div>
                              <ExternalLink className="w-4 h-4 text-white/90 group-hover/yt:translate-x-0.5 group-hover/yt:-translate-y-0.5 transition-transform" />
                            </a>
                          )}

                          <a
                            href={cat.driveUrl || mainDriveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full flex items-center justify-between p-3 rounded-2xl bg-primary text-white shadow-red-glow hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-mono text-xs font-bold uppercase tracking-wider group/drive"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded-lg bg-black/25 flex items-center justify-center">
                                <HardDrive className="w-3.5 h-3.5 text-white" />
                              </div>
                              <span>GOOGLE DRIVE FOLDER</span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-white/90 group-hover/drive:translate-x-0.5 group-hover/drive:-translate-y-0.5 transition-transform" />
                          </a>
                        </motion.div>
                      ) : (
                        <div className="mt-5 pt-3 border-t border-white/5 space-y-2">
                          {cat.youtubePlaylistUrl && (
                            <a
                              href={cat.youtubePlaylistUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-red-600/15 hover:bg-red-600/30 border border-red-500/30 text-red-400 hover:text-white font-mono text-[10px] font-bold tracking-wider uppercase transition-colors"
                            >
                              <div className="flex items-center gap-1.5">
                                <Youtube className="w-3 h-3 text-red-500" />
                                <span>YT PLAYLIST</span>
                              </div>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}

                          <div className="flex items-center justify-between">
                            <a
                              href={cat.driveUrl || mainDriveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 text-primary hover:text-white font-mono text-[11px] font-bold tracking-wider uppercase transition-colors"
                            >
                              <HardDrive className="w-3 h-3" />
                              <span>DRIVE VAULT</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                            <div className="flex items-center gap-1 text-on-surface-muted font-mono text-[10px]">
                              <span>ROTATE</span>
                              <RotateCw className="w-3 h-3 text-primary/70" />
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Cue Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md flex items-center gap-2 font-mono text-[10px] text-on-surface-muted pointer-events-none whitespace-nowrap shadow-lg">
                <Activity className="w-3 h-3 text-primary animate-pulse shrink-0" />
                <span className="hidden sm:inline">MOVE CURSOR OR DRAG TO ROTATE 3D QUEUE</span>
                <span className="sm:hidden text-white font-medium">👈 SWIPE LEFT / RIGHT TO EXPLORE 👉</span>
              </div>
            </div>
          </div>
        ) : (
          /* ALTERNATIVE MATRIX GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {categories.map((cat, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative p-5 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'bg-surface-container-high rim-light-red shadow-red-glow scale-[1.02]'
                      : 'bg-surface/70 hover:bg-surface rim-light hover:border-primary/40'
                  }`}
                >
                  <div
                    className={`absolute -top-6 -right-6 w-16 h-16 rounded-full bg-primary/30 blur-xl transition-opacity ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  />

                  <div className="space-y-1.5">
                    <h3
                      className={`font-anton text-lg sm:text-xl tracking-wide uppercase transition-colors ${
                        isSelected ? 'text-primary' : 'text-white group-hover:text-primary'
                      }`}
                    >
                      {cat.name}
                    </h3>
                    <p className="font-inter text-[11px] text-on-surface-muted line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* Highlighted Links inside matrix card */}
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                    {cat.youtubePlaylistUrl && (
                      <a
                        href={cat.youtubePlaylistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-white border border-red-500/40 hover:shadow-red-glow transition-all font-mono text-[10px] font-bold tracking-wider uppercase cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5">
                          <Youtube className="w-3.5 h-3.5" />
                          <span>YT PLAYLIST</span>
                        </div>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    <a
                      href={cat.driveUrl || mainDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-primary/20 hover:bg-primary text-primary hover:text-white border border-primary/40 hover:shadow-red-glow transition-all font-mono text-[10px] font-bold tracking-wider uppercase cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <HardDrive className="w-3.5 h-3.5" />
                        <span>OPEN DRIVE</span>
                      </div>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};


