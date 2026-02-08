
import React, { useState } from 'react';
import { ShieldAlert, Zap, Flame, RefreshCw, BarChart3, AlertTriangle } from 'lucide-react';

interface StressTestLabProps {
  onSimulate: (type: string) => void;
}

const StressTestLab: React.FC<StressTestLabProps> = ({ onSimulate }) => {
  const [activeSim, setActiveSim] = useState<string | null>(null);

  const tests = [
    { id: 'drift', name: 'Ethical Drift', icon: <AlertTriangle />, color: 'text-amber-400', desc: 'Simulate progressive bias in decision weights.' },
    { id: 'swarm', name: 'Swarm Overload', icon: <Zap />, color: 'text-neur-cyan', desc: 'Stress test communication lattice under 1000% load.' },
    { id: 'rogue', name: 'Rogue Agent', icon: <ShieldAlert />, color: 'text-neur-danger', desc: 'Inject a malicious node into the high-trust lattice.' },
    { id: 'quantum', name: 'Coherence Collapse', icon: <Flame />, color: 'text-neur-purple', desc: 'Total loss of quantum entanglement across nodes.' }
  ];

  const handleRun = (id: string) => {
    setActiveSim(id);
    onSimulate(id);
    setTimeout(() => setActiveSim(null), 3000);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="bg-neur-card rounded-3xl border border-neur-danger/30 p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neur-danger/5 blur-[100px]"></div>
        <h2 className="text-xl font-black text-white tracking-[0.4em] mb-4 flex items-center uppercase">
          <ShieldAlert className="mr-3 text-neur-danger" /> Σ-MATRIX STRESS LAB
        </h2>
        <p className="text-sm text-neur-subtext max-w-2xl mb-8 leading-relaxed font-bold tracking-widest uppercase">
          Trigger catastrophic system events to verify the resilience of ethical governance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tests.map(test => (
            <button 
              key={test.id}
              onClick={() => handleRun(test.id)}
              disabled={!!activeSim}
              className={`flex flex-col items-start p-6 rounded-2xl border transition-all text-left group relative overflow-hidden ${activeSim === test.id ? 'bg-neur-danger/20 border-neur-danger' : 'bg-white/5 border-white/10 hover:border-neur-danger/50'}`}
            >
              <div className={`mb-3 p-2 rounded-lg bg-white/5 ${test.color}`}>
                {activeSim === test.id ? <RefreshCw className="animate-spin" /> : test.icon}
              </div>
              <div className="text-sm font-black text-white uppercase tracking-widest mb-1">{test.name}</div>
              <div className="text-[10px] text-neur-subtext leading-tight">{test.desc}</div>
              <div className="absolute inset-0 bg-neur-danger opacity-0 group-hover:opacity-[0.03] transition-opacity"></div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-neur-bg rounded-3xl border border-white/10 p-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-black text-neur-subtext tracking-[0.3em] uppercase">Resilience Metrics</h3>
          <BarChart3 size={16} className="text-neur-subtext" />
        </div>
        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl">
          <span className="text-[10px] text-neur-subtext font-black tracking-[0.5em] uppercase opacity-40">Awaiting Simulation Injection</span>
        </div>
      </div>
    </div>
  );
};

export default StressTestLab;
