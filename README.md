# Neur1Genesis Platform

**Version:** 1.0.4-beta
**Tagline:** *Where quantum intelligence meets ethical autonomy.*

## Executive Summary
Neur1Genesis is a mobile-native, quantum-enhanced AI platform featuring autonomous agents (EchoNodes), verifiable ethical governance (Σ-Matrix), and self-evolving code simulation (InfiniGen). It simulates an 8-qubit Hybrid Quantum-Classical Interface (HQCI) to coordinate decentralized agent behavior with provable ethical convergence.

![Neur1Genesis UI](https://via.placeholder.com/800x400?text=Neur1Genesis+Dashboard+Preview)

---

## 🚀 Key Features

### 1. HQCI-QSCE (Quantum Engine)
*   **Circuit Builder**: Interactive drag-and-drop interface for quantum gates (H, X, Y, Z, CNOT, Measure).
*   **Simulation**: Simulates 8-qubit entanglement and superposition execution.
*   **Performance**: <800ms latency targets for circuit evaluation.
*   **Integration**: Uses Google Gemini to predict probabilistic outcomes for complex circuit states.

### 2. EchoNodes (Autonomous Agents)
*   **Swarm Intelligence**: decentralized agents with specialized roles (Generalist, Ethical, Security, Creative, Coordinator).
*   **Collaboration Visualizer**: Real-time D3.js force-directed graph showing agent communication and consensus formation.
*   **Trust Metrics**: Dynamic trust scoring based on task completion and ethical alignment.

### 3. Σ-Matrix (Ethical Governance)
*   **DMAIC Process**: Real-time tracking of Define, Measure, Analyze, Improve, and Control phases.
*   **Ethical Compass**: Visual radar chart monitoring 5 dimensions: Fairness, Transparency, Accountability, Privacy, and Safety.
*   **Drift Detection**: Automated alerts when the PAS (Perception-Action-Sentiment) score drops below thresholds.

### 4. Advanced Modules (New)
*   **InfiniGen**: A metaprogramming engine that simulates self-evolving code using "quantum genetic" mutations.
*   **Sentinel**: A gamified threat defense system to detect and purge corrupted nodes from the lattice.
*   **MindSpace**:
    *   **DreamStream**: Visualizes the "subconscious" generative output of idle agents.
    *   **Knowledge Crystal**: Heuristic compression for session storage.
    *   **Predictive Horizon**: Forecasts system stability 10 minutes into the future.

### 5. Daedalus Coordinator
*   **Natural Language Interface**: Chat with the system using the Daedalus persona (powered by Google Gemini 2.5 Flash).
*   **Voice Control**: Integrated speech-to-text for hands-free system management.
*   **System Actions**: Capable of creating nodes, running simulations, and analyzing ethics via text commands.

### 6. Immersive UX
*   **Quantum Sonification**: Generative audio engine that translates system coherence into ambient soundscapes.
*   **Cyberpunk Aesthetics**: High-contrast dark mode, neon accents, and responsive animations.

---

## 🛠 Technical Stack

*   **Frontend**: React 19, TypeScript, Vite
*   **Styling**: Tailwind CSS, Lucide React (Icons)
*   **Visualization**: D3.js (Network/Topology), Recharts (Metrics/Analytics)
*   **AI/LLM**: Google GenAI SDK (`@google/genai` - Gemini 2.5 Flash)
*   **Audio**: Web Audio API (Oscillator/Gain nodes)

---

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-org/neur1genesis.git
    cd neur1genesis
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory (optional, but required for live AI features):
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```
    *Note: Without an API key, the system runs in "Simulation Mode" with mock data.*

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

---

## 🖥 Application Structure

*   **Dashboard**: Main HUD showing topology, compass, and active consensus.
*   **Quantum Lab**: Circuit builder and execution results.
*   **EchoNode Manager**: Detailed agent view and collaboration mesh.
*   **Ethics Dashboard**: Deep dive into Σ-Matrix metrics.
*   **Daedalus Chat**: LLM interaction layer.
*   **MindSpace / Sentinel / InfiniGen**: Specialized subsystems.

---

## 🛡 Security & Privacy
*   **Local Processing**: Audio analysis and visualization logic run client-side.
*   **Simulation Mode**: The app functions fully without external API calls if preferred.
*   **Sentinel Module**: Simulates "viral load" and threat purging within the agent network.

---

## 📄 License
MIT License. See `LICENSE` for details.

---

*Neur1Genesis - Pioneering the future of AI on mobile devices.*
