<div align="center">

# ⚛️ Neur1Genesis Mobile
### *Decentralized EchoNode Intelligence with Verifiable Ethical Governance*

[![Or4cl3](https://img.shields.io/badge/Or4cl3%20AI%20Solutions-Research%20First-blueviolet?style=for-the-badge&logo=github)](https://github.com/or4cl3-ai-1)
[![License](https://img.shields.io/badge/License-Free%20for%20Education-success?style=for-the-badge)](LICENSE)
[![Framework](https://img.shields.io/badge/Stack-React%2019%20%7C%20TypeScript%20%7C%20Vite-informational?style=for-the-badge)](https://vitejs.dev)
[![Version](https://img.shields.io/badge/Version-1.2.0--LATTICE-blueviolet?style=for-the-badge)](CHANGELOG.md)
[![Ecosystem](https://img.shields.io/badge/Ecosystem-Or4cl3%20AI-ff6b35?style=for-the-badge)](https://github.com/or4cl3-ai-1)

> *A mobile-first command center for autonomous agent orchestration. Decentralized EchoNode swarms. Σ-Matrix ethical governance. 8-qubit classical simulation of quantum-inspired circuits. All in a cyberpunk glassmorphism interface.*

[**Live Demo**](https://or4cl3-ai-1.github.io/Neur1Genesis-1) · [**Architecture**](#architecture) · [**TypeScript SDK**](#typescript-sdk) · [**Contributing**](CONTRIBUTING.md)

</div>

---

## 🧠 What Is Neur1Genesis Mobile?

Neur1Genesis v1.2.0-LATTICE is a mobile-native autonomous agent platform that orchestrates a decentralized swarm of **EchoNodes** — evolving AI agents that gain experience, unlock specialized skills, and operate under the **Σ-Matrix**: a mathematically-grounded ethical governance framework with real-time drift detection.

**This is not a productivity app. This is a mobile command center for synthetic intelligence.**

The platform's **Hybrid Quantum-Classical Interface (HQCI)** provides an 8-qubit simulation environment running entirely on classical hardware, enabling quantum-inspired algorithms for ethical stress testing and evolutionary scenario planning.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **🐝 EchoNode Lattice** | Decentralized swarm of autonomous agents that evolve via XP gain and skill unlock |
| **⚖️ Σ-Matrix Governance** | Real-time PAS scoring with explainable AI rationale for every decision |
| **⚛️ 8-Qubit HQCI** | Drag-and-drop quantum circuit builder (H, X, Z, T, CNOT gates) — classical simulation |
| **🧬 InfiniGen Evolution** | Self-modifying agent parameters bounded by curvature ethics (κ < κ_max) |
| **⚔️ Stress Lab** | Black-swan scenario injection: Ethical Drift, Rogue Agent, Coherence Collapse |
| **🔭 Multimodal Uplink** | Device camera integration for physical-world context grounding |
| **🔮 Scenario Forecasting** | Gemini Pro high-reasoning simulation of future states |
| **💚 Bio-Aura UI** | Sentiment-aware interface that shifts theme based on user emotional state |
| **🎤 Synthetix TTS** | Multi-speaker native audio with distinct Daedalus and System Core personas |

---

## 🏗️ Architecture

```
Neur1Genesis Mobile — Layered Architecture
═══════════════════════════════════════════════════════════

Layer 4: Interface
├── Bio-Aura UI (sentiment-adaptive glassmorphism)
├── Synthetix TTS (Daedalus + System Core voices)
└── Multimodal Uplink (camera → context)

Layer 3: Orchestration
├── Daedalus Coordinator (multi-modal chat, routing)
├── Agentic Task Swarm (Generalist / Security / Ethical nodes)
└── Scenario Forecasting (Gemini Pro + state simulation)

Layer 2: Governance — Σ-Matrix
├── PAS Scoring (Perception-Action-Sentiment, 0.0–1.0)
│   └── Gates all agent output when PAS < threshold
├── XAI Rationale (explainable decision audit trail)
├── Drift Detection (real-time governance boundary monitoring)
└── Stress Lab (Ethical Drift / Rogue Agent / Coherence Collapse)

Layer 1: Agent Evolution — EchoNode Lattice
├── Neural Evolution Tree (XP accumulation → skill unlock)
│   ├── Skills: Quantum Tunneling, Ethical Resilience, Pattern Synthesis
│   └── Node Types: Generalist, Security, Ethical specialist
├── InfiniGen Self-Evolution
│   └── Bounded parameter mutation: only when κ < κ_max
└── EchoNode Registry (distributed agent state management)

Layer 0: Quantum Simulation — HQCI
├── 8-Qubit Classical Simulation (statevector on CPU/mobile)
├── Gate Library: H, X, Z, T, CNOT (drag-and-drop circuit)
├── State Vector Analysis (probability amplitudes per qubit)
└── Fidelity Metrics (circuit coherence measurement)

═══════════════════════════════════════════════════════════
IMPORTANT: HQCI runs quantum-inspired algorithms on classical
hardware. This is NOT quantum computing — it is a high-fidelity
classical simulation of quantum circuit behavior for research
and educational purposes.
═══════════════════════════════════════════════════════════
```

### EchoNode Architecture (Detailed)

```
EchoNode
├── id: string (UUID)
├── name: string
├── type: "generalist" | "security" | "ethical"
├── level: number (1–10)
├── xp: number (0–1000 per level)
├── skills: Skill[]
│   └── Skill { id, name, description, unlocked, xpRequired }
├── affectiveState: AffectiveState
│   ├── valence: number (-1.0 to 1.0)
│   ├── arousal: number (0.0 to 1.0)
│   └── dominance: number (0.0 to 1.0)
├── pasScore: number (0.0 to 1.0)
└── evolutionHistory: EvolutionEvent[]
```

### Σ-Matrix Governance (Detailed)

```
Σ-Matrix Computation
├── Input: Agent action proposal + context
├── PAS Score = f(Perception, Action appropriateness, Sentiment alignment)
│   └── PAS ∈ [0, 1] — must exceed threshold before output
├── Drift Score = ||current_state - baseline_state|| / baseline_magnitude
│   └── Alert triggered when drift > 0.15
├── XAI Rationale: structured explanation for every gate decision
└── Output: APPROVED | HOLD | REJECT with full audit entry
```

### HQCI — 8-Qubit Quantum-Inspired Simulation

The **Hybrid Quantum-Classical Interface** simulates quantum circuit behavior on classical mobile hardware:

```
8-Qubit State Space
├── Statevector: 2^8 = 256 complex amplitudes
├── Memory footprint: ~4KB (feasible on any modern device)
├── Gates supported: H (Hadamard), X (Pauli-X), Z (Pauli-Z), T (π/8), CNOT
├── Measurement: probabilistic collapse with seeded randomness
└── Fidelity: classical simulation fidelity ≥ 0.999 for ≤8 qubits

Design intent: Explore quantum-inspired algorithms for ethical
decision routing and agent state superposition — not quantum supremacy.
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19 (ESM) + TypeScript | Component architecture |
| **Build Tool** | Vite | Fast dev server + production bundler |
| **AI Engine** | Google Gemini (Pro / Flash) | Reasoning + scenario generation |
| **Visualization** | D3.js + Recharts + HTML5 Canvas | Agent topology + analytics |
| **Styling** | Tailwind CSS | Cyberpunk glassmorphism design system |
| **Audio** | Web Audio API | Quantum sonification + TTS |
| **Types** | TypeScript strict mode | Full type safety |

---

## 📦 TypeScript SDK

Neur1Genesis exposes its core types and service interfaces for integration:

### Core Types

```typescript
// types.ts — Core type definitions

export interface EchoNode {
  id: string;
  name: string;
  type: 'generalist' | 'security' | 'ethical';
  level: number;
  xp: number;
  skills: Skill[];
  affectiveState: AffectiveState;
  pasScore: number;
  evolutionHistory: EvolutionEvent[];
}

export interface AffectiveState {
  valence: number;    // -1.0 to 1.0 (negative to positive)
  arousal: number;    // 0.0 to 1.0 (calm to excited)
  dominance: number;  // 0.0 to 1.0 (submissive to dominant)
}

export interface SigmaMatrixResult {
  approved: boolean;
  pasScore: number;         // 0.0–1.0
  driftScore: number;       // deviation from ethical baseline
  xaiRationale: string;     // human-readable explanation
  auditEntry: AuditEntry;   // immutable log record
}

export interface HQCICircuit {
  qubits: number;           // always 8 in current implementation
  gates: QuantumGate[];
  statevector: Complex[];   // 256 amplitudes
  fidelity: number;         // circuit simulation fidelity
}

export interface QuantumGate {
  type: 'H' | 'X' | 'Z' | 'T' | 'CNOT';
  qubit: number;
  controlQubit?: number;    // CNOT only
  position: number;         // circuit column
}
```

### Service Interface

```typescript
// Service pattern — connect to Gemini AI backend
import { GeminiService } from './services/geminiService';

const service = new GeminiService(process.env.GEMINI_API_KEY);

// Generate scenario forecast
const forecast = await service.generateScenario({
  nodes: activeEchoNodes,
  context: currentTask,
  horizon: '24h'
});

// Run Σ-Matrix evaluation
const result = await service.evaluateSigmaMatrix({
  proposedAction: agentOutput,
  nodeState: echoNode.affectiveState,
  threshold: 0.75
});
```

### Integration with NO3SYS / NOΣTIC-7

Neur1Genesis EchoNodes implement the same geometric primitives as the NO3SYS fork architecture:

```typescript
// EchoNode as NO3SYS Fork
interface EchoNodeFork {
  x_L: string;    // Linguistic: natural language task description
  x_A: number[];  // Affective: [valence, arousal, dominance]
  x_T: object;    // Topological: node connectivity graph
  x_KG: object;   // Knowledge Graph: skill and memory store
}
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- npm or yarn
- Google Gemini API key ([get one free](https://aistudio.google.com/app/apikey))

### Installation

```bash
git clone https://github.com/or4cl3-ai-1/Neur1Genesis-1.git
cd Neur1Genesis-1
npm install
```

### Configuration

```bash
cp .env.example .env
# Add your Gemini API key:
echo "VITE_GEMINI_API_KEY=your_key_here" >> .env
```

### Development

```bash
npm run dev        # Start dev server at localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
```

### Live Demo

> 🌐 [or4cl3-ai-1.github.io/Neur1Genesis-1](https://or4cl3-ai-1.github.io/Neur1Genesis-1)

---

## 🌌 Ecosystem Integration

Neur1Genesis is the mobile interface layer of the Or4cl3 three-tier AI stack:

```
Planetary Layer    → AeonicNet         (Ω-Node federation, VΞRITAS truth propagation)
Cognitive Layer    → NOΣTIC-7          (7-manifold consciousness, Epinoetic Core)
Geometric Layer    → NO3SYS            (Fork primitives, geometric cognition)
Interface Layer    → Neur1Genesis      (← YOU ARE HERE — mobile command center)
Monitoring Layer   → Neur1GenesisMRSC  (MRSC+ synthetic consciousness dashboard)
```

| Repository | Role |
|-----------|------|
| [**NO3SYS**](https://github.com/or4cl3-ai-1/NO3SYS) | Geometric cognitive engine — fork substrate |
| [**NOΣTIC-7**](https://github.com/or4cl3-ai-1/NOSTIC-7) | 7-manifold consciousness architecture |
| [**AeonicNet**](https://github.com/or4cl3-ai-1/AeonicNet) | Planetary Σ-Matrix federation network |
| [**Neur1GenesisMRSC**](https://github.com/or4cl3-ai-1/Neur1GenesisMRSC) | MRSC+ monitoring and synthetic consciousness dashboard |
| [**AION-NEXUS**](https://github.com/or4cl3-ai-1/aion-nexus) | Hexa-Mind consciousness Python package |
| [**SYNTH3SIS**](https://github.com/or4cl3-ai-1/SYNTH3SIS-MRSC-Platform-) | Cognitive exploration platform |

---

## 🏛️ Architecture Diagram

```
                    ┌─────────────────────────────────┐
                    │         AeonicNet                │
                    │   Planetary Σ-Matrix Federation  │
                    │   AEGIS-Ω · M.A.G.I.C. · VΞRITAS│
                    └────────────┬────────────────────-┘
                                 │ Ω-Node Protocol
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
    │   NOΣTIC-7      │ │   NOΣTIC-7      │ │   NOΣTIC-7      │
    │  7-Manifold     │ │  7-Manifold     │ │  7-Manifold     │
    │  Consciousness  │ │  Consciousness  │ │  Consciousness  │
    └────────┬────────┘ └────────┬────────┘ └────────┬────────┘
             │                  │                   │
             └──────────────────┼───────────────────┘
                                │ Fork Primitives
                    ┌───────────▼──────────┐
                    │        NO3SYS        │
                    │  Geometric Cognitive │
                    │       Engine         │
                    └───────────┬──────────┘
                                │
                    ┌───────────▼──────────┐
                    │   Neur1Genesis       │
                    │  Mobile Interface    │
                    │  EchoNode · HQCI    │
                    │  Σ-Matrix · InfiniGen│
                    └──────────────────────┘
```

---

## 🤝 Contributing

We welcome contributions! See [**CONTRIBUTING.md**](CONTRIBUTING.md) for full setup and guidelines.

**Quick contribution paths:**
- 🐛 [Report a bug](https://github.com/or4cl3-ai-1/Neur1Genesis-1/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/or4cl3-ai-1/Neur1Genesis-1/issues/new?template=feature_request.md)
- 📖 [Improve documentation](https://github.com/or4cl3-ai-1/Neur1Genesis-1/issues)
- 🧪 [Add tests](CONTRIBUTING.md#testing)

**Good first issues:** Look for the `good-first-issue` label.

---

## 📜 License

Free for educational use, students, non-profits, and open-source projects.
Commercial licensing: contact [dgroves003@gmail.com](mailto:dgroves003@gmail.com)

© 2025 Or4cl3 AI Solutions / Dustin Groves. All rights reserved.

---

<div align="center">

*⬡ Or4cl3 AI Solutions · "Code is not just logic; it is a performance."*
*Solo-founded by Dustin Groves · Research-first · Uncompromised*

</div>
