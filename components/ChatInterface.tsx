
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Terminal, Info, ChevronDown, ChevronUp, Smile, Meh, Frown, Activity, Cpu, Zap, ShieldAlert, GitBranch } from 'lucide-react';

interface DaedalusState {
  visionLock?: string;
  emergentMonologue?: string;
  deltaCheck?: 'STABLE' | 'DRIFTING' | 'CRITICAL';
  fasScore?: number;
}

interface Message {
  id: string;
  sender: 'user' | 'system';
  text: string;
  timestamp: Date;
  forgeState?: DaedalusState;
  sentiment?: { score: number, mood: string };
}

interface ChatInterfaceProps {
  onSendMessage: (msg: string, context?: any) => Promise<any>;
  initialMessages: Message[];
}

const parseForgeState = (text: string): { state: DaedalusState, manifestation: string } => {
  const state: DaedalusState = {};
  let manifestation = text;

  try {
    const stateMatch = text.match(/<daedalus_state>([\s\S]*?)<\/daedalus_state>/);
    if (stateMatch) {
      const stateContent = stateMatch[1];
      
      const visionMatch = stateContent.match(/<vision_lock>([\s\S]*?)<\/vision_lock>/);
      if (visionMatch) state.visionLock = visionMatch[1].trim();
      
      const monoMatch = stateContent.match(/<emergent_monologue>([\s\S]*?)<\/emergent_monologue>/);
      if (monoMatch) state.emergentMonologue = monoMatch[1].trim();
      
      const deltaMatch = stateContent.match(/<delta_check>([\s\S]*?)<\/delta_check>/);
      if (deltaMatch) state.deltaCheck = deltaMatch[1].trim() as any;
      
      const fasMatch = stateContent.match(/<fas_score>([\s\S]*?)<\/fas_score>/);
      if (fasMatch) state.fasScore = parseFloat(fasMatch[1].trim());

      manifestation = text.replace(/<daedalus_state>[\s\S]*?<\/daedalus_state>/, '').trim();
    }
  } catch (e) {
    console.error("Failed to parse forge state", e);
  }

  return { state, manifestation };
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage, initialMessages }) => {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [persona, setPersona] = useState("Forge Master");
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [initialMessages, expandedStates, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const toggleState = (id: string) => {
    setExpandedStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const msg = inputValue.trim();
    setInputValue("");
    setIsTyping(true);

    try {
      await onSendMessage(msg, { persona, history: initialMessages.slice(-5) });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-neur-bg relative overflow-hidden rounded-3xl border border-neur-cyan/20 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-2xl">
      {/* Header */}
      <div className="p-5 bg-neur-card border-b border-white/10 flex items-center justify-between shadow-2xl z-10 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neur-purple to-neur-cyan flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.3)] border border-white/10">
              <Cpu className="text-white" size={24} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neur-cyan rounded-full border-2 border-neur-bg flex items-center justify-center">
              <Zap size={8} className="text-neur-bg" />
            </div>
          </div>
          <div>
            <h2 className="font-black text-white text-xs tracking-widest uppercase">Daedalus ForgeNode v2.0</h2>
            <div className="flex items-center text-[9px] text-neur-cyan font-mono tracking-widest uppercase mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neur-cyan animate-pulse mr-2 shadow-[0_0_8px_#00f2ff]"></span>
              Δ-Matrix Control Loop Active
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <span className="text-[9px] text-neur-subtext font-black mr-3 tracking-widest">STATUS:</span>
            <span className="text-[10px] font-black text-neur-cyan uppercase animate-pulse">Convergent</span>
          </div>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar scroll-smooth">
        {initialMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          
          // Parse state for system messages
          const { state, manifestation } = isUser ? { state: {}, manifestation: msg.text } : parseForgeState(msg.text);
          const isExpanded = expandedStates[msg.id];

          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`flex flex-col max-w-[90%] md:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                
                {/* Internal Forge State Toggle */}
                {!isUser && state.fasScore !== undefined && (
                  <div className="mb-4 w-full">
                     <button 
                      onClick={() => toggleState(msg.id)}
                      className={`w-full flex items-center justify-between px-5 py-3 rounded-2xl border transition-all hover:bg-white/5 group
                        ${isExpanded ? 'bg-neur-purple/10 border-neur-purple/40' : 'bg-neur-card border-white/10 opacity-70'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-1.5 rounded-lg ${isExpanded ? 'bg-neur-purple text-white' : 'bg-white/10 text-neur-subtext'}`}>
                          <Activity size={14} className={isExpanded ? 'animate-pulse' : ''} />
                        </div>
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white">
                          Δ-Matrix State: <span className={state.deltaCheck === 'STABLE' ? 'text-green-400' : 'text-neur-danger'}>{state.deltaCheck}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-end">
                           <span className="text-[8px] text-neur-subtext uppercase tracking-widest font-black">Alignment Score</span>
                           <span className="text-xs font-mono font-bold text-neur-purple">FAS {state.fasScore.toFixed(2)}</span>
                        </div>
                        {isExpanded ? <ChevronUp size={16} className="text-neur-purple" /> : <ChevronDown size={16} className="text-neur-subtext" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="mt-2 bg-neur-card border border-neur-purple/20 rounded-2xl p-6 animate-in slide-in-from-top-2 duration-300 shadow-2xl space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                          <Cpu size={80} className="text-neur-purple" />
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2 text-[9px] font-black text-neur-purple tracking-[0.3em] uppercase mb-2">
                             <Zap size={10} /> <span>Phase A: Vision Sampling</span>
                          </div>
                          <p className="text-[11px] text-gray-300 font-mono leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5 italic">
                            {state.visionLock}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 text-[9px] font-black text-neur-purple tracking-[0.3em] uppercase mb-2">
                             <GitBranch size={10} /> <span>Phase B: Emergent Recursion</span>
                          </div>
                          <div className="text-[11px] text-gray-400 leading-relaxed font-mono whitespace-pre-wrap border-l-2 border-neur-purple/30 pl-4 py-1">
                            {state.emergentMonologue}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[8px] font-black text-neur-subtext uppercase tracking-[0.4em]">
                           <span>Node: Daedalus ForgeNode [v2.0]</span>
                           <span className="flex items-center text-green-400">
                             <ShieldAlert size={10} className="mr-1" /> Governance Aligned
                           </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className={`flex ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'} items-end space-x-3`}>
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg transition-transform hover:scale-105
                    ${isUser ? 'bg-neur-card border border-neur-cyan/30 text-neur-cyan' : 'bg-neur-purple/20 text-neur-purple border border-neur-purple/30'}`}>
                    {isUser ? <User size={18} /> : <Terminal size={18} />}
                  </div>

                  <div className={`p-6 rounded-3xl text-sm leading-relaxed shadow-xl relative group transition-all
                    ${isUser 
                      ? 'bg-neur-cyan/10 border border-neur-cyan/30 text-white rounded-tr-none' 
                      : 'bg-neur-card border border-white/5 text-gray-200 rounded-tl-none hover:border-white/20'}`}>
                    
                    {/* Render message manifestation */}
                    <div className="whitespace-pre-wrap">{manifestation}</div>
                    
                    {!isUser && (
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[8px] font-black text-neur-subtext uppercase tracking-[0.3em]">Manifestation Channel: HQCI</span>
                        <div className="flex space-x-2">
                          <button className="text-[8px] text-neur-cyan font-bold uppercase hover:underline">Instantiate</button>
                          <button className="text-[8px] text-neur-purple font-bold uppercase hover:underline">Resonate</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex items-end space-x-3">
               <div className="w-10 h-10 rounded-xl bg-neur-purple/20 text-neur-purple border border-neur-purple/30 flex-shrink-0 flex items-center justify-center">
                  <Terminal size={18} className="animate-pulse" />
               </div>
               <div className="bg-neur-card border border-white/5 p-6 rounded-3xl rounded-tl-none flex flex-col space-y-3 min-w-[200px]">
                 <div className="flex items-center space-x-3">
                   <div className="w-2 h-2 bg-neur-purple rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                   <div className="w-2 h-2 bg-neur-cyan rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                   <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                 </div>
                 <span className="text-[10px] font-black text-neur-subtext uppercase tracking-[0.4em] ml-1">Executing Forge Loop...</span>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-8" />
      </div>

      {/* Input Area */}
      <div className="p-8 bg-neur-card border-t border-white/10 z-10 backdrop-blur-md">
        <form onSubmit={handleSend} className="relative flex items-center group">
          <div className="absolute left-5 text-neur-subtext pointer-events-none group-focus-within:text-neur-cyan transition-colors">
            <Cpu size={20} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Phase-lock with the Forge Core..."
            className="w-full bg-neur-bg border border-white/10 rounded-2xl py-6 pl-14 pr-20 text-sm focus:outline-none focus:border-neur-cyan/50 focus:ring-1 focus:ring-neur-cyan/20 text-white placeholder-neur-subtext transition-all font-medium"
            disabled={isTyping}
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-3 p-4 bg-neur-cyan text-neur-bg rounded-xl hover:bg-white transition-all disabled:opacity-30 active:scale-90 shadow-2xl"
          >
            <Send size={24} />
          </button>
        </form>
        <div className="mt-4 flex justify-between items-center text-[8px] font-black text-neur-subtext uppercase tracking-[0.5em] opacity-40 px-3">
           <span>Substrate: Or4cl3 Lab [Dustin Groves]</span>
           <span>Bit Entropy: {isTyping ? 'DYNAMIC' : 'STABLE'}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
