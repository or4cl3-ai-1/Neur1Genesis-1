
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
  SCENARIO_PLANNER = 'SCENARIO_PLANNER',
  EVOLUTION_TREE = 'EVOLUTION_TREE',
  STRESS_TEST = 'STRESS_TEST',
  TASK_SWARM = 'TASK_SWARM',
  VISION_UPLINK = 'VISION_UPLINK'
}

export interface NodeSkill {
  name: string;
  level: number;
  unlocked: boolean;
  description: string;
}

export interface EchoNode {
  id: string;
  name: string;
  role: 'Generalist' | 'Ethical' | 'Security' | 'Creative' | 'Coordinator';
  status: 'Idle' | 'Processing' | 'Learning' | 'Offline' | 'Voting' | 'Corrupted' | 'Purging';
  trustScore: number;
  cpuUsage: number;
  tasksCompleted: number;
  level: number;
  experience: number;
  skills: NodeSkill[];
}

export interface QuantumGate {
  id: string;
  type: 'H' | 'X' | 'Y' | 'Z' | 'CNOT' | 'M' | 'T';
  qubit: number;
  targetQubit?: number;
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
  source: 'Daedalus' | 'System' | 'EchoNode' | 'Sigma' | 'Consensus' | 'User' | 'Sentinel' | 'InfiniGen' | 'Forecaster' | 'StressLab';
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

export interface ScenarioOutcome {
  id: string;
  title: string;
  description: string;
  probability: number;
  impactScore: number;
  requirements: string[];
  videoUri?: string;
}

export interface SentimentData {
  score: number;
  detectedMood: string;
  recommendedTone: string;
}

export interface SwarmTask {
  id: string;
  title: string;
  chain: string[];
  status: 'Pending' | 'In-Progress' | 'Completed';
  output?: string;
}
