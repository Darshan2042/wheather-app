/**
 * AnimatedBackground Component
 * Creates animated waves and geometric patterns for the background
 */

import React, { useEffect, useRef } from 'react';
import '../styles/AnimatedBackground.css';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw animated waves
    const drawWaves = () => {
      const waveCount = 4;
      const colors = [
        { r: 20, g: 184, b: 166, opacity: 0.15 },   // teal
        { r: 14, g: 165, b: 233, opacity: 0.12 },   // blue
        { r: 139, g: 92, b: 246, opacity: 0.1 },    // purple
        { r: 236, g: 72, b: 153, opacity: 0.08 }    // pink
      ];

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        const amplitude = 80 + i * 20;
        const frequency = 0.003 - i * 0.0003;
        const phase = time * (0.5 + i * 0.2);
        const yOffset = canvas.height * (0.3 + i * 0.15);

        for (let x = 0; x <= canvas.width; x += 5) {
          const y = Math.sin(x * frequency + phase) * amplitude + yOffset;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const color = colors[i];
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.opacity})`;
        ctx.fill();
      }
    };

    // Draw floating circles
    const drawCircles = () => {
      const circleCount = 25;
      
      for (let i = 0; i < circleCount; i++) {
        const angle = (time * 0.3) + (i * Math.PI * 2 / circleCount);
        const radius = 50 + Math.sin(time * 0.5 + i) * 30;
        const x = canvas.width / 2 + Math.cos(angle) * (canvas.width * 0.3);
        const y = canvas.height / 2 + Math.sin(angle) * (canvas.height * 0.3);
        
        const colors = [
          'rgba(20, 184, 166,',
          'rgba(14, 165, 233,',
          'rgba(139, 92, 246,'
        ];
        const color = colors[i % colors.length];
        const opacity = 0.05 + Math.sin(time + i) * 0.03;

        ctx.beginPath();
        ctx.arc(x, y, radius / 8, 0, Math.PI * 2);
        ctx.fillStyle = `${color} ${opacity})`;
        ctx.fill();
      }
    };

    // Draw geometric grid lines
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.08)';
      ctx.lineWidth = 1;

      // Vertical lines
      const spacing = 80;
      const offset = (time * 20) % spacing;
      
      for (let x = -offset; x < canvas.width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = -offset; y < canvas.height + spacing; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();
      drawWaves();
      drawCircles();
      
      time += 0.01;
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="animated-background">
      <canvas ref={canvasRef} className="waves-canvas" />
      
      {/* Floating geometric shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Gradient overlay */}
      <div className="gradient-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;
