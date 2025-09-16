import React, { useEffect, useRef, useState } from 'react';
import './LightRays.css';

// Utility: parse hex color to rgb array [0..1]
function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return [1, 1, 1];
  return [
    parseInt(m[1], 16) / 255,
    parseInt(m[2], 16) / 255,
    parseInt(m[3], 16) / 255,
  ];
}

function getAnchorAndDir(origin, w, h) {
  const outside = 0.2;
  switch (origin) {
    case 'top-left':
      return { anchor: [0, -outside * h], dir: [0, 1] };
    case 'top-right':
      return { anchor: [w, -outside * h], dir: [0, 1] };
    case 'left':
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case 'right':
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case 'bottom-left':
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case 'bottom-center':
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case 'bottom-right':
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default: // top-center
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
}

const LightRays = ({
  raysOrigin = 'top-center',
  raysColor = '#ffffff',
  raysSpeed = 1,
  lightSpread = 1, // >1 wider spread, <1 tighter
  rayLength = 2, // in multiples of viewport width
  pulsating = false,
  fadeDistance = 1.0, // not used in 2D variant, kept for API compatibility
  saturation = 1.0,    // not used in 2D variant, kept for API compatibility
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,   // not used in 2D variant, kept for API compatibility
  distortion = 0.0,    // not used in 2D variant, kept for API compatibility
  className = ''
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.3 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.3 });
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  // Intersection observer to pause when not visible
  useEffect(() => {
    if (!containerRef.current) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.1 }
    );
    observerRef.current.observe(containerRef.current);
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  // Size canvas to container
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const { clientWidth: w, clientHeight: h } = container;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
  };

  // Main draw loop (Canvas 2D lightweight approximation of light rays)
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';

    if (containerRef.current) {
      // Clear previous children (if any) and append canvas
      while (containerRef.current.firstChild) containerRef.current.removeChild(containerRef.current.firstChild);
      containerRef.current.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    let start = performance.now();

    const onResize = () => {
      resizeCanvas();
    };
    window.addEventListener('resize', onResize);
    onResize();

    const color = hexToRgb(raysColor);

    const loop = (t) => {
      if (!isVisible) {
        // Skip work but keep rAF alive to resume quickly
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      const time = (t - start) / 1000;
      const w = canvas.width;
      const h = canvas.height;

      // Clear with transparent
      ctx.clearRect(0, 0, w, h);

      const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);

      // Follow mouse blending
      if (followMouse && mouseInfluence > 0) {
        const smoothing = 0.9;
        smoothMouseRef.current.x = smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);
        smoothMouseRef.current.y = smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);
        const target = [smoothMouseRef.current.x * w, smoothMouseRef.current.y * h];
        const vx = target[0] - anchor[0];
        const vy = target[1] - anchor[1];
        const len = Math.hypot(vx, vy) || 1;
        const ndx = vx / len;
        const ndy = vy / len;
        dir[0] = (1 - mouseInfluence) * dir[0] + mouseInfluence * ndx;
        dir[1] = (1 - mouseInfluence) * dir[1] + mouseInfluence * ndy;
        const dlen = Math.hypot(dir[0], dir[1]) || 1;
        dir[0] /= dlen;
        dir[1] /= dlen;
      }

      // Rays parameters
      const rays = Math.max(24, Math.floor(60 * lightSpread));
      const maxLen = Math.max(w, h) * Math.max(0.1, rayLength);
      const spreadAngle = Math.PI * 0.6 * Math.max(0.1, lightSpread);

      // Pulsation amount
      const pulsate = pulsating ? 0.8 + 0.2 * Math.sin(time * raysSpeed * 3.0) : 1.0;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < rays; i++) {
        const tNorm = i / (rays - 1);
        // angle across spread, animated subtle wobble
        const wobble = 0.15 * Math.sin((tNorm * 10.0 + time * raysSpeed) * 2.0 * Math.PI);
        const angle = (tNorm - 0.5) * spreadAngle + wobble * distortion;

        // Rotate base dir by angle
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const dx = dir[0] * cosA - dir[1] * sinA;
        const dy = dir[0] * sinA + dir[1] * cosA;

        const len = maxLen * (0.6 + 0.4 * tNorm);
        const ex = anchor[0] + dx * len;
        const ey = anchor[1] + dy * len;

        // Alpha falls off with length and index, plus distance fade factor
        const distToEnd = Math.hypot(ex - anchor[0], ey - anchor[1]);
        const baseFalloff = Math.max(0, (maxLen - distToEnd) / maxLen);
        const fadeFalloff = Math.max(0.5, Math.min(1, (w * fadeDistance - distToEnd) / (w * fadeDistance)));
        const alpha = 0.06 * pulsate * baseFalloff * fadeFalloff * (1.0 - Math.abs(tNorm - 0.5) * 1.6);

        ctx.beginPath();
        const lw = Math.max(1, (2 + 2 * tNorm) * (w / 1920));
        ctx.lineWidth = lw;
        ctx.strokeStyle = `rgba(${Math.round(color[0] * 255)}, ${Math.round(color[1] * 255)}, ${Math.round(color[2] * 255)}, ${alpha})`;
        ctx.moveTo(anchor[0], anchor[1]);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }

      ctx.restore();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener('resize', onResize);
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [isVisible, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion]);

  // Update color if prop changes (loop uses parsed value at init, but color often remains constant; re-mounting useEffect handles it)

  // Mouse handling
  useEffect(() => {
    if (!followMouse) return;
    const onMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / Math.max(1, rect.width);
      const y = (e.clientY - rect.top) / Math.max(1, rect.height);
      mouseRef.current = { x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y)) };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`light-rays-container ${className}`}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
};

export default LightRays;
