'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'polygon' | 'shard' | 'diamond' | 'speck';
  speedY: number;
  speedX: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
  angle: number;
  rotSpeed: number;
  tilt: number;
  tiltSpeed: number;
  opacity: number;
  points?: { x: number; y: number }[]; // for polygon
}

const COLOR_PALETTE = {
  gold: ['#D4AF37', '#E5C158', '#C9A66B', '#F3D272', '#B8860B'],
  blue: ['#2B5B84', '#3A7BD5', '#4A90E2', '#1E4E79', '#5C94C7'],
  green: ['#2E7D5B', '#236B46', '#3FA375', '#1B5E3C', '#45B07B'],
  red: ['#C23B38', '#B84A39', '#D9534F', '#A83232', '#E05A56'],
};

interface ArtisanFlakesBackgroundProps {
  className?: string;
  density?: 'normal' | 'rich';
}

export function ArtisanFlakesBackground({ className = '', density = 'normal' }: ArtisanFlakesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const count = density === 'rich' ? 85 : 68;

    const createPolygonPoints = (radius: number) => {
      const numPoints = 5 + Math.floor(Math.random() * 3);
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i < numPoints; i++) {
        const a = (i / numPoints) * Math.PI * 2;
        const r = radius * (0.6 + Math.random() * 0.7);
        points.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
      }
      return points;
    };

    const spawnParticle = (startY?: number): Particle => {
      // Pick color category evenly
      const categories: (keyof typeof COLOR_PALETTE)[] = ['gold', 'blue', 'green', 'red'];
      const chosenCat = categories[Math.floor(Math.random() * categories.length)];
      const colors = COLOR_PALETTE[chosenCat];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const shapes: Particle['shape'][] = ['polygon', 'shard', 'diamond', 'speck'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = shape === 'speck' ? 3 + Math.random() * 3 : 5 + Math.random() * 7;

      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height,
        size,
        color,
        shape,
        speedY: 0.35 + Math.random() * 0.75, // Gentle upward/floating drift
        speedX: (Math.random() - 0.5) * 0.3,
        swayAmplitude: 0.6 + Math.random() * 1.4,
        swaySpeed: 0.015 + Math.random() * 0.025,
        swayOffset: Math.random() * Math.PI * 2,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        tilt: Math.random() * Math.PI * 2,
        tiltSpeed: 0.02 + Math.random() * 0.035, // 3D tumbling in the air
        opacity: 0.45 + Math.random() * 0.45,
        points: shape === 'polygon' ? createPolygonPoints(size) : undefined,
      };
    };

    // Initialize particles uniformly
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push(spawnParticle());
    }

    // Resize Handler
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Mouse Interaction: gentle wind breeze
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        const mouse = mouseRef.current;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Upward floating motion
          p.y -= p.speedY;

          // Harmonic horizontal sway
          p.swayOffset += p.swaySpeed;
          p.x += Math.sin(p.swayOffset) * p.swayAmplitude + p.speedX;

          // 3D rotation & tumbling
          p.angle += p.rotSpeed;
          p.tilt += p.tiltSpeed;

          // Interactive breeze push from mouse
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 140;
            if (dist < maxDist && dist > 1) {
              const force = (1 - dist / maxDist) * 1.5;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force * 0.8;
            }
          }

          // Loop seamlessly when out of bounds
          if (p.y < -25) {
            particles[i] = spawnParticle(height + 15);
            continue;
          }
          if (p.x < -30) p.x = width + 20;
          if (p.x > width + 30) p.x = -20;

          // Draw the flake with 3D projection
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);

          // 3D tumbling scale along horizontal axis
          const tiltScale = Math.cos(p.tilt);
          ctx.scale(Math.abs(tiltScale) < 0.15 ? 0.15 : tiltScale, 1);

          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          // Soft ambient luxury drop shadow
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.size > 7 ? 4 : 2;

          switch (p.shape) {
            case 'shard': {
              const w = p.size * 1.6;
              const h = p.size * 0.45;
              ctx.beginPath();
              ctx.moveTo(-w / 2, 0);
              ctx.lineTo(w / 4, -h / 2);
              ctx.lineTo(w / 2, 0);
              ctx.lineTo(0, h / 2);
              ctx.closePath();
              ctx.fill();
              break;
            }
            case 'diamond': {
              const s = p.size;
              ctx.beginPath();
              ctx.moveTo(0, -s);
              ctx.lineTo(s * 0.65, 0);
              ctx.lineTo(0, s);
              ctx.lineTo(-s * 0.65, 0);
              ctx.closePath();
              ctx.fill();
              break;
            }
            case 'speck': {
              ctx.beginPath();
              ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
              ctx.fill();
              break;
            }
            case 'polygon':
            default: {
              if (p.points && p.points.length > 2) {
                ctx.beginPath();
                ctx.moveTo(p.points[0].x, p.points[0].y);
                for (let k = 1; k < p.points.length; k++) {
                  ctx.lineTo(p.points[k].x, p.points[k].y);
                }
                ctx.closePath();
                ctx.fill();
              } else {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
              }
              break;
            }
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [density]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Subtle handcrafted paper texture grain */}
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#0F2030_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* High-performance floating flakes canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
