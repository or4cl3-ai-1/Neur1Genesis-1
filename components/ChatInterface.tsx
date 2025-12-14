import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Terminal } from 'lucide-react';
import { SystemLog } from '../types';

interface ChatInterfaceProps {
  onSendMessage: (msg: string) => Promise<string | null>;
  logs: SystemLog[];
}

interface Message {
  id: string;
  sender: 'user' | 'system';
  text: string;
  timestamp: Date;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage, logs }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'system',
      text: "Greetings. I am Daedalus, your Quantum Coordinator. How may I assist with the platform operations today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(36),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Call API
    const responseText = await onSendMessage(userMsg.text);

    setIsTyping(false);
    
    if (responseText) {
       const systemMsg: Message = {
           id: Math.random().toString(36),
           sender: 'system',
           text: responseText,
           timestamp: new Date()
       };
       setMessages(prev => [...prev, systemMsg]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-neur-bg relative overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 bg-neur-card border-b border-white/5 flex items-center justify-between shadow-lg z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neur-purple to-neur-cyan flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.3)]">
            <Bot className="text-white" size={20} />
          </div>
          <div>
            <h2 className="font-bold text-white text-sm">Daedalus Coordinator</h2>
            <div className="flex items-center text-xs text-neur-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-neur-cyan animate-pulse mr-1.5"></span>
              Quantum Link Active
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 md:p-6">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] md:max-w-[70%] ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'} items-end space-x-2`}>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs
                  ${isUser ? 'bg-neur-card border border-white/10' : 'bg-neur-purple/20 text-neur-purple'}`}>
                  {isUser ? <User size={14} /> : <Terminal size={14} />}
                </div>

                {/* Bubble */}
                <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${isUser 
                    ? 'bg-neur-cyan/10 border border-neur-cyan/30 text-white rounded-tr-none' 
                    : 'bg-neur-card border border-white/5 text-gray-200 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
               <div className="w-8 h-8 rounded-full bg-neur-purple/20 text-neur-purple flex-shrink-0 flex items-center justify-center">
                  <Terminal size={14} />
               </div>
               <div className="bg-neur-card border border-white/5 p-3 rounded-2xl rounded-tl-none flex space-x-1">
                 <div className="w-2 h-2 bg-neur-subtext rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-neur-subtext rounded-full animate-bounce delay-100"></div>
                 <div className="w-2 h-2 bg-neur-subtext rounded-full animate-bounce delay-200"></div>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-neur-card border-t border-white/5 z-10">
        <form onSubmit={handleSend} className="relative flex items-center space-x-2">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neur-cyan pointer-events-none">
            <Sparkles size={16} />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Daedalus to analyze, simulate, or deploy..."
            className="w-full bg-neur-bg border border-white/10 rounded-full py-3 pl-10 pr-12 text-sm focus:outline-none focus:border-neur-cyan/50 text-white placeholder-neur-subtext transition-all"
            disabled={isTyping}
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 p-2 bg-neur-cyan/20 text-neur-cyan rounded-full hover:bg-neur-cyan hover:text-neur-bg disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-neur-cyan transition-all"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
