import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing Core...");

  const steps = [
    { pct: 10, text: "Allocating Qubits..." },
    { pct: 30, text: "Calibrating HQCI Layer..." },
    { pct: 50, text: "Syncing EchoNodes..." },
    { pct: 70, text: "Verifying Σ-Matrix Integrity..." },
    { pct: 90, text: "Establishing Daedalus Link..." },
    { pct: 100, text: "System Ready." }
  ];

  useEffect(() => {
    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
        return;
      }
      
      const step = steps[currentStep];
      setStatus(step.text);
      setProgress(step.pct);
      currentStep++;
    }, 600); // 600ms per step = ~3.6s total load time

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full bg-[#05081a] flex flex-col items-center justify-center p-8 font-mono">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-between items-end mb-2">
            <span className="text-neur-cyan text-sm animate-pulse">&gt; {status}</span>
            <span className="text-neur-purple font-bold">{progress}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 w-full bg-neur-card rounded-full overflow-hidden border border-white/10">
          <div 
            className="h-full bg-gradient-to-r from-neur-cyan via-neur-purple to-neur-cyan transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Terminal Output Effect */}
        <div className="h-32 w-full bg-black/40 rounded border border-white/5 p-4 text-xs text-neur-subtext overflow-hidden font-mono flex flex-col-reverse">
            {progress >= 90 && <div className="text-green-400">[OK] Neural Interface connected.</div>}
            {progress >= 70 && <div>[INFO] Ethical constraints (PAS) loaded. ε=1.0</div>}
            {progress >= 50 && <div>[INFO] Node swarm handshake complete. 12 active.</div>}
            {progress >= 30 && <div>[INFO] Quantum entanglement fidelity: 0.994</div>}
            {progress >= 10 && <div>[SYS] Memory heap allocation: 150MB reserved.</div>}
        </div>
        
        <div className="flex justify-center pt-8">
            <Loader2 className="animate-spin text-neur-cyan opacity-50" size={32} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
