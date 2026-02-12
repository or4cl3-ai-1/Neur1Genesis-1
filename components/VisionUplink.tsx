import React, { useRef, useState } from 'react';
import { Camera, RefreshCw, X, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { analyzeVisualUplink, isApiKeySet } from '../services/huggingFaceService';

interface VisionUplinkProps {
  onInsight: (text: string) => void;
}

const VisionUplink: React.FC<VisionUplinkProps> = ({ onInsight }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (e) {
      console.error("Camera access denied.");
    }
  };

  const capture = async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setCapturedImage(dataUrl);

    // Only analyze if API key is configured
    if (isApiKeySet()) {
      setIsAnalyzing(true);
      const result = await analyzeVisualUplink(dataUrl.split(',')[1], "Analyze this environment for potential quantum interference or system optimization markers.");
      if (result) onInsight(result);
      setIsAnalyzing(false);
    } else {
      onInsight("Visual capture complete. Analysis requires HF_API_KEY configuration.");
    }

    stream?.getTracks().forEach(t => t.stop());
    setStream(null);
  };

  return (
    <div className="bg-neur-card rounded-3xl border border-neur-cyan/30 p-8 shadow-2xl animate-in fade-in duration-500 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-white tracking-widest uppercase flex items-center">
          <Camera className="mr-3 text-neur-cyan" /> VISIONARY UPLINK
        </h2>
        <button onClick={() => { stream?.getTracks().forEach(t => t.stop()); setCapturedImage(null); }} className="text-neur-subtext hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="aspect-square bg-neur-bg rounded-2xl border border-white/10 overflow-hidden relative mb-6">
        {capturedImage ? (
          <img src={capturedImage} className="w-full h-full object-cover" alt="Captured" />
        ) : stream ? (
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            <Zap size={48} className="text-neur-cyan animate-pulse" />
            <span className="text-[10px] text-neur-subtext font-black tracking-widest uppercase">Visual Sensors Offline</span>
            <button onClick={startCamera} className="px-6 py-2 bg-neur-cyan text-neur-bg rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">Initialize Lens</button>
          </div>
        )}

        {isAnalyzing && (
          <div className="absolute inset-0 bg-neur-bg/80 flex flex-col items-center justify-center backdrop-blur-sm z-20">
            <RefreshCw className="animate-spin text-neur-cyan mb-3" size={32} />
            <span className="text-[10px] text-neur-cyan font-black tracking-[0.3em] uppercase">Decrypting Multimodal Flux</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {stream && (
          <button onClick={capture} className="w-full py-4 bg-neur-cyan text-neur-bg rounded-xl font-black uppercase tracking-[0.2em] shadow-[0_0_20px_#00f2ff]">
            Snapshot Entropy
          </button>
        )}
        {!isApiKeySet() && (
          <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/40 flex items-start space-x-3">
            <AlertCircle className="text-yellow-500 flex-shrink-0 mt-0.5" size={16} />
            <p className="text-[10px] text-yellow-600 leading-relaxed font-bold tracking-widest uppercase">
              Vision analysis disabled: Configure HF_API_KEY to enable image understanding.
            </p>
          </div>
        )}
        <div className={`p-4 rounded-xl border flex items-start space-x-3 ${isApiKeySet() ? 'bg-white/5 border-white/10' : 'bg-gray-500/5 border-gray-500/20'}`}>
          <ShieldCheck className={`flex-shrink-0 mt-0.5 ${isApiKeySet() ? 'text-neur-cyan' : 'text-gray-500'}`} size={16} />
          <p className={`text-[10px] leading-relaxed font-bold tracking-widest uppercase ${isApiKeySet() ? 'text-neur-subtext' : 'text-gray-600'}`}>
            Multimodal grounding connects physical environmental data directly to the Σ-Matrix ethical core.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisionUplink;
