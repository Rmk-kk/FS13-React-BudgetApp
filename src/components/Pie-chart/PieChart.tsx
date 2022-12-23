import {Card, ListGroup} from "react-bootstrap";
import {useEffect, useRef , useState} from "react";
import {Balance, PieCharProps} from "../types and interfaces";
import * as d3 from "d3"

interface Data {
    name: string,
    share: number
}

const PieChart = ({balance}:PieCharProps) => {
    const [data, setData] = useState<Data[]>([])
    const svgRef = useRef(null);

    useEffect(() => {
        setData(sortData(balance))
    },[balance])

    useEffect(() => {
        drawChart()
    }, [data]);

    const sortData = (balance:Balance) => {
        let array = [];
        if(balance.income > 0) {
            array.push({name: "Income", share: balance.income});
        }
        if(balance.expense > 0) {
            array.push({ name: "Expenses", share: balance.expense })
        }
        if(balance.savings > 0) {
            array.push({ name: "Savings", share: balance.savings });
        }
        return array;
    }


    const drawChart = () => {
        d3.select(svgRef.current)
            .select('svg')
            .remove();
        const colorScale = d3
            .scaleSequential()
            .interpolator(d3.interpolateCividis)
            .domain([0, data.length]);
        const colorScaleText = d3
            .scaleSequential()
            .interpolator(d3.interpolateWarm)
            .domain([0, data.length])
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
            .style('fill', (_, i) => colorScaleText(data.length - i))
            .attr('transform', (d) => {
                const [x, y] = arcGenerator.centroid(d);
                return `translate(${x}, ${y})`;
            });
    }
     // redraw chart if data changes


    return (
        <Card style={{ width: '18rem' }}>
            <ListGroup variant="flush">
                <h2 style={{fontSize : '18px', marginTop: '10px'}}>Your Pie Chart</h2>
                <div ref={svgRef}></div>
            </ListGroup>
        </Card>
    )
}

export default PieChart