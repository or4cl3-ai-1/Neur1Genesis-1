
import React, { useState } from 'react';
import { GitBranch, Play, CheckCircle, Clock, Users, ArrowRight } from 'lucide-react';

const TaskSwarm: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Q-Lattice Optimization', nodes: ['EchoNode-124', 'EchoNode-891'], status: 'Completed', time: '1.2s' },
    { id: '2', title: 'Ethical Drift Correction', nodes: ['EchoNode-Ethical'], status: 'In-Progress', time: 'Ongoing' },
    { id: '3', title: 'InfiniGen Code Audit', nodes: ['EchoNode-Security', 'EchoNode-Coordinator'], status: 'Pending', time: 'Queue' }
  ]);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="bg-neur-card rounded-3xl border border-neur-purple/30 p-8 shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-black text-white tracking-[0.4em] mb-4 flex items-center uppercase">
          <GitBranch className="mr-3 text-neur-purple" /> TASK SWARM ORCHESTRATOR
        </h2>
        <p className="text-sm text-neur-subtext max-w-2xl mb-8 leading-relaxed font-bold tracking-widest uppercase">
          Chain complex agentic workflows across the lattice. Synchronize specialized nodes for multi-modal output.
        </p>
        
        <div className="flex space-x-4 mb-8">
          <input 
            type="text" 
            placeholder="Define complex workflow sequence..." 
            className="flex-1 bg-neur-bg border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-neur-purple/50 outline-none transition-all font-mono"
          />
          <button className="px-8 py-4 bg-neur-purple text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center">
            <Play size={18} className="mr-2" /> Deploy
          </button>
        </div>

        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="bg-neur-bg/50 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between group hover:border-neur-purple/30 transition-all">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className={`p-3 rounded-xl ${task.status === 'Completed' ? 'bg-green-500/10 text-green-500' : task.status === 'In-Progress' ? 'bg-neur-cyan/10 text-neur-cyan' : 'bg-neur-subtext/10 text-neur-subtext'}`}>
                  {task.status === 'Completed' ? <CheckCircle /> : task.status === 'In-Progress' ? <Clock className="animate-spin" /> : <Users />}
                </div>
                <div>
                  <h3 className="text-sm font-black text-white tracking-widest uppercase">{task.title}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-[9px] text-neur-subtext font-mono flex items-center"><Users size={10} className="mr-1" /> {task.nodes.join(', ')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <div className="text-[8px] text-neur-subtext font-black tracking-widest uppercase">Latency</div>
                  <div className="text-xs font-mono text-neur-purple">{task.time}</div>
                </div>
                <ArrowRight size={20} className="text-neur-subtext opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskSwarm;
