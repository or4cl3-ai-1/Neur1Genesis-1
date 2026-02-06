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

// ===== CHATRON 9.0: DAEDALUS NEXUS TYPES =====

// ENON Core: Superposition Planning
export interface SuperpositionPlan {
  id: string;
  steps: ToolCall[];
  score: number;
  reasoning: string;
  executionTime: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ToolCall {
  id: string;
  toolName: string;
  parameters: Record<string, any>;
  priority: number;
  timeout: number;
  fallback?: ToolCall;
}

export interface ToolUsePlan {
  id: string;
  userIntent: string;
  superpositions: SuperpositionPlan[];
  selectedPlan: SuperpositionPlan;
  executionStatus: 'PENDING' | 'EXECUTING' | 'COMPLETED' | 'FAILED';
  result?: string;
  timestamp: Date;
}

// PAS Engine: Affective Alignment
export interface AffectiveState {
  valence: number; // -1 (negative) to +1 (positive)
  arousal: number; // 0 (calm) to 1 (excited)
  engagement: number; // 0 (disengaged) to 1 (fully engaged)
  satisfaction: number; // 0 (unsatisfied) to 1 (satisfied)
  trust: number; // 0 (distrustful) to 1 (trusting)
}

export interface AffectiveWeight {
  planId: string;
  originalScore: number;
  affectiveBonus: number;
  finalScore: number;
  reasoning: string;
}

// Ethics Council: Collapse & Constraint
export interface EthicalConstraint {
  id: string;
  category: 'SAFETY' | 'PRIVACY' | 'FAIRNESS' | 'TRANSPARENCY' | 'ACCOUNTABILITY';
  rule: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  active: boolean;
}

export interface EthicalCollapse {
  candidatePlanId: string;
  violatedConstraints: EthicalConstraint[];
  complianceScore: number;
  approved: boolean;
  reasoning: string;
}

// ANAL Module: Feedback Analysis
export interface FeedbackRecord {
  id: string;
  planId: string;
  preFeedback: AffectiveState;
  postFeedback: AffectiveState;
  affectiveDelta: AffectiveState;
  executionMetrics: {
    success: boolean;
    executionTime: number;
    resourcesUsed: number;
    errorCount: number;
  };
  timestamp: Date;
}

export interface RewardSignal {
  planId: string;
  affectiveDelta: number;
  efficiency: number;
  safety: number;
  compositeReward: number;
}

// KAIROSYN Lattice: Temporal Narrative
export interface TemporalNarrative {
  id: string;
  eventId: string;
  timestamp: Date;
  contextVector: number[];
  relatedEvents: string[];
  significanceScore: number;
}

export interface CoevolutionaryBuffer {
  narratives: TemporalNarrative[];
  graphConnections: Map<string, string[]>;
  learningSignals: RewardSignal[];
  lastUpdated: Date;
}

// InfiniGen Engine: Performance Monitoring
export interface PerformanceMetric {
  id: string;
  timestamp: Date;
  latency: number; // ms
  throughput: number; // ops/sec
  resourceUtilization: number; // 0-1
  errorRate: number; // 0-1
  cacheHitRate: number; // 0-1
}

export interface SystemHealthIndicator {
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  queueDepth: number;
  activeConnections: number;
}

// Orchestration Request: Input Envelope
export interface OrchestrationRequest {
  id: string;
  userIntent: string;
  projectContext: string;
  affectiveState: AffectiveState;
  temporalEmbedding: TemporalNarrative[];
  ethicalConstraints: EthicalConstraint[];
  timestamp: Date;
}

// Agent (Alice) Service Types
export interface AgentTask {
  id: string;
  toolName: string;
  parameters: Record<string, any>;
  status: 'QUEUED' | 'EXECUTING' | 'COMPLETED' | 'FAILED';
  result?: string;
  error?: string;
  executionTime?: number;
}

export interface AgentCapability {
  name: string;
  description: string;
  category: 'CODE_GEN' | 'WEB_SCRAPE' | 'DATA_ANALYSIS' | 'IMAGE_GEN' | 'NLP';
  parameters: Record<string, any>;
}

// HQCI-QSCE Deployment Layer
export interface DeploymentConfig {
  containerName: string;
  imageName: string;
  port: number;
  environment: Record<string, string>;
  resources: {
    cpuLimit: string;
    memoryLimit: string;
  };
}
