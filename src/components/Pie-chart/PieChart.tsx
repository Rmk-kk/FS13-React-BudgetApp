import {Card, ListGroup} from "react-bootstrap";
import {useEffect, useRef , useState} from "react";
import {Balance, PieCharProps} from "../types and interfaces";
import * as d3 from "d3"

interface Data {
    name: string,
    share: number
}

const PieChart = ({balance}:PieCharProps) => {
    const svgRef = useRef(null);

    let data: Data[] = [
        { name: "Income", share: balance.income },
        { name: "Savings", share: balance.savings },
        { name: "Expenses", share: balance.expense },
    ]

    const names = data.map(item => item.name)
    const shares = data.map(item => item.share)

    const drawChart = () => {
        d3.select(svgRef.current)
            .select('svg')
            .remove();
        const colorScale = d3
            .scaleSequential()
            .interpolator(d3.interpolateCool)
            .domain([0, data.length]);
        const svg = d3
            .select(svgRef.current)
            .append('svg')
            .attr("width", 170)
            .attr("height", 170)
            .style("margin", 10)
            .append('g')
            .attr('style', `transform: translate(50%, 50%)`);
        const arcGenerator = d3
            .arc<d3.PieArcDatum<Data>>()
            .innerRadius(0)
            .outerRadius(80);
        const pieGenerator = d3
            .pie<Data>()
            .padAngle(0)
            .value((d) => d.share)
        const arc = svg
            .selectAll()
            .data(pieGenerator(data))
            .enter();
        arc
            .append('path')
            .attr('d', arcGenerator)
            .style('fill', (_, i) => colorScale(i))
            .style('stroke', '#000000')
            .style('stroke-width', 0)
        arc
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text((d) => d.data.name)
            .style('fill', (_, i) => colorScale(data.length - i))
            .attr('transform', (d) => {
                const [x, y] = arcGenerator.centroid(d);
                return `translate(${x}, ${y})`;
            });
    }
    useEffect(() => {
        drawChart()
    }); // redraw chart if data changes


    return (
        <Card style={{ width: '18rem' }}>
            <ListGroup variant="flush">
                <div ref={svgRef}></div>
            </ListGroup>
        </Card>
    )
}

export default PieChart