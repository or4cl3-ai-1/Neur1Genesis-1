
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { EchoNode, ConsensusProposal } from '../types';

interface CollaborationVisualizerProps {
  nodes: EchoNode[];
  activeProposal: ConsensusProposal | null;
}

const CollaborationVisualizer: React.FC<CollaborationVisualizerProps> = ({ nodes, activeProposal }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; node: EchoNode } | null>(null);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Definitions for gradients and filters
    const defs = svg.append("defs");
    
    // Glow filter
    const glowFilter = defs.append("filter")
      .attr("id", "glow-effect")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");
    
    glowFilter.append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur");
    
    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // CSS Animations
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes dashMove {
        to { stroke-dashoffset: -30; }
      }
      @keyframes pulseRing {
        0% { transform: scale(1); opacity: 0.8; stroke-width: 2; }
        100% { transform: scale(2.8); opacity: 0; stroke-width: 0.5; }
      }
      @keyframes hubRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes nodeFloat {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(0, -5px); }
      }
      .link-data-flow {
        animation: dashMove 1.2s linear infinite;
      }
      .link-conversation-flow {
        animation: dashMove 0.8s linear infinite;
      }
      .voter-pulse {
        transform-origin: center;
        animation: pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      .proposer-hub {
        transform-origin: center;
        animation: hubRotate 15s linear infinite;
      }
    `;
    document.head.appendChild(style);

    // Link preparation
    let links: any[] = [];
    
    // Base structural mesh
    nodes.forEach((source, i) => {
      links.push({ source: source.id, target: nodes[(i + 1) % nodes.length].id, type: 'structure' });
    });

    // Active Consensus Overlay
    if (activeProposal) {
      const proposer = nodes.find(n => n.id === activeProposal.proposerId);
      if (proposer) {
        nodes.forEach(n => {
          if (n.id !== proposer.id) {
            const vote = activeProposal.votes.find(v => v.nodeId === n.id);
            links.push({ 
              source: n.id, 
              target: proposer.id, 
              type: 'vote', 
              vote: vote?.vote,
              active: true 
            });
          }
        });
      }
    }

    // Active Conversation Simulation (visual flair)
    nodes.filter(n => n.status === 'Processing').forEach(source => {
      // Connect processing nodes to random others to represent "conversations"
      const targets = nodes.filter(n => n.id !== source.id && Math.random() > 0.8);
      targets.forEach(target => {
        links.push({ 
          source: source.id, 
          target: target.id, 
          type: 'conversation', 
          active: true 
        });
      });
    });

    // Force simulation setup
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance((d: any) => d.active ? 160 : 100))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(45));

    // Render Links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", (d: any) => {
        if (d.type === 'vote') {
          if (d.vote === 'YES') return '#22c55e';
          if (d.vote === 'NO') return '#f43f5e';
          return '#00f2ff';
        }
        if (d.type === 'conversation') return '#a855f7'; // Purple for conversations
        return '#1e293b';
      })
      .attr("stroke-width", (d: any) => {
        if (d.type === 'vote') return 2.5;
        if (d.type === 'conversation') return 1.5;
        return 1;
      })
      .attr("stroke-opacity", (d: any) => {
        if (d.type === 'conversation') return 0.6;
        if (d.active) return 0.9;
        return 0.2;
      })
      .attr("stroke-dasharray", (d: any) => {
        if (d.type === 'vote') return "6,4";
        if (d.type === 'conversation') return "2,8"; // Tighter dots for conversation
        return "none";
      })
      .attr("class", (d: any) => {
        if (d.type === 'vote') return "link-data-flow";
        if (d.type === 'conversation') return "link-conversation-flow";
        return "";
      })
      .style("filter", (d: any) => d.active ? "url(#glow-effect)" : null);

    // Render Node Groups
    const nodeGroup = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<SVGGElement, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Pulsing animations for voting nodes
    nodeGroup.filter((d: EchoNode) => !!activeProposal && activeProposal.votes.some(v => v.nodeId === d.id))
      .append("circle")
      .attr("r", 10)
      .attr("fill", "none")
      .attr("stroke", (d: EchoNode) => {
        const vote = activeProposal?.votes.find(v => v.nodeId === d.id);
        return vote?.vote === 'YES' ? '#22c55e' : vote?.vote === 'NO' ? '#f43f5e' : '#00f2ff';
      })
      .attr("class", "voter-pulse");

    // Main Node Circle
    nodeGroup.append("circle")
      .attr("r", (d: EchoNode) => d.id === activeProposal?.proposerId ? 16 : 10)
      .attr("fill", (d: EchoNode) => d.id === activeProposal?.proposerId ? '#00f2ff' : '#020410')
      .attr("stroke", (d: EchoNode) => {
        if (d.id === activeProposal?.proposerId) return '#00f2ff';
        if (d.status === 'Processing') return '#00f2ff';
        if (d.status === 'Offline' || d.status === 'Corrupted') return '#f43f5e';
        return '#334155';
      })
      .attr("stroke-width", 2)
      .style("filter", (d: EchoNode) => (d.status === 'Processing' || d.id === activeProposal?.proposerId) ? "url(#glow-effect)" : null)
      .style("cursor", "pointer");

    // Proposer HUD Decorations
    const hub = nodeGroup.filter((d: EchoNode) => d.id === activeProposal?.proposerId);
    hub.append("circle")
      .attr("r", 22)
      .attr("fill", "none")
      .attr("stroke", "#00f2ff")
      .attr("stroke-width", 0.5)
      .attr("stroke-dasharray", "4,6")
      .attr("class", "proposer-hub");

    // Labels
    nodeGroup.append("text")
      .attr("dy", (d: EchoNode) => d.id === activeProposal?.proposerId ? 30 : 22)
      .attr("text-anchor", "middle")
      .text((d: EchoNode) => d.name.split('-')[1])
      .attr("fill", "#94a3b8")
      .attr("font-size", "10px")
      .attr("font-family", "JetBrains Mono, monospace")
      .style("pointer-events", "none");

    // Event Handlers
    nodeGroup.on("mouseenter", (event, d: EchoNode) => {
      setTooltip({ x: event.pageX, y: event.pageY, node: d });
    })
    .on("mousemove", (event) => {
      setTooltip(prev => prev ? { ...prev, x: event.pageX, y: event.pageY } : null);
    })
    .on("mouseleave", () => {
      setTooltip(null);
    })
    .on("click", (event, d: EchoNode) => {
      // Touch-friendly selection could trigger here
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeGroup.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, [nodes, activeProposal]);

  return (
    <div className="w-full h-full relative group overflow-hidden touch-none">
      <svg ref={svgRef} className="w-full h-full" />
      
      {/* Dynamic Tooltip */}
      {tooltip && (
        <div 
          className="fixed z-50 bg-neur-bg/95 border border-neur-cyan/30 rounded-lg p-3 shadow-2xl backdrop-blur-md pointer-events-none min-w-[200px] animate-in fade-in zoom-in duration-200"
          style={{ top: tooltip.y + 15, left: tooltip.x + 15 }}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="text-neur-cyan font-bold text-xs uppercase tracking-[0.2em]">{tooltip.node.name}</div>
            <div className={`w-2 h-2 rounded-full ${tooltip.node.status === 'Processing' ? 'bg-neur-cyan animate-pulse' : 'bg-neur-subtext'}`}></div>
          </div>
          <div className="space-y-1 text-[10px] font-mono">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-neur-subtext">ROLE</span>
              <span className="text-white">{tooltip.node.role}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-neur-subtext">STATE</span>
              <span className="text-white">{tooltip.node.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neur-subtext">TRUST SCORE</span>
              <span className="text-neur-cyan font-bold">{(tooltip.node.trustScore * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid Legend Overlay */}
      <div className="absolute top-4 right-4 pointer-events-none flex flex-col space-y-2">
        <div className="glass-panel px-3 py-1.5 rounded-md border border-white/10 flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-neur-cyan animate-pulse shadow-[0_0_5px_#00f2ff]"></div>
          <span className="text-[9px] text-white tracking-widest uppercase">Lattice Synced</span>
        </div>
      </div>
    </div>
  );
};

export default CollaborationVisualizer;
