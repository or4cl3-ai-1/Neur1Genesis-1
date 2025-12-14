import React, { useState } from 'react';
import { QuantumGate } from '../types';
import { Play, RotateCcw, Plus, Activity } from 'lucide-react';
import { simulateQuantumExecution, isApiKeySet } from '../services/geminiService';

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
      gates.map(g => `${g.type} on Q${g.qubit} at T${g.timeStep}`).join(', ');

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
        analysis: "Circuit demonstrates high entanglement consistent with GHZ state preparation."
      });
    }
    
    setIsSimulating(false);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Toolbar */}
      <div className="flex items-center space-x-2 bg-neur-card p-3 rounded-lg border border-white/10">
        <span className="text-sm text-neur-subtext mr-2">GATES:</span>
        {['H', 'X', 'Z', 'CNOT', 'M'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedGateType(type as any)}
            className={`w-10 h-10 rounded flex items-center justify-center font-mono font-bold transition-all
              ${selectedGateType === type 
                ? 'bg-neur-cyan text-neur-bg scale-110 shadow-[0_0_10px_#00d9ff]' 
                : 'bg-neur-bg text-neur-cyan hover:bg-white/10'}`}
          >
            {type}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={clearCircuit} className="p-2 text-neur-subtext hover:text-white">
          <RotateCcw size={18} />
        </button>
        <button 
          onClick={runSimulation}
          disabled={isSimulating}
          className="flex items-center space-x-2 px-4 py-2 bg-neur-purple text-white rounded hover:bg-purple-600 disabled:opacity-50 transition-colors"
        >
          {isSimulating ? <Activity className="animate-spin" size={18} /> : <Play size={18} />}
          <span>EXECUTE HQCI</span>
        </button>
      </div>

      {/* Circuit Grid */}
      <div className="flex-1 bg-neur-card rounded-lg border border-white/10 p-6 overflow-x-auto relative">
        <div className="min-w-[600px]">
          {Array.from({ length: QUBIT_COUNT }).map((_, qIdx) => (
            <div key={qIdx} className="flex items-center mb-8 relative">
              <div className="w-16 text-neur-subtext font-mono">Q{qIdx}</div>
              {/* Qubit Line */}
              <div className="absolute left-16 right-0 h-[2px] bg-white/10 top-1/2 -translate-y-1/2 z-0" />
              
              <div className="flex-1 flex space-x-4 ml-2 z-10">
                {Array.from({ length: STEPS }).map((_, sIdx) => {
                  const gate = gates.find(g => g.qubit === qIdx && g.timeStep === sIdx);
                  return (
                    <div 
                      key={sIdx}
                      onClick={() => handleGridClick(qIdx, sIdx)}
                      className={`w-12 h-12 border border-dashed border-white/20 rounded flex items-center justify-center cursor-pointer hover:border-neur-cyan/50 transition-colors bg-neur-bg
                        ${gate ? 'border-solid border-neur-cyan bg-neur-cyan/10' : ''}`}
                    >
                      {gate && (
                        <span className="text-neur-cyan font-bold font-mono">{gate.type}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results Panel */}
      {result && (
        <div className="bg-neur-card p-4 rounded-lg border border-neur-cyan/30 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-neur-cyan flex items-center">
              <Activity className="mr-2" size={18} /> Simulation Results
            </h3>
            <div className="text-right">
              <div className="text-sm text-neur-subtext">Latency</div>
              <div className="font-mono text-neur-cyan">{result.executionTimeMs}ms</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm text-neur-subtext mb-2">State Probabilities</h4>
              <div className="space-y-2">
                {result.topStates.map((s: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-mono text-white">{s.state}</span>
                    <div className="flex-1 mx-3 h-2 bg-neur-bg rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-neur-purple" 
                        style={{ width: `${s.probability * 100}%` }}
                      />
                    </div>
                    <span className="font-mono text-neur-subtext">{(s.probability * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-neur-bg/50 p-3 rounded border border-white/5">
              <h4 className="text-sm text-neur-subtext mb-2">Analysis</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{result.analysis}</p>
              <div className="mt-2 text-xs text-green-400">Fidelity: {(result.fidelity * 100).toFixed(2)}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantumCircuit;
