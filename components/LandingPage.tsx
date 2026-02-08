import React from 'react';
import { ArrowRight, Cpu, ShieldCheck, Zap, Brain } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [showChatron, setShowChatron] = useState(false);

  return (
    <div className="relative h-screen w-full bg-[#020410] overflow-hidden flex flex-col items-center justify-center text-center px-6 selection:bg-neur-cyan/30">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,242,255,0.05)_0%,_transparent_80%)]"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neur-cyan/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neur-purple/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>
      
      {/* Technical HUD Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      {/* Main Branding Section */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl">
        
        {/* The High-Fidelity Logo Component (from provided images) */}
        <div className="relative w-56 h-56 md:w-72 md:h-72 mb-16 flex items-center justify-center group cursor-pointer" onClick={onStart}>
          {/* Animated Outer Rings */}
          <div className="absolute inset-0 border-2 border-neur-cyan/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-4 border-[1px] border-neur-cyan/40 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
          
          {/* HUD Segments (SVG path approximation of the logo) */}
          <svg className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,5" className="text-neur-cyan/30" />
            <path d="M 50,2 A 48,48 0 0,1 98,50" fill="none" stroke="#00f2ff" strokeWidth="2" strokeLinecap="round" className="opacity-60" />
            <path d="M 50,98 A 48,48 0 0,1 2,50" fill="none" stroke="#00f2ff" strokeWidth="2" strokeLinecap="round" className="opacity-60" />
          </svg>

          {/* Central Logo Core (Brain HUD Style) */}
          <div className="relative w-40 h-40 md:w-52 md:h-52 bg-neur-cyan/5 rounded-full flex items-center justify-center border border-neur-cyan/20 overflow-hidden group-hover:bg-neur-cyan/10 transition-all duration-700 shadow-[inset_0_0_40px_rgba(0,242,255,0.1)]">
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <Brain className="w-24 h-24 md:w-32 md:h-32 text-neur-cyan animate-pulse" />
            </div>
            {/* The Text Ring (from logo 1) */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_25s_linear_infinite_reverse]" viewBox="0 0 100 100">
                <defs>
                    <path id="textCircle" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                </defs>
                <text className="text-[6px] font-bold tracking-[0.4em] uppercase fill-neur-cyan/80">
                    <textPath xlinkHref="#textCircle">NEUR1GENESIS • QUANTUM AI • AUTONOMY • NEUR1GENESIS •</textPath>
                </text>
            </svg>
            <span className="text-5xl md:text-6xl font-black text-white tracking-tighter z-10 drop-shadow-[0_0_20px_rgba(0,242,255,0.8)]">N1</span>
          </div>

          {/* Data Callouts */}
          <div className="absolute -top-8 -right-12 hidden md:block">
            <div className="glass-panel p-2 border border-neur-cyan/30 rounded-lg animate-float">
                <div className="text-[8px] text-neur-subtext uppercase tracking-widest font-mono">Sync Status</div>
                <div className="text-xs text-neur-cyan font-bold font-mono">ENCRYPTED</div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-12 hidden md:block">
            <div className="glass-panel p-2 border border-neur-purple/30 rounded-lg animate-float" style={{ animationDelay: '2s' }}>
                <div className="text-[8px] text-neur-subtext uppercase tracking-widest font-mono">Pas Integrity</div>
                <div className="text-xs text-neur-purple font-bold font-mono">0.942 SIGMA</div>
            </div>
          </div>

          {/* Primary Logo */}
          <div className={`transition-all duration-500 ${showChatron ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-neur-cyan to-neur-purple flex items-center justify-center shadow-[0_0_30px_rgba(0,217,255,0.4)]">
              <span className="text-3xl md:text-4xl font-bold text-neur-bg">N1</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          {showChatron && (
            <div className="text-neur-cyan text-sm md:text-base font-mono tracking-widest font-bold animate-in fade-in">
              ★ CHATRON 9.0 NEXUS PLATFORM ★
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-white">NEUR</span>
            <span className="text-neur-cyan">1</span>
            <span className="text-white">GENESIS</span>
          </h1>
          {showChatron && (
            <div className="text-neur-purple text-sm md:text-base font-mono">
              Powered by DAEDALUS ORCHESTRATION ENGINE
            </div>
          )}
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-[0.3em] mb-6 text-glow leading-tight">
          <span className="text-white">NEUR</span>
          <span className="text-neur-cyan">1</span>
          <span className="text-white">GENESIS</span>
        </h1>
        
        <p className="text-md md:text-xl text-neur-subtext max-w-2xl mx-auto leading-relaxed font-medium uppercase tracking-[0.15em] mb-14 px-4">
          Unifying <span className="text-white">Autonomous Agents</span> with <br className="hidden md:block"/>
          <span className="text-neur-cyan">Quantum-Verifiable</span> Ethical Governance
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-16">
            <FeatureBadge icon={<Cpu size={16}/>} text="HQCI Simulation" />
            <FeatureBadge icon={<ShieldCheck size={16}/>} text="Σ-Matrix v4" />
            <FeatureBadge icon={<Zap size={16}/>} text="Ultra Low Latency" />
        </div>

        <button 
          onClick={onStart}
          className="group relative px-12 py-5 bg-transparent rounded-full transition-all duration-500 hover:scale-105 active:scale-95 touch-manipulation overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neur-blue via-neur-cyan to-neur-blue rounded-full shadow-[0_0_35px_rgba(0,242,255,0.4)] group-hover:shadow-[0_0_60px_rgba(0,242,255,0.7)] transition-all bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]"></div>
          <span className="relative flex items-center space-x-5 text-white font-black text-xl tracking-[0.4em] uppercase">
            <span>Synchronize</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
          </span>
        </button>
      </div>
      
      {/* Mobile-Responsive Footer HUD */}
      <div className="absolute bottom-6 w-full px-8 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono tracking-[0.3em] text-neur-subtext opacity-60 uppercase space-y-2 md:space-y-0">
        <div className="flex items-center space-x-6">
          <span className="text-neur-cyan">VER: 1.0.4-LATTICE</span>
          <span className="hidden md:inline">•</span>
          <span>LATENCY: 1.84 MS</span>
        </div>
        <div className="text-center md:text-right">
          Quantum entanglement layer 42 confirmed • SECURE
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </div>
  );
};

const FeatureBadge: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center space-x-3 text-neur-subtext text-[11px] border border-neur-cyan/30 px-5 py-2.5 rounded-full glass-panel uppercase font-bold tracking-[0.2em] hover:text-white hover:border-neur-cyan transition-all cursor-default">
    <span className="text-neur-cyan drop-shadow-[0_0_5px_#00f2ff]">{icon}</span>
    <span>{text}</span>
  </div>
);

export default LandingPage;
