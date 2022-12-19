import {Card, ListGroup} from "react-bootstrap";
import { Chart } from "react-google-charts";
import {Balance} from "../App/App";
import {useEffect, useState} from "react";

interface PieCharProps {
    balance: Balance
}
const PieChart = ({balance}:PieCharProps) => {
    const [data, setData] = useState([
        ["Total", "Hours per Day"],
        ["Expense", balance.expense],
        ["Income", balance.income],
        ["Savings", balance.savings],
    ]);

    useEffect(() => {
        setData([
            ["Total", "Hours per Day"],
            ["Expense", balance.expense],
            ["Income", balance.income],
            ["Savings", balance.savings],
        ])
    }, [balance])

    const options = {
        title: "Your account overview",
        is3D: true,
    };

    return (
        <Card style={{ width: '18rem' }}>
            <ListGroup variant="flush">
                <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"200px"}
                />
            </ListGroup>
        </Card>
    )
}

export default PieChart