import React from 'react';
import { Atom, Cpu, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="relative h-screen w-full bg-[#05081a] overflow-hidden flex flex-col items-center justify-center text-center px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neur-purple/20 via-[#05081a] to-[#05081a] opacity-60"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neur-cyan/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neur-purple/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-1000">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-neur-cyan to-neur-purple flex items-center justify-center shadow-[0_0_30px_rgba(0,217,255,0.4)]">
            <span className="text-3xl md:text-4xl font-bold text-neur-bg">N1</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="text-white">NEUR</span>
          <span className="text-neur-cyan">1</span>
          <span className="text-white">GENESIS</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-neur-subtext max-w-2xl mx-auto leading-relaxed">
          The first mobile-native, quantum-enhanced AI platform. 
          <br className="hidden md:block"/>
          Experience autonomous agents and verifiable ethical governance.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 pt-8">
            <div className="flex items-center space-x-2 text-neur-subtext text-sm border border-white/10 px-4 py-2 rounded-full bg-white/5">
                <Cpu size={16} className="text-neur-cyan" />
                <span>8-Qubit Simulation</span>
            </div>
             <div className="flex items-center space-x-2 text-neur-subtext text-sm border border-white/10 px-4 py-2 rounded-full bg-white/5">
                <Atom size={16} className="text-neur-purple" />
                <span>Σ-Matrix Governance</span>
            </div>
        </div>

        <div className="pt-10">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-neur-cyan to-neur-purple opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-neur-cyan to-neur-purple blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <span className="relative flex items-center space-x-3 text-white font-bold text-lg tracking-wider">
              <span>INITIALIZE SYSTEM</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-8 text-xs text-neur-subtext font-mono">
        v1.0.4-beta | QUANTUM CORE: ONLINE
      </div>
    </div>
  );
};

export default LandingPage;
