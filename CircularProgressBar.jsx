import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import "./circularProgressBar.scss";

export default function CircularProgressBar({ progress, workload}) {
  const svgRef = useRef();
  useEffect(() => {
    const width = 500;
    const height = Math.min(500, width / 2);
    const outerRadius = height / 2 - 10;
    const innerRadius = outerRadius * 0.75;
  
    // https://tauday.com/tau-manifesto
    const tau = 2 * Math.PI;
  
    // Create the SVG container, and apply a transform such that the origin is the
    // center of the canvas. This way, we don’t need to position arcs individually.
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);
    const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
    // An arc function with all values bound except the endAngle. So, to compute an
    // SVG path string for a given angle, we pass an object with an endAngle
    // property to the arc function, and it will return the corresponding string.
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0);
  
    // Add the background arc, from 0 to 100% (tau).
    const background = g.append("path")
      .datum({endAngle: tau})
      .style("fill", "#ddd")
      .attr("d", arc);
    
    // Add the foreground arc in orange, currently showing 12.7%.
    const foreground = g.append("path")
      .datum({endAngle: (progress/workload) * tau})
      .style("fill", "orange")
      .attr("d", arc);
      
  }, []);
  return (
    <div id='circular-progress-bar'>
      <svg ref={svgRef}></svg>
      <div className="progress">{((progress/workload) * 100).toFixed()}%</div>
    </div>
  )
}
