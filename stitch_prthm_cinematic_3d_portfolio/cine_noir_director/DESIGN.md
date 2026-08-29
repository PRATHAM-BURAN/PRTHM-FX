---
name: Cine-Noir Director
colors:
  surface: '#210e0c'
  surface-dim: '#210e0c'
  surface-bright: '#4b3330'
  surface-container-lowest: '#1b0907'
  surface-container-low: '#2a1613'
  surface-container: '#2f1a17'
  surface-container-high: '#3a2421'
  surface-container-highest: '#462f2b'
  on-surface: '#ffdad4'
  on-surface-variant: '#e9bcb5'
  inverse-surface: '#ffdad4'
  inverse-on-surface: '#412b27'
  outline: '#b08781'
  outline-variant: '#5f3f3a'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690000'
  primary-container: '#e60000'
  on-primary-container: '#fff7f5'
  inverse-primary: '#c00000'
  secondary: '#ffb4a8'
  on-secondary: '#690000'
  secondary-container: '#980000'
  on-secondary-container: '#ff9f90'
  tertiary: '#b2c5ff'
  on-tertiary: '#002c72'
  tertiary-container: '#0068f9'
  on-tertiary-container: '#f8f7ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930100'
  secondary-fixed: '#ffdad4'
  secondary-fixed-dim: '#ffb4a8'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#930000'
  tertiary-fixed: '#dae2ff'
  tertiary-fixed-dim: '#b2c5ff'
  on-tertiary-fixed: '#001847'
  on-tertiary-fixed-variant: '#0040a0'
  background: '#210e0c'
  on-background: '#ffdad4'
  surface-variant: '#462f2b'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 110px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 52px
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 24px
  container-max: 1440px
---

## Brand & Style

The design system is engineered for high-end professional video directors and editors, evoking the atmosphere of a prestige film premiere or a high-tech editing suite. The personality is unapologetically bold, sophisticated, and authoritative. It draws from **Experimental Futurism** and **Cinematic Minimalism**, emphasizing motion, depth, and focused lighting over traditional UI patterns.

The visual language communicates "Award-Winning" through high-contrast aesthetics, dramatic rim lights, and a tactile digital finish. Every interaction should feel like a frame transition—intentional, smooth, and high-stakes.

**Key Style Pillars:**
- **Cinematic Lighting:** Use of "Glows" and "Rim Lights" (1px inner borders) to define edges against deep black backgrounds.
- **Experimental Texture:** A subtle grain or noise overlay across all surfaces to provide a filmic, non-digital feel.
- **Asymmetric Composition:** Moving away from standard SaaS grids to editorial-style layouts that prioritize large-scale media.
- **Glassmorphism:** Used sparingly for overlays, maintaining high blur (40px+) and low opacity to mimic expensive optical glass.

## Colors

This design system utilizes a "Void & Heat" palette. The primary canvas is a true deep black to maximize the dynamic range of video content and red accents.

- **The Deep Black (#050505):** Used for global backgrounds to ensure hardware-level contrast on OLED screens.
- **Dark Charcoal (#121212):** Used for elevated surfaces, cards, and containers.
- **Vibrant Red (#E60000):** Reserved for high-priority CTAs, focus states, and critical branding elements.
- **Maroon Gradient:** A linear gradient from `#990000` to `#050505` (at 45 degrees) should be used for background atmospheric glows or "Hero" section transitions.
- **Rim Light (White/Red at 10-15%):** Subtle 1px strokes on the top and left edges of cards to simulate a light source hitting a physical object.

## Typography

The typography strategy is built on the contrast between **Impact** and **Precision**.

1.  **Headlines (Anton):** Used for all major section titles and big statements. It must always be high-impact. Use uppercase for `headline-md` to mimic film credits.
2.  **Body (Inter):** A neutral, modern sans-serif that ensures readability against dark backgrounds. Tracking should be slightly increased for body text on dark themes to prevent "haloing."
3.  **Metadata (JetBrains Mono):** Used for technical specs, timestamps, and project categories. The monospaced nature reinforces the "editor's suite" and "futuristic" aesthetic.

## Layout & Spacing

The layout follows a **Cinematic Frame** philosophy. It uses wide margins and generous vertical breathing room to make every piece of content feel like a featured "shot."

- **Grid:** A 12-column grid for desktop with 24px gutters. However, content should frequently "break" the grid—for example, a video reel might span 10 columns and be offset to the right, leaving the left for vertical typography.
- **Vertical Rhythm:** Large sections should be separated by at least 160px to 240px of whitespace (The Void) to maintain the premium feel.
- **Mobile:** Transition to a 4-column grid. Margins shrink to 24px, and typography scales aggressively (refer to `headline-lg-mobile`). Full-bleed imagery is preferred on mobile to maintain immersion.

## Elevation & Depth

Depth is not created with soft, multi-directional shadows, but through **Directional Lighting and Translucency.**

1.  **The Base:** Background is `#050505`.
2.  **Tier 1 (Surfaces):** Cards and sections use `#121212`. Instead of a shadow, use a `1px` solid border of `#FFFFFF` at `0.1` opacity.
3.  **Tier 2 (Interactive):** When hovering, an element gains a "Red Glow"—a drop shadow with `0px` offset, `20px` blur, and the primary red color at `0.3` opacity.
4.  **Glass Layers:** Navigation bars and modal overlays use `backdrop-filter: blur(40px)` with a background of `rgba(5, 5, 5, 0.7)`.
5.  **Atmospheric Depth:** Use large, low-opacity radial gradients (Maroon to Transparent) behind content to create a sense of three-dimensional space.

## Shapes

The shape language is **Precision-Cut**. We strictly avoid the "bubbly" look of modern SaaS.

- **Corners:** Use a consistent 4px radius for all cards, buttons, and input fields. This is just enough to take the "bite" off the edge without losing the aggressive, professional feel.
- **Masks:** Portfolio thumbnails should use sharp 0px corners or the standard 4px.
- **Dividers:** Use thin (1px) lines with a gradient stroke (Transparent -> White 20% -> Transparent) to separate content sections subtly.

## Components

- **Primary Buttons:** Solid `#E60000` background, white text (Anton, uppercase), 4px radius. On hover, they should "pulse" with a red outer glow.
- **Secondary/Outline Buttons:** 1px border of `#E60000` with no background. Text color is white.
- **Project Cards:** Deep charcoal surface, 4px radius. The image/video inside should have a subtle "zoom-in" animation on hover. Title appears in `label-mono` style above the image.
- **Inputs:** Darker than the surface (`#0A0A0A`), 4px radius, with a 1px border that turns Red on focus. Use `JetBrains Mono` for placeholder text.
- **Video Playback UI:** Custom controls using thin white lines, high-blur glass backgrounds for the control bar, and red accents for the progress seek-bar.
- **Scrollbar:** Custom ultra-thin (4px) scrollbar in Dark Charcoal with a Red thumb.