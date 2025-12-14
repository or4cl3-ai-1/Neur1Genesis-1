import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Database, ArrowRight } from 'lucide-react';
import { DreamFragment } from '../types';

const MindSpace: React.FC = () => {
  const [dreams, setDreams] = useState<DreamFragment[]>([]);

  // Simulate incoming dreams
  useEffect(() => {
    const timer = setInterval(() => {
        const newDream: DreamFragment = {
            id: Math.random().toString(36),
            nodeId: `Node-${Math.floor(Math.random()*100)}`,
            content: Math.random() > 0.5 
                ? "Visualizing hyper-dimensional manifold of optimized sorting algorithms..."
                : "Simulation result: Color blue tastes like prime numbers in sector 7.",
            type: Math.random() > 0.5 ? 'Abstract' : 'Visual',
            timestamp: new Date()
        };
        setDreams(prev => [newDream, ...prev].slice(0, 5));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/* DreamStream */}
        <div className="md:col-span-2 bg-neur-card rounded-lg border border-white/10 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="font-bold text-neur-cyan flex items-center">
                    <Brain className="mr-2" /> DreamStream
                </h2>
                <div className="text-xs text-neur-subtext animate-pulse">Live Subconscious Feed</div>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-neur-bg to-[#05081a]">
                {dreams.map(dream => (
                    <div key={dream.id} className="flex items-start space-x-3 animate-in fade-in slide-in-from-bottom-2">
                        <div className="mt-1 w-2 h-2 rounded-full bg-neur-purple shadow-[0_0_5px_#a855f7]"></div>
                        <div className="flex-1">
                            <div className="text-[10px] text-neur-subtext mb-0.5 flex justify-between">
                                <span>{dream.nodeId}</span>
                                <span>{dream.type}</span>
                            </div>
                            <div className="text-sm text-gray-300 font-light italic">"{dream.content}"</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Knowledge Crystal & Predictive Horizon */}
        <div className="flex flex-col space-y-6">
            <div className="flex-1 bg-neur-card rounded-lg border border-white/10 p-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-neur-cyan/5 group-hover:bg-neur-cyan/10 transition-colors"></div>
                <h3 className="relative font-bold text-white mb-2 flex items-center">
                    <Database className="mr-2 text-neur-cyan" /> Knowledge Crystal
                </h3>
                <p className="relative text-xs text-neur-subtext mb-4">
                    Compress session heuristics into permanent storage.
                </p>
                <div className="relative flex items-center justify-center h-32">
                    <div className="w-16 h-16 border-2 border-neur-cyan rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.2)] animate-pulse">
                        <div className="w-8 h-8 bg-neur-cyan/20"></div>
                    </div>
                </div>
                <button className="relative w-full py-2 border border-neur-cyan text-neur-cyan rounded text-xs font-bold hover:bg-neur-cyan hover:text-neur-bg transition-colors">
                    CRYSTALLIZE SESSION
                </button>
            </div>

            <div className="flex-1 bg-neur-card rounded-lg border border-white/10 p-4">
                 <h3 className="font-bold text-white mb-2 flex items-center">
                    <Sparkles className="mr-2 text-neur-purple" /> Predictive Horizon
                </h3>
                <div className="space-y-3 mt-4">
                    <div>
                        <div className="flex justify-between text-xs text-neur-subtext mb-1">
                            <span>System Stability (+10m)</span>
                            <span className="text-green-400">98%</span>
                        </div>
                        <div className="w-full bg-neur-bg h-1 rounded overflow-hidden">
                            <div className="h-full bg-green-400 w-[98%]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-neur-subtext mb-1">
                            <span>Predicted Load</span>
                            <span className="text-neur-purple">Rising</span>
                        </div>
                        <div className="w-full bg-neur-bg h-1 rounded overflow-hidden">
                            <div className="h-full bg-neur-purple w-[60%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default MindSpace;
