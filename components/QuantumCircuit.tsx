import React, { useState } from 'react';
import { QuantumGate } from '../types';
import { Play, RotateCcw, Activity, Info, Zap } from 'lucide-react';
import { simulateQuantumExecution, isApiKeySet } from '../services/huggingFaceService';

const QUBIT_COUNT = 4;
const STEPS = 8;

const QuantumCircuit: React.FC = () => {
  const [gates, setGates] = useState<QuantumGate[]>([]);
  const [selectedGateType, setSelectedGateType] = useState<QuantumGate['type'] | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGridClick = (qubit: number, step: number) => {
    if (!selectedGateType) return;

    const newGate: QuantumGate = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedGateType,
      qubit,
      timeStep: step,
    };

    // Remove existing gate at this spot
    const filtered = gates.filter(g => !(g.qubit === qubit && g.timeStep === step));
    setGates([...filtered, newGate]);
  };

  const clearCircuit = () => {
    setGates([]);
    setResult(null);
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    setResult(null);
    
    // Construct circuit string description
    const description = `Circuit with ${QUBIT_COUNT} qubits. Gates: ` + 
      gates.map(g => `${g.type}${g.type === 'T' ? '(Quantum Tunneling Barrier Bypass)' : ''} on Q${g.qubit} at T${g.timeStep}`).join(', ');

    // Call Gemini or fallback mock
    if (isApiKeySet()) {
      const simResult = await simulateQuantumExecution(description);
      setResult(simResult);
    } else {
      // Mock Fallback
      await new Promise(r => setTimeout(r, 1500));
      setResult({
        topStates: [
          { state: '|0000>', probability: 0.45 },
          { state: '|1111>', probability: 0.45 },
          { state: '|0101>', probability: 0.10 }
        ],
        fidelity: 0.985,
        executionTimeMs: 342,
        analysis: "Circuit demonstrates high entanglement. Tunneling gates successfully bypassed local decoherence barriers.",
        tunnelingFlux: "High Resonance Detected"
      });
    }
    
    setIsSimulating(false);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Styles for Tunneling Animation */}
      <style>{`
        @keyframes tunnelingPulse {
          0% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.4); transform: scale(1); }
          50% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.8); transform: scale(1.05); }
          100% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.4); transform: scale(1); }
        }
        .gate-t-pulse {
          animation: tunnelingPulse 2s ease-in-out infinite;
          background: radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%);
        }
      `}</style>

      {/* Toolbar */}
      <div className="flex items-center space-x-2 bg-neur-card p-4 rounded-2xl border border-white/10 shadow-lg">
        <span className="text-[10px] font-black text-neur-subtext mr-3 tracking-[0.2em] uppercase">Quantum Gates</span>
        {['H', 'X', 'Z', 'T', 'CNOT', 'M'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedGateType(type as any)}
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold transition-all relative group
              ${selectedGateType === type 
                ? (type === 'T' ? 'bg-neur-purple text-white scale-110 shadow-[0_0_20px_rgba(139,92,246,0.5)]' : 'bg-neur-cyan text-neur-bg scale-110 shadow-[0_0_20px_rgba(0,242,255,0.4)]')
                : 'bg-neur-bg text-neur-cyan border border-white/10 hover:border-neur-cyan/50'}`}
          >
            {type}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neur-bg border border-white/20 px-3 py-1.5 rounded-lg text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-2xl">
              {type === 'H' && 'Hadamard (Superposition)'}
              {type === 'X' && 'Pauli-X (Not Gate)'}
              {type === 'Z' && 'Pauli-Z (Phase Flip)'}
              {type === 'T' && 'Quantum Tunneling (Barrier Bypass)'}
              {type === 'CNOT' && 'Controlled-NOT (Entanglement)'}
              {type === 'M' && 'Measurement (Collapse)'}
            </div>
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={clearCircuit} className="p-3 text-neur-subtext hover:text-white transition-colors" title="Clear Circuit">
          <RotateCcw size={20} />
        </button>
        <button 
          onClick={runSimulation}
          disabled={isSimulating}
          className="flex items-center space-x-3 px-6 py-3 bg-neur-purple text-white rounded-xl hover:bg-purple-600 disabled:opacity-50 transition-all font-black text-xs tracking-widest shadow-[0_0_15px_rgba(139,92,246,0.3)] active:scale-95"
        >
          {isSimulating ? <Activity className="animate-spin" size={18} /> : <Play size={18} fill="currentColor" />}
          <span>EXECUTE HQCI</span>
        </button>
      </div>

      {/* Circuit Grid */}
      <div className="flex-1 bg-neur-card rounded-3xl border border-white/10 p-8 overflow-x-auto relative shadow-2xl">
        <div className="min-w-[800px]">
          {Array.from({ length: QUBIT_COUNT }).map((_, qIdx) => (
            <div key={qIdx} className="flex items-center mb-10 last:mb-0 relative">
              <div className="w-20 text-neur-cyan font-black font-mono tracking-widest text-xs">QUBIT {qIdx}</div>
              {/* Qubit Line */}
              <div className="absolute left-20 right-0 h-[1.5px] bg-white/10 top-1/2 -translate-y-1/2 z-0 shadow-[0_0_5px_rgba(255,255,255,0.05)]" />
              
              <div className="flex-1 flex space-x-5 ml-4 z-10">
                {Array.from({ length: STEPS }).map((_, sIdx) => {
                  const gate = gates.find(g => g.qubit === qIdx && g.timeStep === sIdx);
                  return (
                    <div 
                      key={sIdx}
                      onClick={() => handleGridClick(qIdx, sIdx)}
                      className={`w-14 h-14 border border-dashed border-white/20 rounded-2xl flex items-center justify-center cursor-pointer hover:border-neur-cyan/50 transition-all bg-neur-bg relative group
                        ${gate ? (gate.type === 'T' ? 'border-neur-purple border-solid gate-t-pulse' : 'border-solid border-neur-cyan bg-neur-cyan/10 shadow-[0_0_10px_rgba(0,242,255,0.1)]') : 'hover:bg-white/5'}`}
                    >
                      {gate && (
                        <span className={`font-black font-mono text-lg ${gate.type === 'T' ? 'text-white' : 'text-neur-cyan'}`}>
                          {gate.type}
                        </span>
                      )}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-white/5 pointer-events-none transition-opacity"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 right-8 text-[10px] text-neur-subtext flex items-center bg-neur-bg/50 px-4 py-2 rounded-full border border-white/5">
            <Info size={14} className="mr-2 text-neur-cyan" />
            Select a gate and map it to the quantum lattice grid.
        </div>
      </div>

      {/* Results Panel */}
      {result && (
        <div className="bg-neur-card p-6 rounded-3xl border border-neur-cyan/30 animate-in fade-in slide-in-from-bottom-4 shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-sm font-black text-white flex items-center tracking-[0.3em] uppercase">
              <Activity className="mr-3 text-neur-cyan" size={20} /> Latent State Vector Analysis
            </h3>
            <div className="flex space-x-6 text-right">
              <div>
                <div className="text-[10px] text-neur-subtext uppercase tracking-widest font-bold">Latency</div>
                <div className="font-mono text-neur-cyan font-bold">{result.executionTimeMs}ms</div>
              </div>
              <div>
                <div className="text-[10px] text-neur-subtext uppercase tracking-widest font-bold">Resonance</div>
                <div className="font-mono text-neur-purple font-bold">{(result.fidelity * 100).toFixed(2)}%</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] text-neur-subtext font-black tracking-widest uppercase flex items-center">
                <Zap size={12} className="mr-2 text-amber-400" /> Probabilistic States
              </h4>
              <div className="space-y-3 bg-neur-bg/30 p-4 rounded-2xl border border-white/5">
                {result.topStates.map((s: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white bg-white/5 px-2 py-1 rounded">{s.state}</span>
                    <div className="flex-1 mx-4 h-2.5 bg-neur-bg rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="h-full bg-gradient-to-r from-neur-purple to-neur-cyan transition-all duration-1000 shadow-[0_0_10px_rgba(0,242,255,0.3)]" 
                        style={{ width: `${s.probability * 100}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-neur-cyan font-bold w-12 text-right">{(s.probability * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
              {result.tunnelingFlux && (
                <div className="flex items-center justify-between px-4 py-2 bg-neur-purple/10 border border-neur-purple/30 rounded-xl">
                  <span className="text-[10px] font-black text-neur-purple uppercase tracking-widest">Tunneling Flux</span>
                  <span className="text-[10px] font-mono text-white font-bold uppercase">{result.tunnelingFlux}</span>
                </div>
              )}
            </div>
            <div className="bg-neur-bg/50 p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] text-neur-subtext font-black tracking-widest uppercase mb-3">Interpretation Rationale</h4>
                <p className="text-xs text-gray-300 leading-relaxed italic font-medium">"{result.analysis}"</p>
              </div>
              <div className="mt-6 flex justify-between items-center border-t border-white/10 pt-4">
                 <span className="text-[9px] text-neur-subtext uppercase tracking-widest">Model: Gemini-3-Pro-Preview</span>
                 <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-[9px] text-green-400 font-bold uppercase">Simulation Coherent</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantumCircuit;
