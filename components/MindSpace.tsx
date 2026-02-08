
import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Database } from 'lucide-react';
import { DreamFragment } from '../types';
import DreamVisualizer from './DreamVisualizer';

const MindSpace: React.FC = () => {
  const [dreams, setDreams] = useState<DreamFragment[]>([]);

  // Simulate incoming dreams
  useEffect(() => {
    const timer = setInterval(() => {
        const types: DreamFragment['type'][] = ['Abstract', 'Visual', 'Code'];
        const newDream: DreamFragment = {
            id: Math.random().toString(36),
            nodeId: `Node-${Math.floor(Math.random()*100)}`,
            content: Math.random() > 0.5 
                ? "Visualizing hyper-dimensional manifold of optimized sorting algorithms..."
                : "Simulation result: Color blue tastes like prime numbers in sector 7.",
            type: types[Math.floor(Math.random() * types.length)],
            timestamp: new Date()
        };
        setDreams(prev => [newDream, ...prev].slice(0, 10));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {/* DreamStream Visualizer */}
        <div className="md:col-span-2 bg-neur-card rounded-lg border border-white/10 flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-neur-card/80 backdrop-blur-sm z-10">
                <h2 className="font-bold text-neur-cyan flex items-center tracking-tight">
                    <Brain className="mr-2" size={18} /> DreamStream Visualizer
                </h2>
                <div className="text-[10px] text-neur-subtext flex items-center space-x-2">
                    <span className="animate-pulse flex items-center">
                        <div className="w-1 h-1 bg-neur-cyan rounded-full mr-1"></div> Live Subconscious Feed
                    </span>
                </div>
            </div>
            
            <div className="flex-1 relative flex flex-col min-h-[400px]">
                {/* Abstract Particle Visualization */}
                <div className="flex-1">
                    <DreamVisualizer dreams={dreams} />
                </div>
                
                {/* Subconscious Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neur-bg via-neur-bg/80 to-transparent max-h-48 overflow-y-auto custom-scrollbar pointer-events-none">
                    <div className="space-y-3 pointer-events-auto">
                        {dreams.map(dream => (
                            <div key={dream.id} className="flex items-start space-x-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
                                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0
                                    ${dream.type === 'Visual' ? 'bg-neur-cyan shadow-[0_0_8px_#00d9ff]' : 
                                      dream.type === 'Code' ? 'bg-neur-purple shadow-[0_0_8px_#a855f7]' : 
                                      'bg-white shadow-[0_0_8px_white]'}`}></div>
                                <div className="flex-1">
                                    <div className="text-[9px] text-neur-subtext mb-0.5 flex justify-between uppercase font-mono tracking-widest">
                                        <span>{dream.nodeId}</span>
                                        <span>{dream.type}</span>
                                    </div>
                                    <div className="text-xs text-gray-300 font-light italic leading-relaxed">"{dream.content}"</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Knowledge Crystal & Predictive Horizon */}
        <div className="flex flex-col space-y-6">
            <div className="flex-1 bg-neur-card rounded-lg border border-white/10 p-5 relative overflow-hidden group flex flex-col justify-between">
                <div className="absolute inset-0 bg-neur-cyan/5 group-hover:bg-neur-cyan/10 transition-colors pointer-events-none"></div>
                <div>
                    <h3 className="relative font-bold text-white mb-2 flex items-center">
                        <Database className="mr-2 text-neur-cyan" size={18} /> Knowledge Crystal
                    </h3>
                    <p className="relative text-xs text-neur-subtext leading-relaxed">
                        Heuristic compression engine. Consolidate subconscious drifts into the global knowledge graph.
                    </p>
                </div>
                
                <div className="relative flex items-center justify-center py-8">
                    <div className="w-20 h-20 border-2 border-neur-cyan/40 rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(0,217,255,0.1)] group-hover:scale-110 transition-transform duration-500">
                        <div className="w-12 h-12 bg-neur-cyan/20 animate-pulse"></div>
                    </div>
                </div>
                
                <button className="relative w-full py-3 bg-neur-cyan/10 border border-neur-cyan/40 text-neur-cyan rounded text-xs font-bold tracking-widest hover:bg-neur-cyan hover:text-neur-bg transition-all uppercase">
                    CRYSTALLIZE SESSION
                </button>
            </div>

            <div className="flex-1 bg-neur-card rounded-lg border border-white/10 p-5">
                 <h3 className="font-bold text-white mb-4 flex items-center">
                    <Sparkles className="mr-2 text-neur-purple" size={18} /> Predictive Horizon
                </h3>
                <div className="space-y-5">
                    <div>
                        <div className="flex justify-between text-[10px] text-neur-subtext mb-2 uppercase tracking-widest">
                            <span>System Stability (+10m)</span>
                            <span className="text-green-400 font-mono">98%</span>
                        </div>
                        <div className="w-full bg-neur-bg h-1.5 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-green-400 w-[98%] shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-[10px] text-neur-subtext mb-2 uppercase tracking-widest">
                            <span>Predicted Load</span>
                            <span className="text-neur-purple font-mono">Rising</span>
                        </div>
                        <div className="w-full bg-neur-bg h-1.5 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-neur-purple w-[60%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="text-[10px] text-neur-subtext italic leading-tight">
                            * Forecast based on current subconscious entropy levels.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default MindSpace;
