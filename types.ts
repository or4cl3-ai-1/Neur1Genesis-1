export enum ViewState {
  LANDING = 'LANDING',
  LOADING = 'LOADING',
  DASHBOARD = 'DASHBOARD',
  QUANTUM_LAB = 'QUANTUM_LAB',
  ECHONODE_MANAGER = 'ECHONODE_MANAGER',
  ETHICS_DASHBOARD = 'ETHICS_DASHBOARD',
  CHAT = 'CHAT',
  INFINIGEN = 'INFINIGEN',
  MINDSPACE = 'MINDSPACE',
  SENTINEL = 'SENTINEL',
}

export interface EchoNode {
  id: string;
  name: string;
  role: 'Generalist' | 'Ethical' | 'Security' | 'Creative' | 'Coordinator';
  status: 'Idle' | 'Processing' | 'Learning' | 'Offline' | 'Voting' | 'Corrupted' | 'Purging';
  trustScore: number; // 0-1
  cpuUsage: number; // 0-100
  tasksCompleted: number;
}

export interface QuantumGate {
  id: string;
  type: 'H' | 'X' | 'Y' | 'Z' | 'CNOT' | 'M';
  qubit: number;
  targetQubit?: number; // For CNOT
  timeStep: number;
}

export interface CircuitResult {
  probabilities: number[];
  executionTime: number;
  fidelity: number;
}

export interface SigmaMetrics {
  coherence: number;
  pasScore: number;
  fairness: number;
  transparency: number;
  accountability: number;
  privacy: number;
  safety: number;
  dmaicPhase: 'Define' | 'Measure' | 'Analyze' | 'Improve' | 'Control';
}

export interface SystemLog {
  id: string;
  timestamp: Date;
  source: 'Daedalus' | 'System' | 'EchoNode' | 'Sigma' | 'Consensus' | 'User' | 'Sentinel' | 'InfiniGen';
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface Vote {
  nodeId: string;
  nodeName: string;
  vote: 'YES' | 'NO';
  weight: number;
  timestamp: Date;
}

export interface ConsensusProposal {
  id: string;
  proposerId: string;
  proposerName: string;
  topic: string;
  description: string;
  status: 'VOTING' | 'ACCEPTED' | 'REJECTED';
  votes: Vote[];
  startTime: Date;
  endTime?: Date;
}

export interface DreamFragment {
  id: string;
  nodeId: string;
  content: string;
  type: 'Visual' | 'Code' | 'Abstract';
  timestamp: Date;
}
