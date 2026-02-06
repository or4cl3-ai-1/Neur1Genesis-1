import React, { useState, useEffect } from 'react';
import { ViewState, EchoNode, SigmaMetrics, SystemLog, ConsensusProposal, Vote, ToolUsePlan, FeedbackRecord, AffectiveState, OrchestrationRequest } from './types';
import {
  LayoutDashboard,
  Atom,
  Users,
  ShieldCheck,
  Cpu,
  Bell,
  Menu,
  MessageSquare,
  X,
  LogOut,
  GitMerge,
  Code,
  Brain,
  ShieldAlert,
  Mic,
  Volume2,
  VolumeX,
  Zap,
  Wand2
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
import DaedalusOrchestrator from './components/DaedalusOrchestrator';
import { processDaedalusCommand, isApiKeySet } from './services/geminiService';
import { initAudio, toggleMute, updateSonification } from './services/audioService';
import { daedalusCore } from './services/daedalusCore';

// Mock Data Generators
const generateNodes = (count: number): EchoNode[] => {
  const roles: EchoNode['role'][] = ['Generalist', 'Ethical', 'Security', 'Creative', 'Coordinator'];
  return Array.from({ length: count }).map((_, i) => ({
    id: `node-${i}`,
    name: `EchoNode-${Math.floor(Math.random() * 9000) + 1000}`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: Math.random() > 0.8 ? 'Processing' : Math.random() > 0.9 ? 'Offline' : 'Idle',
    trustScore: 0.7 + Math.random() * 0.3,
    cpuUsage: Math.floor(Math.random() * 60) + 10,
    tasksCompleted: Math.floor(Math.random() * 500)
  }));
};

const POSSIBLE_PROPOSALS = [
    { topic: "Resource Reallocation", desc: "Shift computation to Sector 7 for anomaly analysis." },
    { topic: "Containment Protocol", desc: "Isolate Node-84 due to ethical drift variance > 0.05." },
    { topic: "Knowledge Sync", desc: "Initiate global update of Shared Belief Model v4.2." },
    { topic: "Entropy Reduction", desc: "Active cooling of quantum states to improve fidelity." },
    { topic: "Heuristic Upgrade", desc: "Deploy new search algorithm to Creative nodes." }
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [nodes, setNodes] = useState<EchoNode[]>([]);
  const [metrics, setMetrics] = useState<SigmaMetrics>({
    coherence: 0.98,
    pasScore: 0.94,
    fairness: 0.95,
    transparency: 0.92,
    accountability: 0.96,
    privacy: 0.99,
    safety: 0.97,
    dmaicPhase: 'Control'
  });
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [proposals, setProposals] = useState<ConsensusProposal[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isListening, setIsListening] = useState(false);

  // CHATRON 9.0: Daedalus Nexus State
  const [currentPlan, setCurrentPlan] = useState<ToolUsePlan | null>(null);
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackRecord[]>([]);
  const [affectiveState, setAffectiveState] = useState<AffectiveState>({
    valence: 0.7,
    arousal: 0.6,
    engagement: 0.75,
    satisfaction: 0.8,
    trust: 0.85,
  });

  // Initialize
  useEffect(() => {
    setNodes(generateNodes(12));
  }, []);

  // Main Simulation Loop
  useEffect(() => {
    if (view === ViewState.LANDING || view === ViewState.LOADING) return;

    const interval = setInterval(() => {
      // Metric Fluctuation
      const newCoherence = Math.max(0.8, Math.min(1.0, metrics.coherence + (Math.random() - 0.5) * 0.02));
      setMetrics(prev => ({
        ...prev,
        coherence: newCoherence,
        pasScore: Math.max(0.7, Math.min(1.0, prev.pasScore + (Math.random() - 0.5) * 0.01)),
        dmaicPhase: Math.random() > 0.8 ? 
           (['Define', 'Measure', 'Analyze', 'Improve', 'Control'][Math.floor(Math.random()*5)] as any) 
           : prev.dmaicPhase
      }));
      
      // Node Updates + Random Corruption for Sentinel
      setNodes(prev => prev.map(n => {
         if (n.status === 'Corrupted') return n; // Stay corrupted until purged
         // Small chance to corrupt
         if (Math.random() > 0.995) return { ...n, status: 'Corrupted' };
         return Math.random() > 0.9 ? { ...n, cpuUsage: Math.floor(Math.random() * 100), status: Math.random() > 0.5 ? 'Processing' : 'Idle' } : n;
      }));
      
      // Audio update
      updateSonification(newCoherence, 0.5);

    }, 3000);
    return () => clearInterval(interval);
  }, [view, metrics.coherence]);

  // Consensus Loop
  useEffect(() => {
    if (view === ViewState.LANDING || view === ViewState.LOADING) return;

    const interval = setInterval(() => {
        // Create proposals
        if (Math.random() > 0.7) {
            const proposer = nodes[Math.floor(Math.random() * nodes.length)];
            if (proposer && proposer.status !== 'Offline') {
                const template = POSSIBLE_PROPOSALS[Math.floor(Math.random() * POSSIBLE_PROPOSALS.length)];
                const newProp: ConsensusProposal = {
                    id: Math.random().toString(36).substr(2, 9),
                    proposerId: proposer.id,
                    proposerName: proposer.name,
                    topic: template.topic,
                    description: template.desc,
                    status: 'VOTING',
                    votes: [],
                    startTime: new Date()
                };
                setProposals(prev => [newProp, ...prev].slice(0, 10));
                addLog('Consensus', `${proposer.name} proposed: ${newProp.topic}`, 'info');
            }
        }
        // Process Votes
        setProposals(prev => prev.map(prop => {
            if (prop.status !== 'VOTING') return prop;
            const unvotedNodes = nodes.filter(n => n.id !== prop.proposerId && n.status !== 'Offline' && !prop.votes.find(v => v.nodeId === n.id));
            if (unvotedNodes.length > 0) {
                const voters = unvotedNodes.slice(0, Math.floor(Math.random() * 3) + 1);
                const newVotes: Vote[] = voters.map(n => ({
                    nodeId: n.id,
                    nodeName: n.name,
                    vote: (n.trustScore < 0.6 ? Math.random() > 0.5 : Math.random() > 0.2) ? 'YES' : 'NO',
                    weight: n.trustScore,
                    timestamp: new Date()
                }));
                return { ...prop, votes: [...prop.votes, ...newVotes] };
            }
            const allVoted = nodes.filter(n => n.status !== 'Offline').length <= prop.votes.length + 1;
            const timeElapsed = new Date().getTime() - prop.startTime.getTime();
            if (allVoted || timeElapsed > 8000) {
                const totalWeight = prop.votes.reduce((acc, v) => acc + v.weight, 0);
                const yesWeight = prop.votes.filter(v => v.vote === 'YES').reduce((acc, v) => acc + v.weight, 0);
                const passed = totalWeight > 0 && (yesWeight / totalWeight) > 0.66;
                if (passed) addLog('Consensus', `Proposal "${prop.topic}" PASSED`, 'success');
                else addLog('Consensus', `Proposal "${prop.topic}" REJECTED`, 'warning');
                return { ...prop, status: passed ? 'ACCEPTED' : 'REJECTED', endTime: new Date() };
            }
            return prop;
        }));
    }, 2000);
    return () => clearInterval(interval);
  }, [nodes, view]);

  const addLog = (source: SystemLog['source'], message: string, type: SystemLog['type'] = 'info') => {
    setLogs(prev => [{
      id: Math.random().toString(36),
      timestamp: new Date(),
      source,
      message,
      type
    }, ...prev].slice(0, 50));
  };

  const handleDaedalusPlan = async (userIntent: string): Promise<string | null> => {
    try {
      // Create orchestration request
      const request: OrchestrationRequest = {
        id: `request-${Date.now()}`,
        userIntent,
        projectContext: 'Neur1Genesis Platform • EchoNode Network • Distributed Consensus',
        affectiveState,
        temporalEmbedding: [],
        ethicalConstraints: daedalusCore.getEthicalConstraints(),
        timestamp: new Date(),
      };

      // Execute planning cycle
      const plan = await daedalusCore.plan(request);
      setCurrentPlan(plan);
      addLog('Daedalus', `Planning cycle initiated for: "${userIntent}"`, 'info');

      // Execute the plan
      const result = await daedalusCore.executePlan(plan);
      addLog('Daedalus', `Plan executed successfully`, 'success');

      // Simulate feedback collection
      const postAffectiveState: AffectiveState = {
        valence: Math.min(1, affectiveState.valence + 0.1),
        arousal: Math.max(0, affectiveState.arousal - 0.05),
        engagement: Math.min(1, affectiveState.engagement + 0.15),
        satisfaction: Math.min(1, affectiveState.satisfaction + 0.1),
        trust: Math.min(1, affectiveState.trust + 0.05),
      };

      // Process feedback
      const feedback = daedalusCore.processFeedback(
        plan.id,
        affectiveState,
        postAffectiveState,
        {
          success: true,
          executionTime: 250,
          resourcesUsed: 42,
          errorCount: 0,
        }
      );

      setFeedbackHistory(prev => [...prev, feedback]);
      setAffectiveState(postAffectiveState);
      addLog('ANAL', `Feedback processed • Satisfaction: ${(feedback.affectiveDelta.satisfaction * 100).toFixed(0)}%`, 'info');

      return result;
    } catch (error) {
      addLog('Daedalus', `Planning error: ${error}`, 'error');
      return null;
    }
  };

  const handleDaedalusChat = async (message: string): Promise<string | null> => {
    addLog('User', `Command: "${message}"`, 'info');

    // Route through Daedalus planning cycle
    const daedalusResult = await handleDaedalusPlan(message);
    if (daedalusResult) {
      return daedalusResult;
    }

    // Fallback to gemini service
    if (isApiKeySet()) {
      const result = await processDaedalusCommand(message);
      if (result) {
        if (result.action === 'create_node') {
            const newNode: EchoNode = {
                id: `node-${nodes.length}`,
                name: `EchoNode-${Math.floor(Math.random()*9000)+1000}`,
                role: (result.role as any) || 'Generalist',
                status: 'Learning',
                trustScore: 0.5,
                cpuUsage: 10,
                tasksCompleted: 0
            };
            setNodes(prev => [...prev, newNode]);
            addLog('System', `Created new ${newNode.role} node`, 'success');
            return result.response || `Acknowledged. Created new ${newNode.role} node.`;
        }
        return result.response || "Task executed successfully.";
      }
    } else {
        await new Promise(r => setTimeout(r, 1000));
        return "Command received. Simulation mode active (No API Key).";
    }
    return null;
  };

  const handleVoiceCommand = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("Voice not supported in this browser");
        return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript;
        handleDaedalusChat(command);
    };
    recognition.start();
  };

  const handlePurgeNode = (nodeId: string) => {
      setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'Idle', trustScore: 0.5 } : n));
      addLog('Sentinel', `Threat purged from Node ${nodeId}. Reset complete.`, 'success');
  };

  const toggleAudio = () => {
      if (isAudioMuted) {
          initAudio(); // Ensure context starts on user interaction
          setIsAudioMuted(false);
          toggleMute(false);
      } else {
          setIsAudioMuted(true);
          toggleMute(true);
      }
  };

  // ---------------- VIEW RENDERING ----------------

  if (view === ViewState.LANDING) {
    return <LandingPage onStart={() => setView(ViewState.LOADING)} />;
  }

  if (view === ViewState.LOADING) {
    return <LoadingScreen onComplete={() => {
        setView(ViewState.DASHBOARD);
        addLog('System', 'Neur1Genesis initialized. HQCI Engine Online.', 'success');
    }} />;
  }

  // ---------------- MAIN APP LAYOUT ----------------

  return (
    <div className="flex h-screen bg-neur-bg text-white font-sans overflow-hidden">
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-neur-bg/90 backdrop-blur border-b border-white/5 z-50 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-neur-cyan to-neur-purple flex items-center justify-center font-bold text-neur-bg">N1</div>
            <span className="font-bold tracking-wider">NEUR1GENESIS</span>
        </div>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-white">
            <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#05081a] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        <div className="p-6 flex items-center justify-between border-b border-white/5 h-16">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded bg-gradient-to-br from-neur-cyan to-neur-purple flex items-center justify-center font-bold text-neur-bg">N1</div>
             <span className="font-mono font-bold tracking-wider text-lg lg:block hidden">NEUR<span className="text-neur-cyan">1</span>GENESIS</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-neur-subtext">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={view === ViewState.DASHBOARD} onClick={() => { setView(ViewState.DASHBOARD); setMobileMenuOpen(false); }} />
          <SidebarItem icon={<MessageSquare size={20} />} label="Daedalus Chat" active={view === ViewState.CHAT} onClick={() => { setView(ViewState.CHAT); setMobileMenuOpen(false); }} />
          <SidebarItem icon={<Atom size={20} />} label="Quantum Lab" active={view === ViewState.QUANTUM_LAB} onClick={() => { setView(ViewState.QUANTUM_LAB); setMobileMenuOpen(false); }} />
          <SidebarItem icon={<Users size={20} />} label="EchoNodes" active={view === ViewState.ECHONODE_MANAGER} onClick={() => { setView(ViewState.ECHONODE_MANAGER); setMobileMenuOpen(false); }} />
          <div className="pt-4 pb-2 pl-2 text-xs text-neur-subtext font-bold tracking-widest">ORCHESTRATION CORE</div>
          <SidebarItem icon={<Wand2 size={20} />} label="Daedalus Nexus" active={view === ViewState.DAEDALUS_ORCHESTRATOR} onClick={() => { setView(ViewState.DAEDALUS_ORCHESTRATOR); setMobileMenuOpen(false); }} />
          <div className="pt-4 pb-2 pl-2 text-xs text-neur-subtext font-bold tracking-widest">ADVANCED MODULES</div>
          <SidebarItem icon={<ShieldCheck size={20} />} label="Ethics (Σ-Matrix)" active={view === ViewState.ETHICS_DASHBOARD} onClick={() => { setView(ViewState.ETHICS_DASHBOARD); setMobileMenuOpen(false); }} />
          <SidebarItem icon={<Code size={20} />} label="InfiniGen" active={view === ViewState.INFINIGEN} onClick={() => { setView(ViewState.INFINIGEN); setMobileMenuOpen(false); }} />
          <SidebarItem icon={<Brain size={20} />} label="MindSpace" active={view === ViewState.MINDSPACE} onClick={() => { setView(ViewState.MINDSPACE); setMobileMenuOpen(false); }} />
          <SidebarItem icon={<ShieldAlert size={20} />} label="Sentinel" active={view === ViewState.SENTINEL} onClick={() => { setView(ViewState.SENTINEL); setMobileMenuOpen(false); }} />
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={() => setView(ViewState.LANDING)} className="flex items-center space-x-3 px-4 py-3 text-neur-danger hover:bg-white/5 w-full rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium text-sm">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Overlay for Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden pt-16 lg:pt-0">
        
        {/* Desktop Header */}
        <header className="hidden lg:flex h-16 border-b border-white/5 bg-neur-bg/50 backdrop-blur-sm items-center justify-between px-6 z-10">
          <div className="flex items-center text-sm text-neur-subtext space-x-4">
            <span className="flex items-center"><Cpu size={14} className="mr-1"/> 8 Qubits Active</span>
            <span className="w-px h-3 bg-white/10"></span>
            <span className="flex items-center text-green-400"><div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div> System Nominal</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
                onClick={handleVoiceCommand}
                className={`p-2 rounded-full border border-white/10 transition-colors ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'text-neur-subtext hover:text-white'}`}
                title="Voice Command"
            >
                <Mic size={20} />
            </button>
            <button 
                onClick={toggleAudio}
                className={`p-2 rounded-full border border-white/10 transition-colors ${!isAudioMuted ? 'text-neur-cyan bg-neur-cyan/10' : 'text-neur-subtext hover:text-white'}`}
                title="Quantum Sonification"
            >
                {isAudioMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <div className="w-px h-6 bg-white/10"></div>
            <button className="p-2 text-neur-subtext hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-neur-danger rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-neur-card border border-white/10 flex items-center justify-center text-xs font-mono">OP</div>
          </div>
        </header>

        {/* View Switcher */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth relative">
          {view === ViewState.DASHBOARD && <DashboardView nodes={nodes} metrics={metrics} proposals={proposals} />}
          {view === ViewState.CHAT && <ChatInterface onSendMessage={handleDaedalusChat} logs={logs} />}
          {view === ViewState.QUANTUM_LAB && <QuantumCircuit />}
          {view === ViewState.ECHONODE_MANAGER && <EchoNodeManager nodes={nodes} proposals={proposals} />}
          {view === ViewState.ETHICS_DASHBOARD && <EthicsPanel metrics={metrics} />}
          {view === ViewState.INFINIGEN && <InfiniGen />}
          {view === ViewState.MINDSPACE && <MindSpace />}
          {view === ViewState.SENTINEL && <Sentinel nodes={nodes} onPurge={handlePurgeNode} />}
        </div>

      </main>
    </div>
  );
};

// --- Subcomponents ---

const SidebarItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 
      ${active ? 'bg-neur-card text-white shadow-[0_0_15px_rgba(0,217,255,0.1)] border border-white/5' : 'text-neur-subtext hover:bg-white/5 hover:text-white'}`}
  >
    <span className={active ? 'text-neur-cyan' : ''}>{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const DashboardView: React.FC<{ nodes: EchoNode[], metrics: SigmaMetrics, proposals: ConsensusProposal[] }> = ({ nodes, metrics, proposals }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full pb-20 lg:pb-0">
    {/* Network Graph */}
    <div className="col-span-1 md:col-span-8 bg-neur-card/30 rounded-xl border border-white/5 p-4 flex flex-col h-[400px] md:h-[500px] relative">
      <h2 className="text-lg font-bold mb-4 flex items-center"><Atom className="mr-2 text-neur-cyan"/> Live Topology</h2>
      <NetworkGraph nodes={nodes} />
      <div className="absolute bottom-6 left-6 text-xs text-neur-subtext font-mono">
        NODES: {nodes.length} | ACTIVE LINKS: {nodes.length * 2} | LATENCY: 42ms
      </div>
    </div>

    {/* Right Column Stats */}
    <div className="col-span-1 md:col-span-4 space-y-6 flex flex-col">
      <div className="bg-neur-card rounded-xl border border-white/5 p-4 relative overflow-hidden flex-1 min-h-[250px]">
        <EthicalCompass metrics={metrics} />
      </div>
      <div className="bg-neur-card rounded-xl border border-white/5 p-0 relative overflow-hidden flex-1 min-h-[200px]">
        <ConsensusMonitor proposals={proposals} />
      </div>
    </div>
    
    {/* Bottom metrics row */}
    <div className="col-span-1 md:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard label="Quantum Fidelity" value="99.4%" trend="+0.1%" trendUp={true} />
      <MetricCard label="Knowledge Graph" value="14.2M" sub="Entities" />
      <MetricCard label="Learning Rate" value="0.042" sub="η (Adaptive)" />
      <MetricCard label="Threat Level" value="LOW" sub="Sigma-Matrix" />
    </div>
  </div>
);

const MetricCard: React.FC<{ label: string, value: string, trend?: string, trendUp?: boolean, sub?: string }> = ({ label, value, trend, trendUp, sub }) => (
  <div className="bg-neur-card border border-white/5 p-4 rounded-lg">
    <div className="text-neur-subtext text-xs uppercase mb-1">{label}</div>
    <div className="flex items-end justify-between">
      <div className="text-2xl font-bold font-mono">{value}</div>
      {trend && (
        <div className={`text-xs ${trendUp ? 'text-green-400' : 'text-red-400'}`}>{trend}</div>
      )}
      {sub && (
        <div className="text-xs text-neur-subtext">{sub}</div>
      )}
    </div>
  </div>
);

const EchoNodeManager: React.FC<{ nodes: EchoNode[], proposals: ConsensusProposal[] }> = ({ nodes, proposals }) => {
  const activeProposal = proposals.find(p => p.status === 'VOTING') || null;
  
  return (
    <div className="space-y-6 pb-20">
        {/* Visualizer Section */}
        <div className="w-full h-[350px] bg-neur-card/30 rounded-xl border border-white/5 overflow-hidden relative">
             <div className="absolute top-3 left-4 z-10 flex items-center space-x-2">
                <GitMerge size={18} className="text-neur-cyan" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Collaboration Mesh</h2>
             </div>
             <CollaborationVisualizer nodes={nodes} activeProposal={activeProposal} />
        </div>

        {/* Node Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nodes.map(node => (
            <div key={node.id} className="bg-neur-card border border-white/5 p-4 rounded-lg hover:border-neur-cyan/30 transition-colors group">
                <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold
                    ${node.status === 'Corrupted' ? 'bg-red-500 animate-pulse text-white' : 
                      node.role === 'Security' ? 'bg-red-500/20 text-red-400' : 
                        node.role === 'Ethical' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {node.role.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                    <div className="font-bold text-sm text-white group-hover:text-neur-cyan transition-colors">{node.name}</div>
                    <div className="text-xs text-neur-subtext">{node.status === 'Corrupted' ? 'THREAT DETECTED' : `${node.role} Unit`}</div>
                    </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${node.status === 'Processing' ? 'bg-neur-cyan animate-pulse' : node.status === 'Corrupted' ? 'bg-red-500 animate-ping' : 'bg-gray-600'}`}></div>
                </div>
                
                <div className="space-y-2 text-xs text-neur-subtext">
                <div className="flex justify-between">
                    <span>Trust Score</span>
                    <span className="text-white font-mono">{(node.trustScore * 100).toFixed(0)}</span>
                </div>
                <div className="w-full bg-neur-bg h-1 rounded overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${node.trustScore * 100}%` }}></div>
                </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default App;
