// Simple synth engine using Web Audio API for sonification
let audioCtx: AudioContext | null = null;
let oscPrimary: OscillatorNode | null = null;
let gainPrimary: GainNode | null = null;
let isMuted = true;

export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create oscillator
    oscPrimary = audioCtx.createOscillator();
    gainPrimary = audioCtx.createGain();
    
    oscPrimary.type = 'sine';
    oscPrimary.frequency.value = 432; // Base frequency
    
    oscPrimary.connect(gainPrimary);
    gainPrimary.connect(audioCtx.destination);
    
    gainPrimary.gain.value = 0; // Start silent
    oscPrimary.start();
  }
};

export const toggleMute = (mute: boolean) => {
  isMuted = mute;
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  if (gainPrimary) {
    gainPrimary.gain.setTargetAtTime(isMuted ? 0 : 0.05, audioCtx!.currentTime, 0.5);
  }
};

export const updateSonification = (coherence: number, activityLevel: number) => {
  if (!audioCtx || !oscPrimary || isMuted) return;

  // Map coherence (0.8 - 1.0) to frequency (200Hz - 600Hz)
  // Higher coherence = Higher, clearer pitch
  const targetFreq = 200 + (coherence * 400);
  oscPrimary.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 1);

  // Map activity to modulation (simulated by slight detuning or gain wobble)
  // For simplicity, we just modulate volume slightly with activity
  const volume = 0.02 + (activityLevel * 0.05); 
  gainPrimary?.gain.setTargetAtTime(volume, audioCtx.currentTime, 0.2);
};
