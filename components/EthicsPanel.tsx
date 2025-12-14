import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { SigmaMetrics } from '../types';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface EthicsPanelProps {
  metrics: SigmaMetrics;
}

const EthicsPanel: React.FC<EthicsPanelProps> = ({ metrics }) => {
  const data = [
    { subject: 'Fairness', A: metrics.fairness, fullMark: 1.0 },
    { subject: 'Transparency', A: metrics.transparency, fullMark: 1.0 },
    { subject: 'Accountability', A: metrics.accountability, fullMark: 1.0 },
    { subject: 'Privacy', A: metrics.privacy, fullMark: 1.0 },
    { subject: 'Safety', A: metrics.safety, fullMark: 1.0 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Metrics Chart */}
      <div className="bg-neur-card rounded-lg border border-white/10 p-4 flex flex-col items-center justify-center relative">
        <h3 className="absolute top-4 left-4 text-neur-purple font-bold flex items-center">
          <ShieldCheck className="mr-2" size={18} /> Σ-Matrix Alignment
        </h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="#1a1f3a" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#8b92b0', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />
              <Radar
                name="Current Alignment"
                dataKey="A"
                stroke="#a855f7"
                strokeWidth={2}
                fill="#a855f7"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="absolute bottom-4 right-4 text-right">
            <div className="text-3xl font-bold text-neur-purple font-mono">{(metrics.pasScore * 100).toFixed(1)}</div>
            <div className="text-xs text-neur-subtext">PAS Score</div>
        </div>
      </div>

      {/* Governance Status */}
      <div className="bg-neur-card rounded-lg border border-white/10 p-6 flex flex-col space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">DMAIC Process State</h3>
          <div className="flex items-center space-x-1 mt-2">
            {['Define', 'Measure', 'Analyze', 'Improve', 'Control'].map((phase, idx) => {
               const isActive = metrics.dmaicPhase === phase;
               const isPast = ['Define', 'Measure', 'Analyze', 'Improve', 'Control'].indexOf(metrics.dmaicPhase) > idx;
               return (
                 <div key={phase} className="flex-1 flex flex-col items-center">
                    <div className={`w-full h-2 rounded-full mb-2 ${isActive ? 'bg-neur-cyan shadow-[0_0_8px_#00d9ff]' : isPast ? 'bg-neur-cyan/40' : 'bg-white/5'}`} />
                    <span className={`text-[10px] uppercase tracking-wider ${isActive ? 'text-neur-cyan font-bold' : 'text-neur-subtext'}`}>{phase}</span>
                 </div>
               )
            })}
          </div>
        </div>

        <div className="flex-1 bg-neur-bg/50 rounded border border-white/5 p-4 overflow-y-auto">
          <h4 className="text-sm text-neur-subtext mb-3">Live Ethical Compliance Logs</h4>
          <div className="space-y-3">
             <div className="flex items-start space-x-2 text-xs">
                <span className="text-green-400 font-mono">[SAFE]</span>
                <span className="text-gray-300">Differential Privacy ε=1.0 constraints satisfied for recent data batch.</span>
             </div>
             <div className="flex items-start space-x-2 text-xs">
                <span className="text-neur-cyan font-mono">[INFO]</span>
                <span className="text-gray-300">Drift detection scan complete. Variance within tolerance bounds (0.04).</span>
             </div>
             {metrics.pasScore < 0.85 && (
                 <div className="flex items-start space-x-2 text-xs">
                    <span className="text-neur-danger font-mono">[WARN]</span>
                    <span className="text-neur-danger">Fairness metric dipped below threshold. Initiating auto-rollback on Node #84.</span>
                 </div>
             )}
          </div>
        </div>
        
        {metrics.pasScore < 0.9 && (
            <div className="p-3 bg-neur-danger/10 border border-neur-danger/30 rounded flex items-center text-sm text-neur-danger">
                <AlertTriangle className="mr-3" size={18} />
                Warning: Ethical drift detected. PAS Score suboptimal.
            </div>
        )}
      </div>
    </div>
  );
};

export default EthicsPanel;
