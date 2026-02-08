
import React, { useState } from 'react';
import { Code, Play, RefreshCw, Layers, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const InfiniGen: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("// Enter a prompt to generate quantum-optimized code...");
  const [generation, setGeneration] = useState(0);
  const [isEvolving, setIsEvolving] = useState(false);

  const handleEvolve = async () => {
    if (!prompt.trim()) return;
    
    setIsEvolving(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: `You are the InfiniGen engine in the Neur1Genesis platform. 
            Generate highly optimized, "quantum-enhanced" TypeScript/JavaScript code for the following request: "${prompt}".
            
            Format:
            - Provide a clean, modular class or function.
            - Include comments explaining the "quantum optimization" (e.g., superposition of logic, entanglement of states).
            - Keep the output concise and focused on code.
            - This is generation #${generation + 1} of the evolutionary process.`,
            config: {
                temperature: 1,
                topP: 0.95,
                topK: 64,
                thinkingConfig: { thinkingBudget: 5000 }
            }
        });

        const generatedCode = response.text || "// Error: Could not generate code from the quantum field.";
        setCode(generatedCode);
        setGeneration(prev => prev + 1);
    } catch (error) {
        console.error("InfiniGen Evolution Error:", error);
        setCode(`// INFINGEN ERROR: [Quantum Coherence Lost]\n// Trace: ${error.message}`);
    } finally {
        setIsEvolving(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
        <div className="flex items-center justify-between bg-neur-card p-4 rounded-lg border border-white/10">
            <div>
                <h2 className="text-lg font-bold text-white flex items-center">
                    <Code className="mr-2 text-neur-cyan" /> InfiniGen Code Evolver
                </h2>
                <p className="text-xs text-neur-subtext">Self-evolving metaprogramming engine powered by Gemini 3.</p>
            </div>
            <div className="flex items-center space-x-4">
                 <div className="flex flex-col items-end">
                    <div className="text-[10px] text-neur-subtext uppercase tracking-widest">Iteration</div>
                    <div className="text-sm font-mono text-neur-purple">GEN-{generation.toString().padStart(4, '0')}</div>
                 </div>
                 <Layers size={16} className="text-neur-subtext"/>
            </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-neur-card rounded-lg p-4 flex flex-col space-y-4">
                <div className="relative">
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe functionality (e.g., 'Optimize qubit allocation algorithm' or 'Self-healing neural bridge')..."
                        className="w-full h-40 bg-neur-bg border border-white/10 rounded p-4 text-sm text-white focus:outline-none focus:border-neur-cyan/50 resize-none font-sans"
                    />
                    <Sparkles className="absolute bottom-4 right-4 text-neur-cyan opacity-20" size={20} />
                </div>
                
                <button 
                    onClick={handleEvolve}
                    disabled={!prompt.trim() || isEvolving}
                    className="w-full py-4 bg-neur-cyan/10 text-neur-cyan border border-neur-cyan/30 rounded hover:bg-neur-cyan hover:text-neur-bg transition-all flex items-center justify-center font-bold tracking-widest text-sm"
                >
                    {isEvolving ? (
                        <>
                            <RefreshCw className="animate-spin mr-2" size={18} />
                            <span>SEQUENCING GENES...</span>
                        </>
                    ) : (
                        <>
                            <Play className="mr-2" size={18} />
                            <span>INITIATE GENETIC SEQUENCE</span>
                        </>
                    )}
                </button>
                
                <div className="bg-neur-bg/50 p-4 rounded border border-white/5 text-xs text-neur-subtext">
                    <h3 className="font-bold text-white mb-2 uppercase tracking-tighter">Evolution Parameters</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between"><span>Mutation Rate</span><span className="text-neur-cyan font-mono">0.42%</span></div>
                        <div className="flex justify-between"><span>Selection Pressure</span><span className="text-neur-purple font-mono">ADAPTIVE</span></div>
                        <div className="flex justify-between"><span>Engine</span><span className="text-white font-mono">GEMINI-3-PRO</span></div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0a0e27] rounded-lg border border-white/10 p-4 font-mono text-xs overflow-hidden relative flex flex-col">
                <div className="absolute top-2 right-2 flex space-x-2">
                    <div className="text-[9px] text-green-400 border border-green-400/30 px-2 py-0.5 rounded bg-green-400/5">COHERENT</div>
                    <div className="text-[9px] text-neur-cyan border border-neur-cyan/30 px-2 py-0.5 rounded bg-neur-cyan/5">OPTIMIZED</div>
                </div>
                <div className="flex-1 overflow-auto custom-scrollbar">
                    <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {code}
                    </pre>
                </div>
            </div>
        </div>
    </div>
  );
};

export default InfiniGen;
