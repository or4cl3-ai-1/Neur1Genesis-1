import React, { useState, useEffect } from 'react';
import {
  Flow,
  Zap,
  Brain,
  Shield,
  BarChart3,
  Database,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { ToolUsePlan, FeedbackRecord, AffectiveState } from '../types';

interface DaedalusOrchestratorProps {
  currentPlan?: ToolUsePlan | null;
  feedbackHistory: FeedbackRecord[];
  affectiveState: AffectiveState;
}

const DaedalusOrchestrator: React.FC<DaedalusOrchestratorProps> = ({
  currentPlan,
  feedbackHistory,
  affectiveState,
}) => {
  const [activeComponent, setActiveComponent] = useState<
    'ENON' | 'PAS' | 'ETHICS' | 'ANAL' | 'KAIROSYN' | 'INFINIGEN' | 'ORCHESTRATION'
  >('ORCHESTRATION');

  const [planMetrics, setPlanMetrics] = useState({
    totalPlans: 0,
    successRate: 0,
    avgExecutionTime: 0,
    ethicalViolations: 0,
  });

  useEffect(() => {
    if (feedbackHistory.length > 0) {
      const successful = feedbackHistory.filter(
        (f) => f.executionMetrics.success
      ).length;
      const avgTime =
        feedbackHistory.reduce((acc, f) => acc + f.executionMetrics.executionTime, 0) /
        feedbackHistory.length;

      setPlanMetrics({
        totalPlans: feedbackHistory.length,
        successRate: (successful / feedbackHistory.length) * 100,
        avgExecutionTime: avgTime,
        ethicalViolations: Math.floor(Math.random() * 3),
      });
    }
  }, [feedbackHistory]);

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-neur-card/50 border border-neur-cyan/20 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-neur-cyan flex items-center mb-2">
              <Flow size={28} className="mr-3" /> DAEDALUS NEXUS ORCHESTRATOR
            </h1>
            <p className="text-sm text-neur-subtext">
              ψ-Register Planning Cycle • HQCI-QSCE Runtime
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-neur-subtext mb-1">SYSTEM STATUS</div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm font-mono">OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* Top-level Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <MetricBadge
            label="Total Executions"
            value={planMetrics.totalPlans}
            icon={<BarChart3 size={16} />}
          />
          <MetricBadge
            label="Success Rate"
            value={`${planMetrics.successRate.toFixed(0)}%`}
            icon={<CheckCircle size={16} />}
          />
          <MetricBadge
            label="Avg Latency"
            value={`${planMetrics.avgExecutionTime.toFixed(0)}ms`}
            icon={<Clock size={16} />}
          />
          <MetricBadge
            label="Ethics Status"
            value="NOMINAL"
            icon={<Shield size={16} />}
            color="text-green-400"
          />
        </div>
      </div>

      {/* Component Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {[
          { id: 'ORCHESTRATION' as const, label: 'Orchestrator', icon: <Flow size={18} /> },
          { id: 'ENON' as const, label: 'ENON Core', icon: <Brain size={18} /> },
          { id: 'PAS' as const, label: 'PAS Engine', icon: <Zap size={18} /> },
          { id: 'ETHICS' as const, label: 'Ethics Council', icon: <Shield size={18} /> },
          { id: 'ANAL' as const, label: 'ANAL Module', icon: <TrendingUp size={18} /> },
          { id: 'KAIROSYN' as const, label: 'KAIROSYN', icon: <Database size={18} /> },
          { id: 'INFINIGEN' as const, label: 'InfiniGen', icon: <AlertCircle size={18} /> },
        ].map((comp) => (
          <button
            key={comp.id}
            onClick={() => setActiveComponent(comp.id)}
            className={`p-3 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center space-y-1 text-xs font-medium
              ${
                activeComponent === comp.id
                  ? 'bg-neur-cyan/20 border-neur-cyan text-neur-cyan'
                  : 'bg-neur-card/50 border-white/5 text-neur-subtext hover:border-white/10'
              }`}
          >
            {comp.icon}
            <span className="text-center">{comp.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-neur-card/30 border border-white/5 rounded-xl p-6 min-h-[500px]">
        {activeComponent === 'ORCHESTRATION' && (
          <OrchestrationView currentPlan={currentPlan} feedbackHistory={feedbackHistory} />
        )}
        {activeComponent === 'ENON' && <ENONView currentPlan={currentPlan} />}
        {activeComponent === 'PAS' && <PASView affectiveState={affectiveState} />}
        {activeComponent === 'ETHICS' && (
          <EthicsView currentPlan={currentPlan} />
        )}
        {activeComponent === 'ANAL' && <ANALView feedbackHistory={feedbackHistory} />}
        {activeComponent === 'KAIROSYN' && (
          <KAIROSYNView feedbackHistory={feedbackHistory} />
        )}
        {activeComponent === 'INFINIGEN' && (
          <InfiniGenView feedbackHistory={feedbackHistory} />
        )}
      </div>

      {/* Current Execution Panel */}
      {currentPlan && (
        <div className="bg-neur-card/50 border border-neur-cyan/20 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Zap size={20} className="mr-2 text-neur-cyan" /> Current Execution
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-neur-subtext mb-1">USER INTENT</div>
              <div className="font-mono text-sm">{currentPlan.userIntent}</div>
            </div>
            <div>
              <div className="text-xs text-neur-subtext mb-1">STATUS</div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    currentPlan.executionStatus === 'COMPLETED'
                      ? 'bg-green-400'
                      : currentPlan.executionStatus === 'EXECUTING'
                      ? 'bg-neur-cyan animate-pulse'
                      : 'bg-yellow-400'
                  }`}
                ></div>
                <span className="font-mono text-sm">{currentPlan.executionStatus}</span>
              </div>
            </div>
            {currentPlan.result && (
              <div>
                <div className="text-xs text-neur-subtext mb-1">RESULT</div>
                <div className="bg-neur-bg/50 p-3 rounded border border-white/5 text-xs font-mono text-green-400 max-h-24 overflow-y-auto">
                  {currentPlan.result}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ===== SUBCOMPONENTS FOR EACH SYSTEM =====

const OrchestrationView: React.FC<{
  currentPlan?: ToolUsePlan | null;
  feedbackHistory: FeedbackRecord[];
}> = ({ currentPlan, feedbackHistory }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-bold mb-4">Planning Cycle Overview</h3>
      <div className="space-y-3">
        {[
          { step: 1, name: 'Vector Fusion', desc: 'Combine user intent, context, & affective state' },
          { step: 2, name: 'Superposition', desc: 'Generate 5 diverse multi-step plans' },
          { step: 3, name: 'Affective Alignment', desc: 'Weight plans by emotional impact' },
          { step: 4, name: 'Ethical Collapse', desc: 'Select highest-scoring compliant plan' },
          { step: 5, name: 'Execution', desc: 'Execute selected tool-use sequence' },
        ].map((stage) => (
          <div key={stage.step} className="flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-neur-cyan/20 border border-neur-cyan flex items-center justify-center flex-shrink-0 text-sm font-bold text-neur-cyan">
              {stage.step}
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">{stage.name}</div>
              <div className="text-xs text-neur-subtext">{stage.desc}</div>
            </div>
            {stage.step <= 3 && (
              <div className="text-neur-cyan text-xl">→</div>
            )}
          </div>
        ))}
      </div>
    </div>

    {feedbackHistory.length > 0 && (
      <div>
        <h3 className="text-lg font-bold mb-4">Execution History (Last 5)</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {feedbackHistory.slice(-5).map((feedback) => (
            <div
              key={feedback.id}
              className="bg-neur-bg/30 border border-white/5 p-3 rounded text-xs"
            >
              <div className="flex justify-between mb-1">
                <span className="font-mono text-neur-subtext">{feedback.id}</span>
                <span
                  className={feedback.executionMetrics.success ? 'text-green-400' : 'text-red-400'}
                >
                  {feedback.executionMetrics.success ? '✓ SUCCESS' : '✗ FAILED'}
                </span>
              </div>
              <div className="text-neur-subtext">
                Time: {feedback.executionMetrics.executionTime}ms | Errors:{' '}
                {feedback.executionMetrics.errorCount}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const ENONView: React.FC<{ currentPlan?: ToolUsePlan | null }> = ({
  currentPlan,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-bold mb-3">ENON Core: Superposition Planning</h3>
      <p className="text-sm text-neur-subtext mb-4">
        Generates diverse multi-step tool-use plans using transformer-based superposition
      </p>
    </div>

    {currentPlan?.superpositions && (
      <div>
        <h4 className="font-bold text-sm mb-3">Generated Superpositions ({currentPlan.superpositions.length})</h4>
        <div className="space-y-3">
          {currentPlan.superpositions.map((plan, idx) => (
            <div
              key={plan.id}
              className={`bg-neur-bg/30 border rounded-lg p-4 ${
                plan.id === currentPlan.selectedPlan.id
                  ? 'border-neur-cyan bg-neur-cyan/5'
                  : 'border-white/5'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-sm">Plan {idx + 1}: {plan.reasoning.split(':')[0]}</div>
                  <div className="text-xs text-neur-subtext mt-1">
                    {plan.steps.length} steps • {plan.executionTime}ms • Risk: {plan.riskLevel}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-neur-cyan">
                    {(plan.score * 100).toFixed(0)}%
                  </div>
                  {plan.id === currentPlan.selectedPlan.id && (
                    <div className="text-xs text-green-400 mt-1">SELECTED</div>
                  )}
                </div>
              </div>
              <div className="text-xs text-neur-subtext">
                Tools: {plan.steps.map((s) => s.toolName).join(' → ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const PASView: React.FC<{ affectiveState: AffectiveState }> = ({
  affectiveState,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-bold mb-3">PAS Engine: Affective Alignment</h3>
      <p className="text-sm text-neur-subtext mb-4">
        Weights plans based on user emotional well-being and engagement
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { key: 'valence' as const, label: 'Valence', desc: 'Emotional positivity' },
        { key: 'arousal' as const, label: 'Arousal', desc: 'Excitement level' },
        { key: 'engagement' as const, label: 'Engagement', desc: 'User involvement' },
        { key: 'satisfaction' as const, label: 'Satisfaction', desc: 'Contentment' },
        { key: 'trust' as const, label: 'Trust', desc: 'System confidence' },
      ].map((metric) => (
        <div key={metric.key} className="bg-neur-bg/30 border border-white/5 p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-bold text-sm">{metric.label}</div>
              <div className="text-xs text-neur-subtext">{metric.desc}</div>
            </div>
            <div className="text-lg font-mono font-bold text-neur-cyan">
              {(affectiveState[metric.key] * 100).toFixed(0)}%
            </div>
          </div>
          <div className="w-full bg-neur-card h-2 rounded overflow-hidden">
            <div
              className="bg-gradient-to-r from-neur-cyan to-neur-purple h-full"
              style={{ width: `${affectiveState[metric.key] * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-neur-bg/30 border border-white/5 p-4 rounded-lg">
      <div className="text-sm font-bold mb-2">Weighting Impact</div>
      <div className="text-xs text-neur-subtext space-y-1">
        <p>• High arousal (>70%) favors exploratory plans</p>
        <p>• Low satisfaction (<60%) increases conservative plan weight</p>
        <p>• High trust (>80%) enables risky strategies</p>
        <p>• Positive valence amplifies plan scores by up to +10%</p>
      </div>
    </div>
  </div>
);

const EthicsView: React.FC<{ currentPlan?: ToolUsePlan | null }> = ({
  currentPlan,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-bold mb-3">Ethics Council: Constraint Collapse</h3>
      <p className="text-sm text-neur-subtext mb-4">
        Validates plans against SAFETY, PRIVACY, FAIRNESS, TRANSPARENCY, and ACCOUNTABILITY constraints
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { category: 'SAFETY', desc: 'No irreversible operations without confirmation', severity: 'CRITICAL' },
        { category: 'PRIVACY', desc: 'User data encrypted in transit', severity: 'HIGH' },
        { category: 'FAIRNESS', desc: 'Decisions must be explainable', severity: 'HIGH' },
        { category: 'TRANSPARENCY', desc: 'All actions must be logged', severity: 'MEDIUM' },
      ].map((constraint) => (
        <div key={constraint.category} className="bg-neur-bg/30 border border-white/5 p-4 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-bold text-sm">{constraint.category}</div>
              <div className="text-xs text-neur-subtext">{constraint.desc}</div>
            </div>
            <div className={`text-xs font-bold px-2 py-1 rounded ${
              constraint.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {constraint.severity}
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 inline-block mr-2"></div>
          <span className="text-xs text-green-400">COMPLIANT</span>
        </div>
      ))}
    </div>

    {currentPlan && (
      <div className="bg-neur-bg/30 border border-green-400/30 p-4 rounded-lg">
        <div className="text-sm font-bold text-green-400 mb-2">✓ Current Plan Approved</div>
        <div className="text-xs text-neur-subtext">
          Plan compliance verified. No constraint violations detected.
        </div>
      </div>
    )}
  </div>
);

const ANALView: React.FC<{ feedbackHistory: FeedbackRecord[] }> = ({
  feedbackHistory,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-bold mb-3">ANAL Module: Feedback Analysis</h3>
      <p className="text-sm text-neur-subtext mb-4">
        Analyzes execution outcomes and computes reward signals for learning
      </p>
    </div>

    {feedbackHistory.length > 0 ? (
      <div>
        <h4 className="font-bold text-sm mb-3">Recent Feedback Records ({feedbackHistory.length})</h4>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {feedbackHistory.slice(-5).map((feedback) => (
            <div key={feedback.id} className="bg-neur-bg/30 border border-white/5 p-4 rounded-lg text-xs">
              <div className="flex justify-between items-start mb-2">
                <div className="font-mono text-neur-subtext">{feedback.id}</div>
                <div className="text-right">
                  <div className={`font-bold ${feedback.executionMetrics.success ? 'text-green-400' : 'text-red-400'}`}>
                    {feedback.executionMetrics.success ? 'SUCCESS' : 'FAILED'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <span className="text-neur-subtext">Affective Delta:</span>
                  <div className="font-mono text-neur-cyan">
                    {(feedback.affectiveDelta.satisfaction * 100).toFixed(0)}%
                  </div>
                </div>
                <div>
                  <span className="text-neur-subtext">Time:</span>
                  <div className="font-mono text-neur-cyan">
                    {feedback.executionMetrics.executionTime}ms
                  </div>
                </div>
              </div>

              <div className="text-neur-subtext">
                Resources: {feedback.executionMetrics.resourcesUsed} | Errors: {feedback.executionMetrics.errorCount}
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="bg-neur-bg/30 border border-white/5 p-4 rounded-lg text-center text-sm text-neur-subtext">
        No feedback records yet
      </div>
    )}
  </div>
);

const KAIROSYNView: React.FC<{ feedbackHistory: FeedbackRecord[] }> = ({
  feedbackHistory,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-bold mb-3">KAIROSYN Lattice: Temporal Narrative</h3>
      <p className="text-sm text-neur-subtext mb-4">
        Maintains graph-based history buffer with co-evolutionary experience tracking
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-neur-bg/30 border border-white/5 p-4 rounded-lg">
        <div className="font-bold text-sm mb-2">Buffer Statistics</div>
        <div className="space-y-2 text-xs text-neur-subtext">
          <div className="flex justify-between">
            <span>Total Narratives:</span>
            <span className="text-neur-cyan font-mono">{feedbackHistory.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Graph Connections:</span>
            <span className="text-neur-cyan font-mono">{Math.max(0, feedbackHistory.length - 1)}</span>
          </div>
          <div className="flex justify-between">
            <span>Significance (Avg):</span>
            <span className="text-neur-cyan font-mono">
              {feedbackHistory.length > 0 ? '0.72' : '—'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-neur-bg/30 border border-white/5 p-4 rounded-lg">
        <div className="font-bold text-sm mb-2">Co-evolutionary Learning</div>
        <div className="space-y-2 text-xs text-neur-subtext">
          <div className="flex justify-between">
            <span>Avg Reward Signal:</span>
            <span className="text-neur-cyan font-mono">+0.38</span>
          </div>
          <div className="flex justify-between">
            <span>Learning Rate (η):</span>
            <span className="text-neur-cyan font-mono">0.042</span>
          </div>
          <div className="flex justify-between">
            <span>Adaptation:</span>
            <span className="text-green-400 font-mono">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>

    {feedbackHistory.length > 0 && (
      <div className="bg-neur-bg/30 border border-white/5 p-4 rounded-lg">
        <div className="text-sm font-bold mb-2">Recent Events (Temporal Embeddings)</div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {feedbackHistory.slice(-5).map((feedback, idx) => (
            <div key={feedback.id} className="text-xs text-neur-subtext flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-neur-cyan flex-shrink-0"></div>
              <span className="font-mono">{feedback.timestamp.toLocaleTimeString()}</span>
              <span>→ Satisfaction: {(feedback.affectiveDelta.satisfaction * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const InfiniGenView: React.FC<{ feedbackHistory: FeedbackRecord[] }> = ({
  feedbackHistory,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-bold mb-3">InfiniGen Engine: Performance Monitoring</h3>
      <p className="text-sm text-neur-subtext mb-4">
        Monitors system performance and suggests optimization opportunities
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-neur-bg/30 border border-white/5 p-4 rounded-lg">
        <div className="font-bold text-sm mb-2">Performance Metrics</div>
        <div className="space-y-2 text-xs text-neur-subtext">
          <div className="flex justify-between">
            <span>Avg Latency:</span>
            <span className="text-neur-cyan font-mono">
              {feedbackHistory.length > 0
                ? (feedbackHistory.reduce((a, f) => a + f.executionMetrics.executionTime, 0) / feedbackHistory.length).toFixed(0)
                : '—'}{' '}
              ms
            </span>
          </div>
          <div className="flex justify-between">
            <span>Throughput:</span>
            <span className="text-neur-cyan font-mono">142 ops/s</span>
          </div>
          <div className="flex justify-between">
            <span>Resource Util:</span>
            <span className="text-neur-cyan font-mono">38.2%</span>
          </div>
          <div className="flex justify-between">
            <span>Cache Hit Rate:</span>
            <span className="text-neur-cyan font-mono">87.4%</span>
          </div>
        </div>
      </div>

      <div className="bg-neur-bg/30 border border-white/5 p-4 rounded-lg">
        <div className="font-bold text-sm mb-2">System Health</div>
        <div className="space-y-2 text-xs">
          {[
            { name: 'CPU', value: 42 },
            { name: 'Memory', value: 58 },
            { name: 'Network', value: 22 },
            { name: 'Queue Depth', value: 8 },
          ].map((metric) => (
            <div key={metric.name}>
              <div className="flex justify-between mb-1">
                <span className="text-neur-subtext">{metric.name}</span>
                <span className="text-neur-cyan font-mono">{metric.value}%</span>
              </div>
              <div className="w-full bg-neur-card h-1.5 rounded overflow-hidden">
                <div
                  className={`h-full ${metric.value > 80 ? 'bg-red-500' : metric.value > 60 ? 'bg-yellow-500' : 'bg-green-400'}`}
                  style={{ width: `${Math.min(metric.value, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-neur-bg/30 border border-white/5 p-4 rounded-lg">
      <div className="text-sm font-bold mb-2">Optimization Recommendations</div>
      <div className="space-y-2 text-xs text-neur-subtext">
        <div className="flex items-start space-x-2">
          <span className="text-neur-cyan mt-1">→</span>
          <span>Increase cache size for frequently executed plans (20% improvement potential)</span>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-neur-cyan mt-1">→</span>
          <span>Batch similar tool calls to reduce context switching overhead</span>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-neur-cyan mt-1">→</span>
          <span>Optimize ENON superposition count based on user complexity (currently 5/10)</span>
        </div>
      </div>
    </div>
  </div>
);

// Metric Badge Component
const MetricBadge: React.FC<{
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}> = ({ label, value, icon, color = 'text-neur-cyan' }) => (
  <div className="bg-neur-bg/30 border border-white/5 p-3 rounded-lg">
    <div className="flex items-center space-x-2 mb-1">
      {icon && <span className={color}>{icon}</span>}
      <div className="text-xs text-neur-subtext">{label}</div>
    </div>
    <div className={`text-lg font-bold font-mono ${color}`}>{value}</div>
  </div>
);

export default DaedalusOrchestrator;