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

    // Define links
    let links: any[] = [];
    
    if (activeProposal) {
        // Star topology centered on proposer for the active vote
        const proposer = nodes.find(n => n.id === activeProposal.proposerId);
        if (proposer) {
            links = nodes.filter(n => n.id !== proposer.id).map(n => ({
                source: n.id,
                target: proposer.id,
                type: 'vote',
                vote: activeProposal.votes.find(v => v.nodeId === n.id)?.vote
            }));
        }
    } else {
         // Ring + Random connections for idle state
         nodes.forEach((source, i) => {
            links.push({ source: source.id, target: nodes[(i + 1) % nodes.length].id, type: 'structure' });
            if (Math.random() > 0.7) {
                const target = nodes[Math.floor(Math.random() * nodes.length)];
                if (target.id !== source.id) links.push({ source: source.id, target: target.id, type: 'structure' });
            }
         });
    }

    // Simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(activeProposal ? 150 : 60))
      .force("charge", d3.forceManyBody().strength(activeProposal ? -100 : -200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(25));

    // Draw Links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", (d: any) => {
          if (d.type === 'vote') {
              if (d.vote === 'YES') return '#22c55e'; // Green
              if (d.vote === 'NO') return '#ef4444'; // Red
              return '#4b5563'; // Gray (Pending)
          }
          return '#2e3856'; // Structure lines (dark blue-gray)
      })
      .attr("stroke-width", (d: any) => d.type === 'vote' && d.vote ? 2 : 1)
      .attr("stroke-dasharray", (d: any) => d.type === 'vote' && !d.vote ? "4 2" : null) // Dashed for pending
      .attr("stroke-opacity", (d: any) => d.type === 'vote' ? 0.8 : 0.4);

    // Draw Nodes
    const nodeGroup = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<SVGGElement, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Node Circles
    const circles = nodeGroup.append("circle")
      .attr("r", (d: EchoNode) => d.id === activeProposal?.proposerId ? 14 : 8)
      .attr("fill", (d: EchoNode) => {
          if (d.id === activeProposal?.proposerId) return '#00d9ff'; // Proposer Cyan
          return '#0a0e27';
      })
      .attr("stroke", (d: EchoNode) => {
          // If voting, color by vote
          if (activeProposal) {
              if (d.id === activeProposal.proposerId) return '#00d9ff';
              const vote = activeProposal.votes.find(v => v.nodeId === d.id);
              if (vote?.vote === 'YES') return '#22c55e';
              if (vote?.vote === 'NO') return '#ef4444';
              return '#4b5563'; // Pending
          }
          // Default status colors
          if (d.status === 'Processing') return '#00d9ff';
          if (d.status === 'Offline') return '#ef4444';
          if (d.status === 'Corrupted') return '#ef4444';
          return '#8b92b0';
      })
      .attr("stroke-width", (d: EchoNode) => d.id === activeProposal?.proposerId ? 3 : 2)
      .style("cursor", "pointer");

    // Add Tooltip Events
    circles.on("mouseenter", (event, d: EchoNode) => {
        setTooltip({
            x: event.pageX,
            y: event.pageY,
            node: d
        });
    })
    .on("mousemove", (event) => {
        setTooltip(prev => prev ? { ...prev, x: event.pageX, y: event.pageY } : null);
    })
    .on("mouseleave", () => {
        setTooltip(null);
    });

    // Role Icons/Text
    nodeGroup.append("text")
      .attr("x", 14)
      .attr("y", 4)
      .text((d: EchoNode) => d.name.split('-')[1]) // Short name
      .attr("fill", "#ffffff")
      .attr("font-size", "10px")
      .attr("font-family", "monospace")
      .style("pointer-events", "none");
      
    // Simulation Tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeGroup.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag handlers
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
    };
  }, [nodes, activeProposal]);

  return (
    <div className="w-full h-full relative">
        <svg ref={svgRef} className="w-full h-full" />
        
        {/* Active Protocol Label */}
        <div className="absolute top-4 left-4 pointer-events-none z-10">
            {activeProposal ? (
                <div className="bg-neur-card/80 backdrop-blur px-4 py-2 rounded-lg border border-neur-cyan/30 shadow-[0_0_15px_rgba(0,217,255,0.1)]">
                    <div className="flex items-center space-x-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-neur-cyan animate-pulse"></div>
                        <span className="text-neur-cyan font-bold text-xs tracking-wider">CONSENSUS PROTOCOL ACTIVE</span>
                    </div>
                    <div className="text-white text-sm font-bold">{activeProposal.topic}</div>
                    <div className="text-neur-subtext text-xs">Proposer: {activeProposal.proposerName}</div>
                </div>
            ) : (
                <div className="bg-neur-card/50 px-3 py-1 rounded border border-white/5 text-xs text-neur-subtext">
                    Network Status: IDLE
                </div>
            )}
        </div>

        {/* Tooltip */}
        {tooltip && (
            <div 
                className="fixed z-50 bg-[#0a0e27]/95 border border-neur-cyan/30 rounded-lg p-3 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm pointer-events-none min-w-[180px]"
                style={{ top: tooltip.y + 15, left: tooltip.x + 15 }}
            >
                <div className="text-neur-cyan font-bold text-sm mb-1">{tooltip.node.name}</div>
                <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                        <span className="text-neur-subtext">Role:</span>
                        <span className="text-white">{tooltip.node.role}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-neur-subtext">Status:</span>
                        <span className={`${tooltip.node.status === 'Corrupted' ? 'text-red-500 font-bold' : 'text-white'}`}>{tooltip.node.status}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-neur-subtext">Trust:</span>
                        <span className="text-green-400 font-mono">{(tooltip.node.trustScore * 100).toFixed(0)}%</span>
                    </div>
                     <div className="mt-2 pt-1 border-t border-white/10 text-[10px] text-gray-400 italic">
                        {tooltip.node.status === 'Processing' ? 'Computing vector gradients...' : 
                         tooltip.node.status === 'Learning' ? 'Updating weights...' :
                         tooltip.node.status === 'Voting' ? 'Deliberating...' : 'Awaiting instructions'}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default CollaborationVisualizer;
