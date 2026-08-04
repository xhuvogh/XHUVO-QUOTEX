import React, { useEffect, useRef } from 'react';

export const SmokeBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    interface SmokeParticle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }

    const colors = [
      'rgba(6, 182, 212, ',   // cyan
      'rgba(168, 85, 247, ',  // purple
      'rgba(16, 185, 129, ',  // emerald
      'rgba(59, 130, 246, '   // blue
    ];

    const particles: SmokeParticle[] = [];
    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 100 + 70,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.15 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Deep cyber background fill
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 100,
        width / 2, height / 2, Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0a0f24');
      bgGrad.addColorStop(0.6, '#030712');
      bgGrad.addColorStop(1, '#02040a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render smoke particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;

        const currentRadius = p.radius + Math.sin(time + p.x) * 10;
        const radGrad = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, Math.max(1, currentRadius)
        );
        radGrad.addColorStop(0, `${p.color}${p.alpha})`);
        radGrad.addColorStop(0.5, `${p.color}${p.alpha * 0.3})`);
        radGrad.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fill();
      });

      // Mouse neon glow aura
      const mouseGrad = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, 250
      );
      mouseGrad.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
      mouseGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.06)');
      mouseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = mouseGrad;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 250, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
