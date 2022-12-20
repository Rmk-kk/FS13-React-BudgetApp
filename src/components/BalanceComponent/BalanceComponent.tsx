import {Card, ListGroup} from "react-bootstrap";
import {FooterProps} from "../types and interfaces";




const BalanceComponent = ({balance}:FooterProps) => {
    const {savings, total} = balance!;
    return (
        <Card style={{ width: '18rem' }}>
            <ListGroup variant="flush">
                <ListGroup.Item>Your Balance: {total + savings}</ListGroup.Item>
                <ListGroup.Item>Available balance: {total}</ListGroup.Item>
                <ListGroup.Item>Savings account: {savings}</ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default BalanceComponent