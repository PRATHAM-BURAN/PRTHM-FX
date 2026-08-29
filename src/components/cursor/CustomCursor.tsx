import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'video' | 'link' | 'explore'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isInNativeSection, setIsInNativeSection] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // If hovering inside Explore My Work (#categories) or Edits Gallery (#gallery), disable red ball cursor
      const nativeSection = target.closest('#categories, #gallery, [data-native-cursor]');
      if (nativeSection) {
        setIsInNativeSection(true);
        return;
      } else {
        setIsInNativeSection(false);
      }

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') || 'hover';
        const label = cursorTarget.getAttribute('data-cursor-label') || '';
        
        setCursorVariant(type as any);
        setCursorText(label);
        return;
      }

      // Check if hovering interactive elements
      const isButton = target.closest('button');
      const isLink = target.closest('a');
      const isVideoCard = target.closest('.video-card');

      if (isVideoCard) {
        setCursorVariant('video');
        setCursorText('WATCH');
      } else if (isLink) {
        setCursorVariant('link');
        setCursorText('OPEN');
      } else if (isButton) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible || isInNativeSection) return null;

  const getVariantStyles = () => {
    switch (cursorVariant) {
      case 'video':
        return {
          width: 80,
          height: 80,
          backgroundColor: 'rgba(230, 0, 0, 0.9)',
          borderColor: '#ffffff',
          scale: 1,
        };
      case 'link':
      case 'explore':
        return {
          width: 64,
          height: 64,
          backgroundColor: 'rgba(18, 18, 18, 0.9)',
          borderColor: '#E60000',
          scale: 1,
        };
      case 'hover':
        return {
          width: 44,
          height: 44,
          backgroundColor: 'rgba(230, 0, 0, 0.25)',
          borderColor: '#E60000',
          scale: 1.2,
        };
      default:
        return {
          width: 14,
          height: 14,
          backgroundColor: '#E60000',
          borderColor: 'transparent',
          scale: 1,
        };
    }
  };

  const currentStyles = getVariantStyles();

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center font-mono text-[10px] font-bold tracking-widest text-white uppercase text-center border backdrop-blur-xs select-none shadow-red-glow"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: currentStyles.width,
        height: currentStyles.height,
        backgroundColor: currentStyles.backgroundColor,
        borderColor: currentStyles.borderColor,
        scale: currentStyles.scale,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {cursorText && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="text-white drop-shadow leading-none"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
};
