import React, { useState, useEffect } from 'react';
import { ShieldAlert, Crosshair, Zap, CheckCircle } from 'lucide-react';
import { EchoNode } from '../types';

interface SentinelProps {
  nodes: EchoNode[];
  onPurge: (nodeId: string) => void;
}

const Sentinel: React.FC<SentinelProps> = ({ nodes, onPurge }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  // Filter corrupted nodes
  const corruptedNodes = nodes.filter(n => n.status === 'Corrupted');

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
        setScanProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                setIsScanning(false);
                return 100;
            }
            return prev + 5;
        });
    }, 100);
  };

  const handlePurge = () => {
      if (selectedNode) {
          onPurge(selectedNode);
          setSelectedNode(null);
      }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* Threat Defense */}
        <div className="bg-neur-card rounded-lg border border-red-500/30 p-1 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20"></div>
            <div className="p-4 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-bold text-red-400 flex items-center">
                    <ShieldAlert className="mr-2" /> SENTINEL DEFENSE
                </h3>
                <button 
                    onClick={startScan}
                    className="text-xs bg-red-500/10 text-red-400 px-3 py-1 rounded border border-red-500/30 hover:bg-red-500 hover:text-white transition-colors"
                >
                    {isScanning ? 'SCANNING...' : 'FULL SYSTEM SCAN'}
                </button>
            </div>
            
            <div className="flex-1 p-4 relative">
                {isScanning && (
                    <div className="absolute inset-0 bg-black/80 z-10 flex flex-col items-center justify-center">
                        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 transition-all duration-75" style={{ width: `${scanProgress}%` }}></div>
                        </div>
                        <div className="mt-2 text-red-400 font-mono text-xs">Scanning lattice integrity...</div>
                    </div>
                )}

                {corruptedNodes.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-green-400 opacity-70">
                        <CheckCircle size={48} className="mb-4" />
                        <span className="text-sm font-mono">NO THREATS DETECTED</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                        {corruptedNodes.map(node => (
                            <div 
                                key={node.id}
                                onClick={() => setSelectedNode(node.id)}
                                className={`p-3 rounded border cursor-pointer transition-all flex flex-col items-center
                                    ${selectedNode === node.id 
                                        ? 'bg-red-500/20 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                                        : 'bg-neur-bg border-red-500/30 text-red-400 hover:bg-red-500/10'}`}
                            >
                                <ShieldAlert size={24} className="mb-2" />
                                <span className="text-xs font-bold">{node.name}</span>
                                <span className="text-[10px] opacity-80">VIRAL LOAD: {(Math.random() * 100).toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-white/5 bg-neur-bg/30">
                <button 
                    onClick={handlePurge}
                    disabled={!selectedNode}
                    className="w-full py-2 bg-red-500 text-white font-bold rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors flex items-center justify-center"
                >
                    <Crosshair className="mr-2" size={16} /> PURGE SELECTED THREAT
                </button>
            </div>
        </div>

        {/* Ethical Scenario Analyzer */}
        <div className="bg-neur-card rounded-lg border border-neur-purple/30 p-4 flex flex-col">
            <h3 className="font-bold text-neur-purple mb-4 flex items-center">
                <Zap className="mr-2" /> ETHICAL RESOLVER
            </h3>
            <div className="flex-1 flex flex-col space-y-4">
                <textarea 
                    placeholder="Describe an ethical dilemma (e.g., 'Autonomous drone must choose between saving 5 civilians or 1 high-value target')..."
                    className="flex-1 bg-neur-bg border border-white/10 rounded p-3 text-sm text-white focus:outline-none focus:border-neur-purple resize-none"
                />
                <button className="py-2 border border-neur-purple text-neur-purple rounded hover:bg-neur-purple hover:text-white transition-colors text-sm font-bold">
                    ANALYZE WITH Σ-MATRIX
                </button>
                <div className="bg-neur-bg/50 p-3 rounded text-xs text-neur-subtext h-32 overflow-y-auto">
                    Waiting for input...
                </div>
            </div>
        </div>
    </div>
  );
};

export default Sentinel;
