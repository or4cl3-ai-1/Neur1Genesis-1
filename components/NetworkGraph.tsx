import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { EchoNode } from '../types';

interface NetworkGraphProps {
  nodes: EchoNode[];
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ nodes }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Create links based on a simple logic (e.g., random connections or central coordinator)
    // For visual purposes, we connect everyone to a central "Hub" or each other
    const links: any[] = [];
    nodes.forEach((source, i) => {
      // Connect to next node (ring)
      links.push({ source: source.id, target: nodes[(i + 1) % nodes.length].id });
      // Connect to random other node (small world)
      if (Math.random() > 0.5) {
        const target = nodes[Math.floor(Math.random() * nodes.length)];
        if (target.id !== source.id) {
           links.push({ source: source.id, target: target.id });
        }
      }
    });

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#00d9ff")
      .attr("stroke-opacity", 0.3)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const nodeGroup = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<SVGGElement, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Node circles
    nodeGroup.append("circle")
      .attr("r", 8)
      .attr("fill", (d: EchoNode) => d.role === 'Coordinator' ? '#a855f7' : '#0a0e27')
      .attr("stroke", (d: EchoNode) => {
        if (d.status === 'Processing') return '#00d9ff';
        if (d.status === 'Offline') return '#ef4444';
        return '#8b92b0';
      })
      .attr("stroke-width", 2);

    // Node labels
    nodeGroup.append("text")
      .attr("x", 12)
      .attr("y", 4)
      .text((d: EchoNode) => d.name)
      .attr("fill", "#ffffff")
      .attr("font-size", "10px")
      .attr("font-family", "Inter, sans-serif");

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
    };
  }, [nodes]);

  return (
    <div className="w-full h-full min-h-[300px] bg-neur-bg/50 rounded-lg overflow-hidden border border-neur-card">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default NetworkGraph;
