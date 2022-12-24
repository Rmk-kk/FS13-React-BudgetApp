import {Card, ListGroup} from "react-bootstrap";
import {useAppSelector} from "../../hooks/reduxHook";




const BalanceComponent = () => {
    const balance = useAppSelector(state => state.balanceReducer)
    const {total, savings} = balance;

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