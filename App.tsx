import React, { useState, useEffect } from 'react';
import { ViewState, EchoNode, SigmaMetrics, SystemLog, ConsensusProposal, Vote, SwarmTask } from './types';
import { 
  LayoutDashboard, Atom, Users, ShieldCheck, Cpu, Menu, MessageSquare, X, LogOut, GitMerge, Code, Brain, ShieldAlert, Mic, Volume2, VolumeX, Zap, TrendingUp, Settings, Activity, Network, Bell, Camera, GitBranch, Award, Flame, AlertTriangle, ArrowRight
} from 'lucide-react';

import NetworkGraph from './components/NetworkGraph';
import QuantumCircuit from './components/QuantumCircuit';
import EthicsPanel from './components/EthicsPanel';
import EthicalCompass from './components/EthicalCompass';
import ConsensusMonitor from './components/ConsensusMonitor';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import ChatInterface from './components/ChatInterface';
import CollaborationVisualizer from './components/CollaborationVisualizer';
import InfiniGen from './components/InfiniGen';
import MindSpace from './components/MindSpace';
import Sentinel from './components/Sentinel';
import ScenarioPlanner from './components/ScenarioPlanner';
import EvolutionTree from './components/EvolutionTree';
import StressTestLab from './components/StressTestLab';
import TaskSwarm from './components/TaskSwarm';
import VisionUplink from './components/VisionUplink';
import { processDaedalusCommand, isApiKeySet, getProactiveAdvice } from './services/huggingFaceService';
import { initAudio, toggleMute, updateSonification } from './services/audioService';

const generateNodes = (count: number): EchoNode[] => {
  const roles: EchoNode['role'][] = ['Generalist', 'Ethical', 'Security', 'Creative', 'Coordinator'];
  return Array.from({ length: count }).map((_, i) => ({
    id: `node-${i}`,
    name: `EchoNode-${Math.floor(Math.random() * 9000) + 1000}`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: Math.random() > 0.8 ? 'Processing' : Math.random() > 0.9 ? 'Offline' : 'Idle',
    trustScore: 0.7 + Math.random() * 0.3,
    cpuUsage: Math.floor(Math.random() * 60) + 10,
    tasksCompleted: Math.floor(Math.random() * 500),
    level: 1,
    experience: 0,
    skills: [
      { name: 'Neural Grounding', level: 1, unlocked: true, description: 'Direct synaptic link to lattice core.' },
      { name: 'Ethical Resilience', level: 0, unlocked: false, description: 'Increased immunity to biased dataset injection.' },
      { name: 'Quantum Tunneling', level: 0, unlocked: false, description: 'Ability to bypass local processing bottlenecks.' }
    ]
  }));
};

interface Message {
  id: string;
  sender: 'user' | 'system';
  text: string;
  timestamp: Date;
  rationale?: string;
  sentiment?: { score: number, mood: string };
}

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [nodes, setNodes] = useState<EchoNode[]>([]);
  const [metrics, setMetrics] = useState<SigmaMetrics>({
    coherence: 0.98, pasScore: 0.94, fairness: 0.95, transparency: 0.92, accountability: 0.96, privacy: 0.99, safety: 0.97, dmaicPhase: 'Control'
  });
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [proposals, setProposals] = useState<ConsensusProposal[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [proactiveAdvice, setProactiveAdvice] = useState<any>(null);
  const [globalSentiment, setGlobalSentiment] = useState(1); // 1 is healthy, -1 is critical
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'system',
      text: "Greetings. I am Daedalus, your Quantum Coordinator. I am now tuned to your emotional cadence. How shall we evolve the platform today?",
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    setNodes(generateNodes(12));
  }, []);

  useEffect(() => {
    if (view === ViewState.LANDING || view === ViewState.LOADING) return;
    const interval = setInterval(() => {
      const newCoherence = Math.max(0.8, Math.min(1.0, metrics.coherence + (Math.random() - 0.5) * 0.02));
      setMetrics(prev => ({
        ...prev,
        coherence: newCoherence,
        pasScore: Math.max(0.7, Math.min(1.0, prev.pasScore + (Math.random() - 0.5) * 0.01)),
      }));
      updateSonification(newCoherence, 0.5);
    }, 4000);
    return () => clearInterval(interval);
  }, [view, metrics.coherence]);

  useEffect(() => {
    if (view === ViewState.LANDING || view === ViewState.LOADING) return;
    const proactiveInterval = setInterval(async () => {
      try {
        const advice = await getProactiveAdvice(metrics);
        if (advice && advice.alert && advice.alert.trim().length > 0) {
          setProactiveAdvice(advice);
          addLog('Forecaster', `PROACTIVE ALERT: ${advice.alert}`, advice.priority === 'HIGH' ? 'warning' : 'info');
        }
      } catch (e) {
        console.error("Proactive advice fetch failed", e);
      }
    }, 45000);
    return () => clearInterval(proactiveInterval);
  }, [view, metrics]);

  const addLog = (source: SystemLog['source'], message: string, type: SystemLog['type'] = 'info') => {
    setLogs(prev => [{ id: Math.random().toString(36), timestamp: new Date(), source, message, type }, ...prev].slice(0, 50));
  };

  const handleDaedalusChat = async (message: string, context?: any) => {
    addLog('User', `Command: "${message}"`, 'info');
    
    // Add user message to history
    const userMsg: Message = {
      id: Math.random().toString(36),
      sender: 'user',
      text: message,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMsg]);

    if (isApiKeySet()) {
      const result = await processDaedalusCommand(message, context);
      if (result && result.rawText) {
        // Extract basic metrics for UI health from raw text if possible
        const deltaMatch = result.rawText.match(/<delta_check>([\s\S]*?)<\/delta_check>/);
        const fasMatch = result.rawText.match(/<fas_score>([\s\S]*?)<\/fas_score>/);
        
        if (deltaMatch) {
          const check = deltaMatch[1].trim();
          if (check === 'CRITICAL') setGlobalSentiment(-0.5);
          else if (check === 'DRIFTING') setGlobalSentiment(0.2);
          else setGlobalSentiment(1);
        }

        const systemMsg: Message = {
          id: Math.random().toString(36),
          sender: 'system',
          text: result.rawText, // Passing rawText to ChatInterface for parsing tags
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, systemMsg]);

        // Audio synthesis disabled - using open-source models
        return result;
      }
    }
    
    const fallbackMsg: Message = {
      id: Math.random().toString(36),
      sender: 'system',
      text: "Consensus protocol initiated. Resource nodes re-syncing.",
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, fallbackMsg]);
    return { response: fallbackMsg.text };
  };


  const toggleAudio = () => {
      if (isAudioMuted) { initAudio(); setIsAudioMuted(false); toggleMute(false); }
      else { setIsAudioMuted(true); toggleMute(true); }
  };

  const themeColor = globalSentiment > 0.5 ? 'rgba(0, 242, 255, 0.1)' : globalSentiment < -0.2 ? 'rgba(244, 63, 94, 0.15)' : 'rgba(139, 92, 246, 0.1)';

  if (view === ViewState.LANDING) return <LandingPage onStart={() => setView(ViewState.LOADING)} />;
  if (view === ViewState.LOADING) return <LoadingScreen onComplete={() => setView(ViewState.DASHBOARD)} />;

  return (
    <div className={`flex h-screen bg-neur-bg text-neur-text font-sans overflow-hidden select-none transition-colors duration-1000`} style={{ background: `radial-gradient(circle at center, ${themeColor} 0%, #020410 100%)` }}>
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 glass-panel border-r border-neur-cyan/20 flex-col z-30">
        <div className="p-8 h-20 flex items-center space-x-4 border-b border-white/5">
          <LogoIcon className="w-10 h-10" />
          <div className="flex flex-col">
            <span className="font-black tracking-[0.3em] text-lg text-glow leading-none">NEUR1GENESIS</span>
            <span className="text-[9px] text-neur-cyan tracking-[0.5em] mt-1 font-bold">FORGENODE v2.0</span>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          <NavItem icon={<LayoutDashboard size={18} />} label="DASHBOARD" active={view === ViewState.DASHBOARD} onClick={() => setView(ViewState.DASHBOARD)} />
          <NavItem icon={<MessageSquare size={18} />} label="DAEDALUS AI" active={view === ViewState.CHAT} onClick={() => setView(ViewState.CHAT)} />
          <NavItem icon={<TrendingUp size={18} />} label="SCENARIO HUB" active={view === ViewState.SCENARIO_PLANNER} onClick={() => setView(ViewState.SCENARIO_PLANNER)} />
          
          <div className="pt-6 pb-2 pl-4 text-[9px] text-neur-subtext font-black tracking-[0.4em] uppercase opacity-40">Intelligence</div>
          <NavItem icon={<Award size={18} />} label="EVOLUTION" active={view === ViewState.EVOLUTION_TREE} onClick={() => setView(ViewState.EVOLUTION_TREE)} />
          <NavItem icon={<GitBranch size={18} />} label="TASK SWARM" active={view === ViewState.TASK_SWARM} onClick={() => setView(ViewState.TASK_SWARM)} />
          <NavItem icon={<Camera size={18} />} label="VISION UPLINK" active={view === ViewState.VISION_UPLINK} onClick={() => setView(ViewState.VISION_UPLINK)} />
          
          <div className="pt-6 pb-2 pl-4 text-[9px] text-neur-subtext font-black tracking-[0.4em] uppercase opacity-40">System Core</div>
          <NavItem icon={<Atom size={18} />} label="QUANTUM LAB" active={view === ViewState.QUANTUM_LAB} onClick={() => setView(ViewState.QUANTUM_LAB)} />
          <NavItem icon={<Users size={18} />} label="ECHONODES" active={view === ViewState.ECHONODE_MANAGER} onClick={() => setView(ViewState.ECHONODE_MANAGER)} />
          <NavItem icon={<ShieldCheck size={18} />} label="Σ-MATRIX" active={view === ViewState.ETHICS_DASHBOARD} onClick={() => setView(ViewState.ETHICS_DASHBOARD)} />
          <NavItem icon={<Flame size={18} />} label="STRESS LAB" active={view === ViewState.STRESS_TEST} onClick={() => setView(ViewState.STRESS_TEST)} />
          <NavItem icon={<Code size={18} />} label="INFINIGEN" active={view === ViewState.INFINIGEN} onClick={() => setView(ViewState.INFINIGEN)} />
          <NavItem icon={<Brain size={18} />} label="MINDSPACE" active={view === ViewState.MINDSPACE} onClick={() => setView(ViewState.MINDSPACE)} />
          <NavItem icon={<ShieldAlert size={18} />} label="SENTINEL" active={view === ViewState.SENTINEL} onClick={() => setView(ViewState.SENTINEL)} />
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={() => setView(ViewState.LANDING)} className="flex items-center space-x-4 px-6 py-4 text-neur-danger/80 hover:text-white hover:bg-neur-danger rounded-xl transition-all text-[10px] font-black tracking-[0.3em] border border-neur-danger/20">
            <LogOut size={16} />
            <span>TERMINATE</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* CRITICAL SYSTEM ALERT BANNER */}
        {proactiveAdvice && (proactiveAdvice.priority === 'HIGH' || proactiveAdvice.priority === 'CRITICAL') && (
          <div className="bg-neur-danger/30 border-b border-neur-danger/60 p-4 px-8 flex flex-col md:flex-row items-center justify-between z-30 animate-in slide-in-from-top-full duration-500 shadow-[0_10px_30px_rgba(244,63,94,0.2)]">
            <div className="flex items-center space-x-5 text-neur-danger mb-4 md:mb-0">
              <div className="p-3 bg-neur-danger/20 rounded-2xl animate-pulse">
                <ShieldAlert size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-70 leading-tight">Critical System Advisory</span>
                <span className="text-sm font-black tracking-widest uppercase text-white">{proactiveAdvice.alert}</span>
                {proactiveAdvice.suggestedAction && (
                  <span className="text-[10px] text-neur-danger font-bold mt-1 uppercase tracking-wider italic">Action Required: {proactiveAdvice.suggestedAction}</span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => { setView(ViewState.SCENARIO_PLANNER); setProactiveAdvice(null); }}
                className="bg-neur-danger text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(244,63,94,0.6)] flex items-center group"
              >
                <span>Initialize Mitigation</span>
                <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setProactiveAdvice(null)} className="text-white/40 hover:text-white transition-colors p-2">
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        <header className="h-16 md:h-20 border-b border-neur-cyan/10 glass-panel flex items-center justify-between px-6 z-20">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden p-2 text-neur-cyan" onClick={() => setMobileMenuOpen(true)}><Menu size={24} /></button>
            <div className="hidden lg:flex items-center text-[10px] font-mono text-neur-subtext space-x-8 tracking-widest uppercase">
              <span className="flex items-center"><div className={`w-2 h-2 rounded-full mr-2 shadow-[0_0_10px_currentColor] animate-pulse ${globalSentiment < -0.2 ? 'text-neur-danger bg-neur-danger' : 'text-neur-cyan bg-neur-cyan'}`}></div> UPLINK: {globalSentiment < -0.2 ? 'CRITICAL' : 'STABLE'}</span>
              <span className="flex items-center opacity-60"><Cpu size={14} className="mr-2"/> 8-Q CORE</span>
              <span className="flex items-center opacity-60"><Activity size={14} className="mr-2"/> PAS: {(metrics.pasScore * 100).toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             {proactiveAdvice && (
               <button 
                onClick={() => setView(ViewState.SCENARIO_PLANNER)} 
                className={`hidden md:flex items-center space-x-2 border px-4 py-2 rounded-xl animate-pulse text-[10px] font-black uppercase transition-all
                  ${proactiveAdvice.priority === 'HIGH' ? 'bg-neur-danger/10 border-neur-danger/40 text-neur-danger' : 'bg-neur-cyan/10 border-neur-cyan/40 text-neur-cyan'}`}
               >
                 <Bell size={14} />
                 <span>Intelligence Hub</span>
               </button>
             )}
             <button onClick={toggleAudio} className={`p-2.5 rounded-full border border-neur-cyan/30 transition-all ${!isAudioMuted ? 'bg-neur-cyan text-neur-bg shadow-[0_0_20px_#00f2ff]' : 'text-neur-subtext'}`}>{isAudioMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 lg:pb-12 relative z-10 custom-scrollbar">
          {view === ViewState.DASHBOARD && <DashboardView nodes={nodes} metrics={metrics} proposals={proposals} proactiveAdvice={proactiveAdvice} setView={setView} />}
          {view === ViewState.CHAT && <ChatInterface onSendMessage={handleDaedalusChat} initialMessages={chatMessages} />}
          {view === ViewState.SCENARIO_PLANNER && <ScenarioPlanner metrics={metrics} addLog={addLog} />}
          {view === ViewState.EVOLUTION_TREE && <EvolutionTree node={nodes[0]} />}
          {view === ViewState.STRESS_TEST && <StressTestLab onSimulate={(id) => addLog('StressLab', `Injected black-swan event: ${id}`, 'warning')} />}
          {view === ViewState.TASK_SWARM && <TaskSwarm />}
          {view === ViewState.VISION_UPLINK && <VisionUplink onInsight={(txt) => addLog('Forecaster', `Visual ground insight: ${txt}`, 'success')} />}
          {view === ViewState.QUANTUM_LAB && <QuantumCircuit />}
          {view === ViewState.ECHONODE_MANAGER && <EchoNodeManager nodes={nodes} proposals={proposals} />}
          {view === ViewState.ETHICS_DASHBOARD && <EthicsPanel metrics={metrics} />}
          {view === ViewState.INFINIGEN && <InfiniGen />}
          {view === ViewState.MINDSPACE && <MindSpace />}
          {view === ViewState.SENTINEL && <Sentinel nodes={nodes} onPurge={(id) => setNodes(n => n.map(x => x.id === id ? {...x, status: 'Idle'} : x))} />}
        </div>
      </main>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} currentView={view} setView={setView} />

      {/* PROACTIVE FORESIGHT TOAST */}
      {proactiveAdvice && proactiveAdvice.priority !== 'HIGH' && proactiveAdvice.priority !== 'CRITICAL' && (
        <div className="fixed bottom-24 right-4 z-50 animate-in slide-in-from-right-10 duration-500">
          <div className="glass-panel border-neur-cyan/40 p-6 rounded-3xl w-80 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group border-l-4 border-l-neur-cyan">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center text-[10px] font-black text-neur-cyan tracking-[0.3em] uppercase">
                <Zap size={14} className="mr-2 animate-pulse" /> AI Forecast
              </div>
              <button onClick={() => setProactiveAdvice(null)} className="text-neur-subtext hover:text-white transition-colors p-1">
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-white mb-5 leading-relaxed font-bold tracking-wide uppercase">{proactiveAdvice.alert}</p>
            <button 
              onClick={() => { setView(ViewState.SCENARIO_PLANNER); setProactiveAdvice(null); }}
              className="w-full py-3.5 bg-neur-cyan/10 border border-neur-cyan/40 rounded-2xl text-[10px] font-black text-neur-cyan tracking-[0.2em] uppercase hover:bg-neur-cyan hover:text-neur-bg transition-all active:scale-95 shadow-[0_0_15px_rgba(0,242,255,0.1)] flex items-center justify-center space-x-2"
            >
              <span>Explore Potential Futures</span>
              <TrendingUp size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center space-x-4 px-5 py-3 rounded-xl transition-all border ${active ? 'bg-neur-cyan/10 text-neur-cyan border-neur-cyan/30 shadow-[0_0_20px_rgba(0,242,255,0.1)]' : 'text-neur-subtext border-transparent hover:text-white hover:bg-white/5'}`}>
    <span className={`${active ? 'scale-110 drop-shadow-[0_0_10px_#00f2ff]' : ''}`}>{icon}</span>
    <span className="font-bold text-[10px] tracking-[0.2em]">{label}</span>
  </button>
);

const MobileMenu: React.FC<{ isOpen: boolean, onClose: () => void, currentView: ViewState, setView: (v: ViewState) => void }> = ({ isOpen, onClose, currentView, setView }) => (
  <>
    {isOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden" onClick={onClose}></div>}
    <aside className={`fixed inset-y-0 right-0 w-80 glass-panel border-l border-neur-cyan/30 z-50 transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <span className="font-black tracking-[0.4em] text-neur-cyan text-sm">MATRIX</span>
        <button onClick={onClose} className="p-2 text-neur-subtext"><X size={24} /></button>
      </div>
      <div className="p-6 space-y-2 overflow-y-auto h-full custom-scrollbar">
        {[
          { v: ViewState.DASHBOARD, l: 'Dashboard', i: <LayoutDashboard size={20}/> },
          { v: ViewState.CHAT, l: 'Daedalus AI', i: <MessageSquare size={20}/> },
          { v: ViewState.EVOLUTION_TREE, l: 'Evolution', i: <Award size={20}/> },
          { v: ViewState.VISION_UPLINK, l: 'Vision Uplink', i: <Camera size={20}/> },
          { v: ViewState.TASK_SWARM, l: 'Task Swarm', i: <GitBranch size={20}/> },
          { v: ViewState.STRESS_TEST, l: 'Stress Lab', i: <Flame size={20}/> }
        ].map(item => (
          <NavItem key={item.v} icon={item.i} label={item.l.toUpperCase()} active={currentView === item.v} onClick={() => { setView(item.v); onClose(); }} />
        ))}
      </div>
    </aside>
  </>
);

const DashboardView: React.FC<{ 
  nodes: EchoNode[], 
  metrics: SigmaMetrics, 
  proposals: ConsensusProposal[],
  proactiveAdvice: any,
  setView: (v: ViewState) => void
}> = ({ nodes, metrics, proposals, proactiveAdvice, setView }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
    {/* PROACTIVE ADVICE BANNER ON DASHBOARD */}
    {proactiveAdvice && (
      <div className="col-span-1 md:col-span-12">
        <div 
          onClick={() => setView(ViewState.SCENARIO_PLANNER)}
          className={`group cursor-pointer rounded-3xl border p-8 flex flex-col md:flex-row items-center justify-between transition-all duration-300 relative overflow-hidden shadow-2xl
            ${proactiveAdvice.priority === 'HIGH' ? 'bg-neur-danger/10 border-neur-danger/40 hover:bg-neur-danger/20' : 'bg-neur-cyan/5 border-neur-cyan/30 hover:bg-neur-cyan/10'}`}
        >
          <div className="flex items-center space-x-6 mb-6 md:mb-0 z-10">
            <div className={`p-5 rounded-3xl ${proactiveAdvice.priority === 'HIGH' ? 'bg-neur-danger text-white' : 'bg-neur-cyan text-neur-bg'} shadow-[0_0_30px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-500`}>
              {proactiveAdvice.priority === 'HIGH' ? <AlertTriangle size={32} /> : <Zap size={32} />}
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className={`text-[11px] font-black uppercase tracking-[0.4em] ${proactiveAdvice.priority === 'HIGH' ? 'text-neur-danger' : 'text-neur-cyan'}`}>
                  {proactiveAdvice.priority || 'System'} Advisory
                </span>
                <div className={`w-2 h-2 rounded-full animate-ping ${proactiveAdvice.priority === 'HIGH' ? 'bg-neur-danger' : 'bg-neur-cyan'}`}></div>
              </div>
              <h3 className="text-xl font-black text-white tracking-[0.2em] uppercase leading-tight max-w-2xl">{proactiveAdvice.alert}</h3>
              {proactiveAdvice.suggestedAction && (
                <p className="text-xs text-neur-subtext mt-2 font-medium tracking-wide">Suggested: {proactiveAdvice.suggestedAction}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4 z-10">
             <div className="text-right hidden sm:block">
               <span className="text-[10px] text-neur-subtext uppercase font-black tracking-[0.3em] block mb-1">Invoke Sequence</span>
               <span className="text-[11px] text-white font-bold tracking-widest uppercase">Scenario Horizon</span>
             </div>
             <div className={`p-4 rounded-2xl border ${proactiveAdvice.priority === 'HIGH' ? 'border-neur-danger/40 text-neur-danger' : 'border-neur-cyan/40 text-neur-cyan'} group-hover:bg-current group-hover:text-neur-bg transition-all duration-300`}>
               <TrendingUp size={24} />
             </div>
          </div>
          {/* Subtle animated background gradient pulse */}
          <div className={`absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-[100px] opacity-10 group-hover:opacity-25 transition-opacity duration-700 ${proactiveAdvice.priority === 'HIGH' ? 'bg-neur-danger' : 'bg-neur-cyan'}`}></div>
        </div>
      </div>
    )}

    <div className="col-span-1 md:col-span-8 bg-neur-card rounded-3xl border border-neur-cyan/20 p-6 flex flex-col h-[450px] lg:h-[550px] relative shadow-2xl overflow-hidden group">
      <div className="flex justify-between items-center mb-6 z-10">
        <h2 className="text-xs font-black flex items-center tracking-[0.4em] text-glow uppercase text-neur-cyan"><Network className="mr-3" size={18}/> Topology</h2>
        <div className="text-[10px] text-neur-cyan font-mono tracking-widest px-4 py-2 bg-neur-cyan/10 rounded-xl border border-neur-cyan/20">LATTICE: STABLE</div>
      </div>
      <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/5"><NetworkGraph nodes={nodes} /></div>
    </div>
    <div className="col-span-1 md:col-span-4 space-y-6 flex flex-col h-full">
      <div className="bg-neur-card rounded-3xl border border-neur-cyan/20 p-6 flex-1 flex flex-col items-center justify-center shadow-xl"><EthicalCompass metrics={metrics} /></div>
      <div className="bg-neur-card rounded-3xl border border-neur-cyan/20 p-0 overflow-hidden flex-1 shadow-xl"><ConsensusMonitor proposals={proposals} /></div>
    </div>
  </div>
);

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative ${className} group`}>
    <div className="absolute inset-0 bg-neur-cyan rounded-xl opacity-30 blur-lg"></div>
    <div className="relative w-full h-full rounded-xl border-2 border-neur-cyan flex items-center justify-center bg-neur-bg"><Zap size={20} className="text-neur-cyan drop-shadow-[0_0_5px_#00f2ff]" /></div>
  </div>
);

const EchoNodeManager: React.FC<{ nodes: EchoNode[], proposals: ConsensusProposal[] }> = ({ nodes, proposals }) => {
  const activeProposal = proposals.find(p => p.status === 'VOTING') || null;
  return (
    <div className="space-y-8 pb-12">
        <div className="w-full h-[400px] md:h-[500px] bg-neur-card rounded-3xl border border-neur-cyan/20 overflow-hidden relative shadow-2xl">
             <div className="absolute top-6 left-6 z-10 flex items-center space-x-4 glass-panel px-6 py-3 rounded-2xl border border-neur-cyan/40">
                <GitMerge size={20} className="text-neur-cyan" /><h2 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Lattice Visualizer</h2>
             </div>
             <CollaborationVisualizer nodes={nodes} activeProposal={activeProposal} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nodes.map(node => (
            <div key={node.id} className="bg-neur-card border border-neur-cyan/10 p-6 rounded-3xl hover:border-neur-cyan/50 transition-all cursor-pointer relative overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl border-2 border-neur-cyan/30 flex items-center justify-center text-[11px] font-black text-neur-cyan group-hover:bg-neur-cyan group-hover:text-neur-bg transition-all">{node.role.slice(0, 2).toUpperCase()}</div>
                    <div className={`text-[10px] font-mono ${node.status === 'Processing' ? 'text-neur-cyan' : 'text-neur-subtext'}`}>{node.status.toUpperCase()}</div>
                </div>
                <div className="font-black text-sm mb-1 tracking-[0.2em] text-white">{node.name}</div>
                <div className="text-[10px] text-neur-subtext uppercase tracking-widest font-bold">LVL {node.level} {node.role} UNIT</div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default App;
