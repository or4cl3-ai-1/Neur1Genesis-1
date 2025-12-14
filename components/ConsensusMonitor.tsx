import React, { useState } from 'react';
import { ConsensusProposal } from '../types';
import { Users, Check, X, GitMerge, ChevronRight } from 'lucide-react';

interface ConsensusMonitorProps {
  proposals: ConsensusProposal[];
}

const ConsensusMonitor: React.FC<ConsensusMonitorProps> = ({ proposals }) => {
  const [selectedProposal, setSelectedProposal] = useState<ConsensusProposal | null>(null);

  // Only show active or recently finished
  const activeProposals = proposals.slice(0, 3);

  return (
    <div className="flex flex-col h-full bg-neur-card/50 rounded-lg border border-white/5 overflow-hidden relative">
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
             <div 
                key={prop.id} 
                onClick={() => setSelectedProposal(prop)}
                className="bg-neur-bg border border-white/10 rounded p-3 text-xs relative overflow-hidden cursor-pointer hover:border-white/30 transition-colors group"
             >
                {/* Background Progress Bar for Voting */}
                {prop.status === 'VOTING' && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-neur-cyan animate-pulse w-full"></div>
                )}
                
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="font-bold text-white mb-0.5 group-hover:text-neur-cyan transition-colors">{prop.topic}</div>
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
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex -space-x-1 overflow-hidden">
                            {prop.votes.slice(0, 8).map((v, i) => (
                                <div 
                                    key={i} 
                                    className={`w-4 h-4 rounded-full border border-neur-bg flex items-center justify-center text-[8px] font-bold text-neur-bg
                                    ${v.vote === 'YES' ? 'bg-green-500' : 'bg-red-500'}`}
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
                        <div className="text-[10px] text-neur-subtext flex items-center group-hover:text-white transition-colors">
                            Details <ChevronRight size={10} className="ml-1"/>
                        </div>
                    </div>
                </div>
             </div>
           );
        })}
      </div>

      {/* Details Modal / Overlay */}
      {selectedProposal && (
          <div className="absolute inset-0 z-20 bg-[#0a0e27]/95 backdrop-blur-sm flex flex-col animate-in fade-in slide-in-from-bottom-5">
              <div className="p-3 border-b border-white/10 flex items-center justify-between bg-neur-card">
                  <div>
                      <h4 className="text-sm font-bold text-white">{selectedProposal.topic}</h4>
                      <div className="text-[10px] text-neur-subtext">Voting Breakdown</div>
                  </div>
                  <button onClick={() => setSelectedProposal(null)} className="p-1 hover:bg-white/10 rounded">
                      <X size={16} className="text-white" />
                  </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                  <table className="w-full text-xs text-left">
                      <thead>
                          <tr className="text-neur-subtext border-b border-white/5">
                              <th className="pb-2 pl-2">Node</th>
                              <th className="pb-2">Weight</th>
                              <th className="pb-2 text-right pr-2">Vote</th>
                          </tr>
                      </thead>
                      <tbody>
                          {selectedProposal.votes.map((vote, idx) => (
                              <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                                  <td className="py-2 pl-2 text-white">{vote.nodeName}</td>
                                  <td className="py-2 font-mono text-neur-subtext">{vote.weight.toFixed(2)}</td>
                                  <td className="py-2 text-right pr-2">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${vote.vote === 'YES' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                          {vote.vote}
                                      </span>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                  {selectedProposal.votes.length === 0 && (
                      <div className="text-center text-neur-subtext italic py-4">No votes cast yet.</div>
                  )}
              </div>
          </div>
      )}
    </div>
  );
};

export default ConsensusMonitor;
