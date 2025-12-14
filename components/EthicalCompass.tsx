import React from 'react';
import { SigmaMetrics } from '../types';
import { ShieldCheck, Crosshair } from 'lucide-react';

interface EthicalCompassProps {
  metrics: SigmaMetrics;
}

const EthicalCompass: React.FC<EthicalCompassProps> = ({ metrics }) => {
  // Map metrics to 5 points
  const points = [
    { label: 'Fairness', value: metrics.fairness, color: '#00d9ff' }, // Cyan
    { label: 'Transparency', value: metrics.transparency, color: '#a855f7' }, // Purple
    { label: 'Accountability', value: metrics.accountability, color: '#ef4444' }, // Red/Danger if low, but we use it as accent
    { label: 'Privacy', value: metrics.privacy, color: '#22c55e' }, // Green
    { label: 'Safety', value: metrics.safety, color: '#f59e0b' }, // Amber
  ];

  // Helper to calculate SVG paths for arcs
  const radius = 45;
  const center = 50;
  
  // DMAIC Phase positions (degrees)
  const phaseMap: Record<string, number> = {
    'Define': 0,
    'Measure': 72,
    'Analyze': 144,
    'Improve': 216,
    'Control': 288
  };

  const currentRotation = phaseMap[metrics.dmaicPhase] || 0;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
      <div className="absolute top-0 left-0 text-xs font-bold text-neur-subtext flex items-center">
        <ShieldCheck size={14} className="mr-1 text-neur-cyan" /> ETHICAL COMPASS
      </div>
      
      <div className="relative w-48 h-48 mt-4">
        {/* Background Circle */}
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="48" stroke="#1a1f3a" strokeWidth="1" fill="transparent" />
          <circle cx="50" cy="50" r="30" stroke="#1a1f3a" strokeWidth="1" fill="#0a0e27" opacity="0.5" />
          
          {/* Metric Arcs */}
          {points.map((p, i) => {
            const startAngle = (i * 72);
            const endAngle = startAngle + (72 * p.value); // Length depends on score
            // Convert polar to cartesian
            const x1 = 50 + radius * Math.cos(Math.PI * startAngle / 180);
            const y1 = 50 + radius * Math.sin(Math.PI * startAngle / 180);
            const x2 = 50 + radius * Math.cos(Math.PI * endAngle / 180);
            const y2 = 50 + radius * Math.sin(Math.PI * endAngle / 180);
            
            // Flag for large arc
            const largeArc = (72 * p.value) > 180 ? 1 : 0;
            
            // For simple segments, we can just use stroke-dasharray, but let's do simple lines for "spokes" style
            // Actually, let's just draw lines radiating out
            return (
               <g key={i}>
                 {/* Background track for this segment */}
                 <path 
                    d={`M 50 50 L ${50 + 48 * Math.cos(Math.PI * (i*72 + 36)/180)} ${50 + 48 * Math.sin(Math.PI * (i*72 + 36)/180)}`}
                    stroke="#ffffff"
                    strokeOpacity="0.05"
                    strokeWidth="20" // Wide stroke to make a sector
                    fill="none"
                 />
                 {/* Active Value */}
                 <path 
                    d={`M 50 50 L ${50 + (48 * p.value) * Math.cos(Math.PI * (i*72 + 36)/180)} ${50 + (48 * p.value) * Math.sin(Math.PI * (i*72 + 36)/180)}`}
                    stroke={p.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                 />
               </g>
            );
          })}
          
          {/* DMAIC Ring Indicator */}
          <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" fill="none" strokeDasharray="4 2"/>
        </svg>

        {/* DMAIC Marker (Rotating) */}
        <div 
            className="absolute top-0 left-0 w-full h-full pointer-events-none transition-transform duration-1000 ease-in-out"
            style={{ transform: `rotate(${currentRotation}deg)` }}
        >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
        </div>

        {/* Central Score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-neur-subtext uppercase tracking-widest mb-1">PAS</span>
            <span className="text-3xl font-mono font-bold text-white drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">
                {(metrics.pasScore * 100).toFixed(0)}
            </span>
            <span className="text-[9px] text-neur-cyan mt-1 border border-neur-cyan/30 px-1 rounded">
                {metrics.dmaicPhase}
            </span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full mt-2">
         {points.map((p) => (
             <div key={p.label} className="flex items-center justify-between text-[10px]">
                 <div className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full mr-1" style={{ backgroundColor: p.color }}></div>
                    <span className="text-neur-subtext">{p.label}</span>
                 </div>
                 <span className="font-mono text-white">{(p.value * 100).toFixed(0)}%</span>
             </div>
         ))}
      </div>
    </div>
  );
};

export default EthicalCompass;
