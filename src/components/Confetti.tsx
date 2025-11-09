'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

export const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Google brand colors for confetti
    const colors = ['#4285f4', '#ea4335', '#fbbc04', '#34a853', '#5f6368'];

    // Create particles
    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5, // Start in upper half
          vx: (Math.random() - 0.5) * 8,
          vy: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 2,
          life: 1.0,
        });
      }

      return particles;
    };

    particlesRef.current = createParticles();

    // Animation loop
    const gravity = 0.2;
    const friction = 0.99;
    const decay = 0.01;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allDead = true;

      particlesRef.current.forEach((particle) => {
        if (particle.life <= 0) return;

        allDead = false;

        // Update physics
        particle.vy += gravity;
        particle.vx *= friction;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= decay;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.x + particle.y) * 0.01);

        // Draw rectangle confetti
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.6);
        ctx.restore();
      });

      if (!allDead) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    // Cleanup after 3 seconds
    const cleanupTimer = setTimeout(() => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
    }, 3000);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(cleanupTimer);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
};