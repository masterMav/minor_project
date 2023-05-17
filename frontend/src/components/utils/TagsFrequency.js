import { useEffect, useRef } from "react";
import * as d3 from "d3";

const TagsFrequency = ({ data }) => {
  const chartRef2 = useRef(null);

  useEffect(() => {
    // Sample data

    // Dimensions of the chart
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    // Create SVG container
    const svg = d3
      .select(chartRef2.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.tag))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.frequency)])
      .range([height, 0]);

    // Draw bars
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.tag))
      .attr("y", (d) => yScale(d.frequency))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.frequency))
      .attr("fill", "steelblue");

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("font-size", "11px"); // Set the font size

    // Create x-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .style("text-anchor", "middle")
      .text("Tags");

    // Create y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g").call(yAxis);

    // Create y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left)
      .attr("dy", ".7em")
      .style("text-anchor", "middle")
      .text("Frequency");

    return () => {
      // Clean up the SVG element when the component unmounts
      // eslint-disable-next-line react-hooks/exhaustive-deps
      d3.select(chartRef2.current).selectAll("*").remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={chartRef2}></div>;
};

export default TagsFrequency;
