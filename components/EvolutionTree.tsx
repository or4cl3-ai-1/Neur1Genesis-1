
import React from 'react';
import { EchoNode, NodeSkill } from '../types';
import { Award, Zap, Shield, Brain, TrendingUp, Lock } from 'lucide-react';

interface EvolutionTreeProps {
  node: EchoNode;
  onLevelUp?: (nodeId: string) => void;
}

const EvolutionTree: React.FC<EvolutionTreeProps> = ({ node }) => {
  const getIcon = (name: string) => {
    if (name.includes('Ethical')) return <Shield size={16} />;
    if (name.includes('Quantum')) return <Zap size={16} />;
    if (name.includes('Neural')) return <Brain size={16} />;
    return <Award size={16} />;
  };

  return (
    <div className="bg-neur-card rounded-3xl border border-neur-cyan/20 p-8 shadow-2xl animate-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 border-b border-white/10 pb-6">
        <div className="flex items-center space-x-6 mb-4 md:mb-0">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neur-cyan/20 to-neur-purple/20 border-2 border-neur-cyan flex items-center justify-center text-3xl font-black text-neur-cyan shadow-[0_0_20px_rgba(0,242,255,0.4)]">
            {node.level}
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase">{node.name} Evolution</h2>
            <div className="flex items-center space-x-2 text-neur-subtext text-xs font-mono tracking-widest mt-1">
              <TrendingUp size={14} className="text-neur-cyan" />
              <span>XP: {node.experience} / {node.level * 1000}</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-64 h-3 bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/10">
          <div className="h-full bg-gradient-to-r from-neur-blue via-neur-cyan to-neur-purple shadow-[0_0_15px_#00f2ff] transition-all duration-1000" style={{ width: `${(node.experience / (node.level * 1000)) * 100}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {node.skills.map((skill, idx) => (
          <div 
            key={idx} 
            className={`relative p-6 rounded-2xl border transition-all group overflow-hidden ${skill.unlocked ? 'bg-neur-cyan/5 border-neur-cyan/40 hover:border-neur-cyan' : 'bg-white/5 border-white/10 opacity-60'}`}
          >
            {!skill.unlocked && <Lock className="absolute top-4 right-4 text-neur-subtext" size={16} />}
            <div className={`mb-4 w-10 h-10 rounded-xl flex items-center justify-center ${skill.unlocked ? 'bg-neur-cyan text-neur-bg' : 'bg-neur-subtext/20 text-neur-subtext'}`}>
              {getIcon(skill.name)}
            </div>
            <h3 className={`text-sm font-black tracking-widest uppercase mb-2 ${skill.unlocked ? 'text-white' : 'text-neur-subtext'}`}>{skill.name}</h3>
            <p className="text-[10px] text-neur-subtext leading-relaxed font-medium mb-4">{skill.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-neur-cyan uppercase tracking-widest">Level {skill.level}</span>
              {skill.unlocked && (
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`w-1 h-1 rounded-full ${i < skill.level ? 'bg-neur-cyan shadow-[0_0_5px_#00f2ff]' : 'bg-white/10'}`}></div>
                  ))}
                </div>
              )}
            </div>
            
            {skill.unlocked && (
              <div className="absolute -right-4 -bottom-4 text-neur-cyan/10 group-hover:text-neur-cyan/20 transition-colors">
                {getIcon(skill.name)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionTree;
