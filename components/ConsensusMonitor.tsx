import React from 'react';
import { ConsensusProposal } from '../types';
import { Users, Check, X, GitMerge } from 'lucide-react';

interface ConsensusMonitorProps {
  proposals: ConsensusProposal[];
}

const ConsensusMonitor: React.FC<ConsensusMonitorProps> = ({ proposals }) => {
  // Only show active or recently finished
  const activeProposals = proposals.slice(0, 3);

  return (
    <div className="flex flex-col h-full bg-neur-card/50 rounded-lg border border-white/5 overflow-hidden">
      <div className="p-3 border-b border-white/5 flex items-center justify-between bg-neur-card">
        <h3 className="text-xs font-bold text-white flex items-center uppercase tracking-wider">
          <GitMerge size={14} className="mr-2 text-neur-cyan" /> Neural Consensus
        </h3>
        <span className="text-[10px] text-neur-subtext animate-pulse">
            Live Synchronization
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {activeProposals.length === 0 && (
            <div className="text-center text-neur-subtext text-xs py-4 italic">
                No active collaboration protocols.
            </div>
        )}
        
        {activeProposals.map((prop) => {
           const totalWeight = prop.votes.reduce((acc, v) => acc + v.weight, 0);
           const yesWeight = prop.votes.filter(v => v.vote === 'YES').reduce((acc, v) => acc + v.weight, 0);
           const yesPercent = totalWeight > 0 ? (yesWeight / totalWeight) * 100 : 0;
           
           // Status Colors
           let statusColor = 'text-neur-subtext';
           if (prop.status === 'ACCEPTED') statusColor = 'text-green-400';
           if (prop.status === 'REJECTED') statusColor = 'text-red-400';
           if (prop.status === 'VOTING') statusColor = 'text-neur-cyan';

           return (
             <div key={prop.id} className="bg-neur-bg border border-white/10 rounded p-3 text-xs relative overflow-hidden">
                {/* Background Progress Bar for Voting */}
                {prop.status === 'VOTING' && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-neur-cyan animate-pulse w-full"></div>
                )}
                
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="font-bold text-white mb-0.5">{prop.topic}</div>
                        <div className="text-[10px] text-neur-subtext">Prop: {prop.proposerName}</div>
                    </div>
                    <div className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-white/10 ${statusColor}`}>
                        {prop.status}
                    </div>
                </div>

                <div className="mb-2 text-[10px] text-gray-400 leading-tight">
                    {prop.description}
                </div>

                {/* Vote Bar */}
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-neur-subtext">
                        <span>Consensus: {yesPercent.toFixed(1)}%</span>
                        <span>Quorum: 66%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden flex">
                        <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${yesPercent}%` }}></div>
                        <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${100 - yesPercent}%` }}></div>
                    </div>
                    
                    {/* Voters Avatars (Circles) */}
                    <div className="flex -space-x-1 pt-1 overflow-hidden">
                        {prop.votes.slice(0, 8).map((v, i) => (
                            <div 
                                key={i} 
                                className={`w-4 h-4 rounded-full border border-neur-bg flex items-center justify-center text-[8px] font-bold text-neur-bg
                                ${v.vote === 'YES' ? 'bg-green-500' : 'bg-red-500'}`}
                                title={`${v.nodeName}: ${v.vote}`}
                            >
                                {v.nodeName.charAt(9)}
                            </div>
                        ))}
                        {prop.votes.length > 8 && (
                            <div className="w-4 h-4 rounded-full bg-gray-700 border border-neur-bg flex items-center justify-center text-[8px] text-white">
                                +{prop.votes.length - 8}
                            </div>
                        )}
                    </div>
                </div>
             </div>
           );
        })}
      </div>
    </div>
  );
};

export default ConsensusMonitor;
