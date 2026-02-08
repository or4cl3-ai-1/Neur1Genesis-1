
import React, { useEffect, useRef } from 'react';
import { DreamFragment } from '../types';

interface DreamVisualizerProps {
  dreams: DreamFragment[];
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;

  constructor(canvasWidth: number, canvasHeight: number, type: string) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = (Math.random() - 0.5) * 1.5;
    this.maxLife = Math.random() * 200 + 100;
    this.life = this.maxLife;

    switch (type) {
      case 'Visual':
        this.color = `hsla(${200 + Math.random() * 40}, 100%, 60%, `;
        break;
      case 'Code':
        this.color = `hsla(${280 + Math.random() * 40}, 100%, 60%, `;
        break;
      default:
        this.color = `hsla(${180 + Math.random() * 20}, 100%, 80%, `;
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const opacity = this.life / this.maxLife;
    ctx.fillStyle = this.color + opacity + ')';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const DreamVisualizer: React.FC<DreamVisualizerProps> = ({ dreams }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add new particles based on dreams
      if (dreams.length > 0 && Math.random() > 0.8) {
        const dream = dreams[Math.floor(Math.random() * dreams.length)];
        for (let i = 0; i < 5; i++) {
          particlesRef.current.push(new Particle(canvas.width, canvas.height, dream.type));
        }
      }

      // Limit particle count
      if (particlesRef.current.length > 200) {
        particlesRef.current.shift();
      }

      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      particlesRef.current.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [dreams]);

  return (
    <div className="w-full h-full min-h-[200px] relative rounded-lg overflow-hidden border border-white/5 bg-neur-bg">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-4 right-4 pointer-events-none">
        <div className="flex items-center space-x-3 text-[10px] text-neur-subtext bg-neur-bg/80 px-2 py-1 rounded-full border border-white/5">
            <span className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-neur-cyan mr-1"></div> Visual</span>
            <span className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-neur-purple mr-1"></div> Code</span>
        </div>
      </div>
    </div>
  );
};

export default DreamVisualizer;
