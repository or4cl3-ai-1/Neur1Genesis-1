import React, { useState } from 'react';
import { Target, TrendingUp, AlertCircle, RefreshCw, ChevronRight, Play, Film, X } from 'lucide-react';
import { generateScenarioOutcomes } from '../services/huggingFaceService';
import { ScenarioOutcome } from '../types';

interface ScenarioPlannerProps {
  metrics: any;
  addLog: (source: any, msg: string, type?: any) => void;
}

const ScenarioPlanner: React.FC<ScenarioPlannerProps> = ({ metrics, addLog }) => {
  const [goal, setGoal] = useState("");
  const [scenarios, setScenarios] = useState<ScenarioOutcome[]>([]);
  const [isPlanning, setIsPlanning] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<ScenarioOutcome | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePlan = async () => {
    if (!goal.trim()) return;
    setIsPlanning(true);
    addLog('Forecaster', `Initiating recursive scenario planning for: "${goal}"`, 'info');

    const results = await generateScenarioOutcomes(metrics, goal);
    setScenarios(results.map((r: any) => ({ ...r, id: Math.random().toString() })));
    setIsPlanning(false);
  };

  const handleVisualize = async (scenario: ScenarioOutcome) => {
    setIsAnimating(true);
    addLog('Forecaster', `Generating scenario visualization for: "${scenario.title}"`, 'info');
    setSelectedScenario(scenario);
    // Simulate animation loading
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="bg-neur-card rounded-3xl border border-neur-cyan/20 p-6 shadow-xl">
        <h2 className="text-xl font-black text-white tracking-[0.3em] mb-4 flex items-center">
          <TrendingUp className="mr-3 text-neur-cyan" /> GENERATIVE SCENARIO HORIZON
        </h2>
        <p className="text-sm text-neur-subtext mb-6 uppercase tracking-widest font-bold">
          Model future system states based on current lattice metrics and hypothetical goals.
        </p>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <input 
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Hypothesize target state (e.g., '100% Fairness across Sectors')..."
            className="flex-1 bg-neur-bg border border-neur-cyan/30 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-neur-cyan focus:ring-1 focus:ring-neur-cyan/50 transition-all font-mono text-sm"
          />
          <button 
            onClick={handlePlan}
            disabled={!goal.trim() || isPlanning}
            className="px-8 py-4 bg-neur-cyan text-neur-bg rounded-2xl font-black tracking-widest text-sm hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center"
          >
            {isPlanning ? <RefreshCw className="animate-spin mr-2" /> : <Target className="mr-2" />}
            {isPlanning ? 'SIMULATING...' : 'PROJECT TIMELINE'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-20">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="bg-neur-card rounded-3xl border border-white/5 p-6 hover:border-neur-cyan/30 transition-all group relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${scenario.impactScore > 0 ? 'bg-green-500' : 'bg-neur-danger'}`}></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div className="flex items-center space-x-3 mb-2 md:mb-0">
                <div className={`p-2 rounded-xl ${scenario.impactScore > 0 ? 'bg-green-500/10 text-green-500' : 'bg-neur-danger/10 text-neur-danger'}`}>
                  {scenario.impactScore > 0 ? <TrendingUp size={20} /> : <AlertCircle size={20} />}
                </div>
                <h3 className="text-lg font-black text-white tracking-widest uppercase">{scenario.title}</h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-[10px] text-neur-subtext uppercase tracking-widest font-bold">PROBABILITY</div>
                  <div className="text-xl font-mono font-black text-neur-cyan">{(scenario.probability * 100).toFixed(0)}%</div>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-6 leading-relaxed font-medium">
              {scenario.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neur-bg/50 rounded-2xl p-4 border border-white/5">
                <div className="text-[10px] text-neur-subtext font-black tracking-widest mb-3 uppercase">Requirements for Realization</div>
                <ul className="space-y-2">
                  {scenario.requirements.map((req, i) => (
                    <li key={i} className="flex items-center text-xs text-white/80 font-mono">
                      <ChevronRight size={12} className="text-neur-cyan mr-2" /> {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-end justify-end space-x-3">
                <button
                  onClick={() => handleVisualize(scenario)}
                  disabled={isAnimating}
                  className="px-6 py-3 bg-neur-purple/20 border border-neur-purple/40 rounded-xl text-[10px] text-neur-purple font-black tracking-widest hover:bg-neur-purple hover:text-white transition-all uppercase flex items-center"
                >
                  {isAnimating ? <RefreshCw className="animate-spin mr-2" size={14} /> : <Film className="mr-2" size={14} />}
                  Visualize
                </button>
                <button className="px-6 py-3 border border-neur-cyan/30 rounded-xl text-[10px] text-neur-cyan font-black tracking-widest hover:bg-neur-cyan hover:text-neur-bg transition-all uppercase">
                  Lock Sync
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {!isPlanning && scenarios.length === 0 && (
          <div className="h-40 flex flex-col items-center justify-center text-neur-subtext border-2 border-dashed border-white/5 rounded-3xl">
            <Target className="opacity-20 mb-3" size={40} />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase">Ready for Prediction Sequence</span>
          </div>
        )}
      </div>

      {selectedScenario && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in zoom-in duration-300">
          <div className="relative w-full max-w-4xl aspect-video bg-gradient-to-br from-neur-cyan/10 to-neur-purple/10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center">
            {!isAnimating && (
              <>
                {/* Animated visualization */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Central circle with pulsing animation */}
                  <div className="absolute w-full h-full rounded-full border-2 border-neur-cyan/40 animate-pulse"></div>
                  <div className="absolute w-4/5 h-4/5 rounded-full border-2 border-neur-purple/30 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="absolute w-3/5 h-3/5 rounded-full border-2 border-neur-cyan/20 animate-pulse" style={{ animationDelay: '0.4s' }}></div>

                  {/* Center point */}
                  <div className="absolute w-2 h-2 bg-neur-cyan rounded-full shadow-[0_0_20px_#00f2ff]"></div>
                </div>

                <div className="mt-12 text-center">
                  <h3 className="text-2xl font-black text-white tracking-widest mb-3 uppercase">{selectedScenario.title}</h3>
                  <p className="text-sm text-neur-cyan mb-2">Probability: {(selectedScenario.probability * 100).toFixed(0)}%</p>
                  <p className="text-sm text-gray-400 max-w-lg">{selectedScenario.description}</p>
                </div>
              </>
            )}

            {isAnimating && (
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 border-4 border-neur-cyan/20 border-t-neur-cyan rounded-full animate-spin"></div>
                <p className="text-neur-cyan font-black tracking-widest uppercase">Generating Visualization</p>
              </div>
            )}

            <button
              onClick={() => setSelectedScenario(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
              disabled={isAnimating}
            >
              <X size={24} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioPlanner;
