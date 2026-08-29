import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Eye, ExternalLink, Instagram, Youtube, HardDrive } from 'lucide-react';
import { Project } from '../../types';

interface VideoCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

export const VideoCard: React.FC<VideoCardProps> = ({ project, onSelect, index }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Card Tilt Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const isVertical = project.aspect === '9:16';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      data-cursor="video"
      data-cursor-label="VIEW"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`video-card group relative cursor-pointer select-none rounded-2xl p-2 sm:p-2.5 bg-surface/90 rim-light rim-light-hover transition-all duration-500 ${
        isHovered ? 'z-30 scale-[1.03]' : 'z-10'
      }`}
    >
      {/* 3D Inner Container */}
      <div
        style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)' }}
        className="relative w-full h-full rounded-xl overflow-hidden bg-black transition-transform duration-300 flex flex-col"
      >
        {/* Media Window */}
        <div className={`relative w-full overflow-hidden ${isVertical ? 'aspect-[9/16]' : 'aspect-[16/9]'}`}>
          {/* Static Poster Thumbnail */}
          <img
            src={project.thumbnail}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110 blur-none brightness-105' : 'scale-100 brightness-90'
            }`}
            loading="lazy"
          />

          {/* Gradient Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />

          {/* Category & Channel Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="px-2.5 py-1 rounded-md bg-surface-dim/80 backdrop-blur-md border border-white/10 font-mono text-[10px] font-semibold text-white uppercase tracking-wider">
              {project.category}
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm font-mono text-[10px] text-white">
              {project.platform === 'youtube' && <Youtube className="w-3 h-3 text-red-500" />}
              {project.platform === 'instagram' && <Instagram className="w-3 h-3 text-primary" />}
              {project.platform === 'direct' && <HardDrive className="w-3 h-3 text-primary" />}
              <span>{project.year}</span>
            </div>
          </div>

          {/* Center Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`w-14 h-14 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-red-glow-lg transition-all duration-300 ${
                isHovered ? 'scale-110 bg-primary opacity-100' : 'scale-90 opacity-70 group-hover:opacity-100'
              }`}
            >
              <Play className="w-6 h-6 fill-white ml-1" />
            </div>
          </div>

          {/* Reach / Source Pill on Poster */}
          {project.metrics && (
            <div className="absolute bottom-3 right-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md font-mono text-[10px] text-white/90">
              <Eye className="w-3 h-3 text-primary" />
              <span>{project.metrics.views}</span>
            </div>
          )}

          {/* Aspect / Duration Badge */}
          {project.duration && (
            <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md font-mono text-[10px] text-on-surface-variant">
              {project.duration}
            </div>
          )}
        </div>

        {/* Card Info Footer */}
        <div className="p-4 flex flex-col justify-between flex-grow gap-2 bg-surface">
          <div>
            <h3 className="font-anton text-lg tracking-wide text-white group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="font-inter text-xs text-on-surface-muted line-clamp-2 mt-1">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="font-mono text-[9px] text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
