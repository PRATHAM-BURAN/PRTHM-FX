import React, { useEffect, useRef } from 'react';

interface ThreeBackgroundProps {
  intensity?: number;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ intensity = 1.0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    const gl = (canvas.getContext('webgl', { powerPreference: 'high-performance', antialias: false }) ||
               canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_intensity;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        vec2 centered_uv = (uv - 0.5) * aspect;
        vec2 norm_mouse = (u_mouse / u_resolution - 0.5) * aspect;

        // Base Deep Void Black
        vec3 color = vec3(0.018, 0.008, 0.008);

        // Core Ambient Red Glow / Nebula
        float distCenter = length(centered_uv - norm_mouse * 0.25);
        float nebula = smoothstep(1.3, 0.15, distCenter);
        color += vec3(0.12, 0.005, 0.005) * nebula * u_intensity;

        // Interactive Red Light Streaks & Floating Orbs
        for(int i = 0; i < 9; i++) {
          float fi = float(i);
          float t = u_time * (0.12 + fi * 0.04);
          vec2 p = vec2(
            sin(t + fi * 1.57) * 0.9 * aspect.x * 0.5,
            cos(t * 0.85 + fi * 2.1) * 0.55
          );
          
          // Influence from mouse
          p += norm_mouse * (0.1 + fi * 0.02);

          float d = length(centered_uv - p);
          float streak = 0.0035 / (d + 0.005);
          vec3 streakColor = mix(vec3(0.9, 0.05, 0.08), vec3(0.6, 0.0, 0.2), sin(t + fi) * 0.5 + 0.5);
          color += streakColor * streak * (0.4 + 0.6 * sin(u_time * 1.2 + fi)) * u_intensity;
        }

        // Atmospheric Sub-Glow Wave
        float wave = sin(centered_uv.y * 3.0 + u_time * 0.5) * 0.5 + 0.5;
        color += vec3(0.04, 0.0, 0.01) * wave * (1.0 - length(centered_uv));

        // Filmic Micro-Noise & Texture
        float grain = (hash(uv * (u_time * 0.1 + 10.0)) - 0.5) * 0.035;
        color += vec3(grain);

        // Cinematic Vignette
        float vignette = smoothstep(1.4, 0.35, length(uv - 0.5));
        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vs);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResLoc = gl.getUniformLocation(program, 'u_resolution');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uIntensityLoc = gl.getUniformLocation(program, 'u_intensity');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = rect.height - (e.clientY - rect.top);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        targetMouseX = touch.clientX - rect.left;
        targetMouseY = rect.height - (touch.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });

    const syncSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor((canvas.clientWidth || window.innerWidth) * dpr);
      const h = Math.floor((canvas.clientHeight || window.innerHeight) * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);
    syncSize();

    let startTime = performance.now();

    const render = (time: number) => {
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      gl.viewport(0, 0, canvas.width, canvas.height);

      const elapsed = (time - startTime) * 0.001;
      if (uTimeLoc) gl.uniform1f(uTimeLoc, elapsed);
      if (uResLoc) gl.uniform2f(uResLoc, canvas.width, canvas.height);
      if (uMouseLoc) gl.uniform2f(uMouseLoc, mouseX, mouseY);
      if (uIntensityLoc) gl.uniform1f(uIntensityLoc, intensity);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (program) gl.deleteProgram(program);
    };
  }, [intensity]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-80 mix-blend-screen transition-opacity duration-1000"
      />
    </div>
  );
};
