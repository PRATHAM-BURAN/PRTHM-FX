import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  HardDrive,
  ExternalLink,
  Activity,
  LayoutGrid,
  Radio,
  RotateCw,
  X
} from 'lucide-react';
import { galleryVideos, mainDriveUrl } from '../../data/portfolioData';
import { GalleryVideo } from '../../types';

export const EditsGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [viewMode, setViewMode] = useState<'3d-reel' | 'grid'>('3d-reel');
  const [activeFilter, setActiveFilter] = useState('all');
  const [fullscreenVideo, setFullscreenVideo] = useState<GalleryVideo | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [isHoveringStage, setIsHoveringStage] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchLastXRef = useRef<number | null>(null);
  const lastSwipeTimeRef = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);
  const wheelDebounceRef = useRef<number>(0);

  const totalVideos = galleryVideos.length;
  const currentVideo = galleryVideos[activeIndex] || galleryVideos[0];

  // Window resize tracking
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Step to next / prev video (strictly 1 step)
  const stepVideo = useCallback((direction: 'next' | 'prev') => {
    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % totalVideos;
      } else {
        return (prev - 1 + totalVideos) % totalVideos;
      }
    });
    setVideoProgress(0);
    setCurrentTime(0);
  }, [totalVideos]);

  // Video Time Update listener
  const handleTimeUpdate = () => {
    if (activeVideoRef.current) {
      const current = activeVideoRef.current.currentTime;
      const duration = activeVideoRef.current.duration || 1;
      setCurrentTime(current);
      setVideoDuration(duration);
      setVideoProgress((current / duration) * 100);
    }
  };

  // Video Scrubbing
  const handleScrub = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    if (activeVideoRef.current && videoDuration) {
      activeVideoRef.current.currentTime = pos * videoDuration;
    }
  };

  // Toggle Play / Pause
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeVideoRef.current) return;
    if (isPlaying) {
      activeVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      activeVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Toggle Mute / Unmute
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeVideoRef.current) return;
    activeVideoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Touch Swipe Handlers for mobile (Single-Step & Debounced)
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
    if (now - lastSwipeTimeRef.current > 280) {
      const diffX = touchLastXRef.current - touchStartXRef.current;
      if (Math.abs(diffX) >= 35) {
        lastSwipeTimeRef.current = now;
        if (diffX < 0) {
          stepVideo('next'); // Swiped left -> EXACTLY +1 video
        } else {
          stepVideo('prev'); // Swiped right -> EXACTLY -1 video
        }
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchLastXRef.current = null;
    isSwipingRef.current = false;
    setMouseTilt({ x: 0, y: 0 });
  };

  // Subtle Mouse move tilt (Low Sensitivity / Gentle perspective)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseTilt({ x: normX * 8, y: -normY * 6 });
  };

  // Controlled Wheel scrub
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - wheelDebounceRef.current < 320) return;
    if (Math.abs(e.deltaX) > 25 || Math.abs(e.deltaY) > 25) {
      wheelDebounceRef.current = now;
      if (e.deltaX > 0 || e.deltaY > 0) {
        stepVideo('next');
      } else {
        stepVideo('prev');
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHoveringStage) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        stepVideo('next');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        stepVideo('prev');
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm') {
        e.preventDefault();
        toggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHoveringStage, stepVideo, isPlaying, isMuted]);

  // Categories for Grid Filter
  const filterCategories = [
    { slug: 'all', name: 'ALL EDITS' },
    { slug: 'reels', name: 'REELS & SHORTS' },
    { slug: 'travel', name: 'TRAVEL' },
    { slug: 'college-life', name: 'COLLEGE' },
    { slug: 'short-films', name: 'SHORT FILMS' },
    { slug: 'vlogs', name: 'VLOGS' },
    { slug: 'cooking', name: 'FOOD & ASMR' },
    { slug: 'events', name: 'EVENTS' },
    { slug: 'experimental', name: '3D VFX' }
  ];

  const filteredVideos = activeFilter === 'all'
    ? galleryVideos
    : galleryVideos.filter((v) => v.categorySlug === activeFilter);

  return (
    <section id="gallery" className="relative py-28 px-4 md:px-12 lg:px-20 overflow-hidden bg-background">
      {/* Cinematic Red Nebula Backlighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[240px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-primary tracking-[0.3em] uppercase">
              <Radio className="w-4 h-4 text-primary animate-pulse" />
              <span>LIVE TIMELINE EDITS SHOWCASE</span>
            </div>
            <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none">
              EDITS GALLERY
            </h2>
            <p className="font-inter text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Real timeline renders with preserved original ratios, sound design, velocity speed ramps, and color mastering.
            </p>
          </div>

          {/* Mode Switcher & Quick Navigation */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="flex items-center p-1 rounded-xl bg-surface border border-white/10 shadow-lg">
              <button
                onClick={() => setViewMode('3d-reel')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === '3d-reel'
                    ? 'bg-primary text-white shadow-red-glow font-bold'
                    : 'text-on-surface-muted hover:text-white'
                }`}
                title="3D Cinematic Curved Reel"
              >
                <Film className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">3D REEL</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white shadow-red-glow font-bold'
                    : 'text-on-surface-muted hover:text-white'
                }`}
                title="Video Grid Wall"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">VIDEO WALL</span>
              </button>
            </div>
          </div>
        </div>

        {/* VIEW MODE 1: 3D CURVED CINEMATIC REEL */}
        {viewMode === '3d-reel' ? (
          <div className="space-y-8">
            {/* Top Control HUD & Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-surface/85 border border-white/10 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-red-glow">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase">
                      ACTIVE TIMELINE EDIT
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  </div>
                  <div className="font-anton text-lg sm:text-xl text-white tracking-wide uppercase flex items-center gap-2">
                    <span>{currentVideo.title}</span>
                    <span className="text-on-surface-muted font-mono text-xs font-normal">
                      [{String(activeIndex + 1).padStart(2, '0')} / {String(totalVideos).padStart(2, '0')}]
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Quick Media Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="px-3.5 py-2 rounded-xl bg-surface-dim hover:bg-surface border border-white/10 hover:border-primary/50 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-primary" /> : <Play className="w-3.5 h-3.5 text-primary fill-current" />}
                  <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>

                <button
                  onClick={toggleMute}
                  className={`px-3.5 py-2 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer transition-all ${
                    !isMuted
                      ? 'bg-primary text-white border-primary shadow-red-glow'
                      : 'bg-surface-dim hover:bg-surface border-white/10 text-on-surface-variant hover:text-white'
                  }`}
                >
                  {!isMuted ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{!isMuted ? 'AUDIO ON' : 'UNMUTE'}</span>
                </button>

                <button
                  onClick={() => setFullscreenVideo(currentVideo)}
                  className="p-2 rounded-xl bg-surface-dim hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-all cursor-pointer"
                  title="Fullscreen Cinema Mode"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => stepVideo('prev')}
                  className="p-2.5 rounded-xl bg-surface-dim hover:bg-surface border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-all active:scale-95 cursor-pointer shadow-md"
                  aria-label="Previous Video"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="px-3 py-1.5 rounded-lg bg-surface-dim border border-white/5 font-mono text-[11px] text-on-surface-muted">
                  <span className="text-primary font-bold">SWIPE</span> OR <span className="text-primary font-bold">CLICK</span>
                </div>
                <button
                  onClick={() => stepVideo('next')}
                  className="p-2.5 rounded-xl bg-surface-dim hover:bg-surface border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-all active:scale-95 cursor-pointer shadow-md"
                  aria-label="Next Video"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3D PARABOLIC CINEMA STAGE */}
            <div
              ref={stageRef}
              onMouseEnter={() => setIsHoveringStage(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setIsHoveringStage(false);
                setMouseTilt({ x: 0, y: 0 });
              }}
              onWheel={handleWheel}
              onPointerDown={(e) => {
                if (e.pointerType === 'mouse') setDragStartX(e.clientX);
              }}
              onPointerUp={(e) => {
                if (e.pointerType === 'mouse' && dragStartX !== null) {
                  const diff = e.clientX - dragStartX;
                  if (Math.abs(diff) > 40) {
                    if (diff < 0) stepVideo('next');
                    else stepVideo('prev');
                  }
                  setDragStartX(null);
                }
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className="relative h-[540px] sm:h-[600px] w-full flex items-center justify-center overflow-hidden rounded-3xl bg-radial-gradient border border-white/10 perspective-1000 cursor-grab active:cursor-grabbing touch-pan-y select-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(230,0,0,0.1) 0%, rgba(6,6,6,0.98) 75%)'
              }}
            >
              {/* Cinema Horizon Light Beam Graphic */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[600px] h-[300px] bg-primary/25 rounded-full blur-[140px]" />
                <div className="absolute w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              </div>

              {/* 3D Curved Film-Reel Video Cards */}
              <div
                className="relative w-full h-full flex items-center justify-center transform-3d transition-transform duration-500 ease-out touch-pan-y"
                style={{
                  transform: `rotateX(${mouseTilt.y * 0.35}deg) rotateY(${mouseTilt.x * 0.35}deg)`
                }}
              >
                {galleryVideos.map((video, idx) => {
                  let offset = (idx - activeIndex) % totalVideos;
                  if (offset > totalVideos / 2) offset -= totalVideos;
                  if (offset < -totalVideos / 2) offset += totalVideos;

                  const isCenter = offset === 0;
                  const isVisible = Math.abs(offset) <= 3;
                  if (!isVisible) return null;

                  // 3D Parabolic Curved Positioning
                  const isMobile = windowWidth < 640;
                  const isTablet = windowWidth >= 640 && windowWidth < 1024;
                  const stepX = isMobile ? 180 : isTablet ? 230 : 280;
                  const xOffset = offset * stepX;
                  const zOffset = -Math.abs(offset) * (isMobile ? 140 : 190);
                  const rotateY = -offset * (isMobile ? 24 : 28);
                  const scale = isCenter ? 1.05 : Math.max(0.72, 1 - Math.abs(offset) * 0.15);
                  const opacity = isCenter ? 1 : Math.max(0.2, 1 - Math.abs(offset) * (isMobile ? 0.35 : 0.26));
                  const zIndex = 30 - Math.abs(offset) * 4;

                  return (
                    <motion.div
                      key={video.id}
                      onClick={() => {
                        if (!isCenter) setActiveIndex(idx);
                      }}
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
                      className={`absolute w-[240px] sm:w-[280px] md:w-[310px] h-[440px] sm:h-[490px] rounded-3xl overflow-hidden transition-all duration-300 select-none touch-pan-y flex flex-col justify-between bg-black ${
                        isCenter
                          ? 'rim-light-red shadow-red-glow-lg ring-2 ring-primary/60 cursor-default'
                          : 'rim-light bg-surface/90 hover:border-primary/50 opacity-40 hover:opacity-80 cursor-pointer shadow-2xl'
                      }`}
                    >
                      {/* Video / Snapshot Container - Preserves True Native Aspect Ratio without Cropping */}
                      <div className="relative w-full flex-1 bg-black/95 flex items-center justify-center overflow-hidden">
                        {isCenter ? (
                          <video
                            ref={activeVideoRef}
                            src={video.videoUrl}
                            playsInline
                            loop
                            muted={isMuted}
                            autoPlay
                            preload="auto"
                            onTimeUpdate={handleTimeUpdate}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-surface/80 to-black/90">
                            {/* Subtle film grain & reel motif for non-active cards (0% CPU/GPU overhead) */}
                            <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-3 shadow-md">
                              <Play className="w-6 h-6 fill-current ml-0.5" />
                            </div>
                            <span className="font-mono text-[10px] text-primary font-bold tracking-widest uppercase">
                              {video.category}
                            </span>
                            <span className="font-anton text-lg text-white mt-1 uppercase line-clamp-1">
                              {video.title}
                            </span>
                            <span className="font-mono text-[10px] text-on-surface-muted mt-2">
                              {video.duration || '0:30'}
                            </span>
                          </div>
                        )}

                        {/* Top Video Header HUD */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-20">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-white/15 backdrop-blur-md font-mono text-[9px] text-white">
                            <span className={`w-1.5 h-1.5 rounded-full ${isCenter ? 'bg-primary animate-ping' : 'bg-white/40'}`} />
                            <span className="text-primary font-bold uppercase">{video.category}</span>
                          </div>

                          <div className="font-mono text-[10px] text-white/80 bg-black/80 px-2 py-0.5 rounded-md border border-white/10">
                            {isCenter && videoDuration ? formatTime(currentTime) : video.duration || '0:30'}
                          </div>
                        </div>

                        {/* Center Playback State (Spotlight Only) */}
                        {isCenter && (
                          <div
                            onClick={togglePlay}
                            className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
                          >
                            {!isPlaying && (
                              <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-14 h-14 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-red-glow"
                              >
                                <Play className="w-6 h-6 fill-current ml-0.5" />
                              </motion.div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Bottom Info & Interactive Control Panel */}
                      <div className="p-4 space-y-2.5 bg-gradient-to-t from-black via-black/95 to-black/80 border-t border-white/10 z-20">
                        {/* Title & Description */}
                        <div>
                          <h3 className="font-anton text-lg sm:text-xl text-white tracking-wide uppercase line-clamp-1">
                            {video.title}
                          </h3>
                          <p className="font-inter text-[11px] text-on-surface-muted line-clamp-1 mt-0.5">
                            {video.description}
                          </p>
                        </div>

                        {/* Interactive Timeline Progress Scrubber (Spotlight only) */}
                        {isCenter && (
                          <div className="space-y-1.5 pt-0.5">
                            <div
                              onClick={handleScrub}
                              className="relative w-full h-2 rounded-full bg-white/20 hover:h-2.5 transition-all cursor-pointer overflow-hidden"
                            >
                              <div
                                style={{ width: `${videoProgress}%` }}
                                className="h-full bg-primary shadow-red-glow rounded-full"
                              />
                            </div>
                            <div className="flex justify-between items-center font-mono text-[9px] text-white/60">
                              <span>{formatTime(currentTime)}</span>
                              <span>{formatTime(videoDuration)}</span>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons Row */}
                        {isCenter ? (
                          <div className="flex items-center justify-between gap-2 pt-1">
                            <button
                              onClick={toggleMute}
                              className="flex-1 py-2 rounded-xl bg-surface-dim hover:bg-surface border border-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              {!isMuted ? <Volume2 className="w-3 h-3 text-primary" /> : <VolumeX className="w-3 h-3" />}
                              <span>{!isMuted ? 'SOUND ON' : 'MUTE'}</span>
                            </button>

                            <button
                              onClick={() => setFullscreenVideo(video)}
                              className="py-2 px-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-red-glow cursor-pointer"
                            >
                              <Maximize2 className="w-3 h-3" />
                              <span>EXPAND</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-primary font-mono text-[10px] font-bold uppercase tracking-wider pt-1">
                            <span>CLICK TO SPOTLIGHT</span>
                            <RotateCw className="w-3 h-3 text-primary/70" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Cue Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md flex items-center gap-2 font-mono text-[10px] text-on-surface-muted pointer-events-none whitespace-nowrap shadow-lg">
                <Activity className="w-3 h-3 text-primary animate-pulse shrink-0" />
                <span className="hidden sm:inline">SWIPE OR DRAG TO SWITCH EDITS • CLICK VIDEO TO PLAY</span>
                <span className="sm:hidden text-white font-medium">👈 SWIPE LEFT / RIGHT TO CHANGE VIDEO 👉</span>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW MODE 2: FILTERABLE VIDEO MATRIX GRID */
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 pb-2">
              {filterCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveFilter(cat.slug)}
                  className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === cat.slug
                      ? 'bg-primary text-white font-bold shadow-red-glow'
                      : 'bg-surface hover:bg-surface-container border border-white/10 text-on-surface-variant hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="group relative rounded-3xl overflow-hidden bg-surface border border-white/10 hover:border-primary/50 shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Video Container - Preserves True Native Aspect Ratio without Cropping */}
                  <div className="relative h-[360px] bg-black flex items-center justify-center overflow-hidden">
                    <video
                      src={video.videoUrl}
                      playsInline
                      loop
                      muted
                      preload="metadata"
                      onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                      className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 pointer-events-none" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 border border-white/15 backdrop-blur-md font-mono text-[9px] text-primary font-bold uppercase">
                      {video.category}
                    </div>

                    {/* Expand Button Overlay */}
                    <button
                      onClick={() => setFullscreenVideo(video)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-red-glow scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </button>
                  </div>

                  {/* Info Box */}
                  <div className="p-4 space-y-2.5 bg-surface-container">
                    <h3 className="font-anton text-lg text-white tracking-wide uppercase line-clamp-1 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="font-inter text-xs text-on-surface-muted line-clamp-2">
                      {video.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <button
                        onClick={() => setFullscreenVideo(video)}
                        className="font-mono text-[10px] text-primary hover:text-white font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>WATCH FULL EDIT</span>
                      </button>

                      <a
                        href={video.driveUrl || mainDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] text-on-surface-muted hover:text-primary uppercase flex items-center gap-1"
                      >
                        <HardDrive className="w-3 h-3" />
                        <span>DRIVE</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN CINEMA MODAL LIGHTBOX */}
      <AnimatePresence>
        {fullscreenVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setFullscreenVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[92dvh] rounded-3xl bg-surface border border-white/20 p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col lg:flex-row gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setFullscreenVideo(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/80 border border-white/20 text-white hover:text-primary hover:border-primary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Video Player with 100% Native Aspect Preservation */}
              <div className="relative flex-1 h-[360px] sm:h-[480px] lg:h-[540px] lg:max-w-[420px] mx-auto rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl flex items-center justify-center">
                <video
                  src={fullscreenVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  loop
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Video Story Details & Actions */}
              <div className="flex-1 flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 font-mono text-[10px] text-primary font-bold uppercase">
                    <Sparkles className="w-3 h-3" />
                    <span>{fullscreenVideo.category}</span>
                  </div>

                  <h2 className="font-anton text-2xl sm:text-3xl text-white tracking-wide uppercase">
                    {fullscreenVideo.title}
                  </h2>

                  <p className="font-inter text-sm text-on-surface-variant leading-relaxed">
                    {fullscreenVideo.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {fullscreenVideo.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg bg-surface-dim border border-white/10 font-mono text-[10px] text-on-surface-muted"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <a
                    href={fullscreenVideo.driveUrl || mainDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-mono text-xs font-bold uppercase tracking-wider shadow-red-glow flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <HardDrive className="w-4 h-4" />
                    <span>OPEN 4K RAW DRIVE ASSETS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setFullscreenVideo(null)}
                    className="w-full py-3 rounded-xl bg-surface-dim hover:bg-surface border border-white/10 text-white font-mono text-xs uppercase tracking-wider cursor-pointer"
                  >
                    BACK TO GALLERY
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
