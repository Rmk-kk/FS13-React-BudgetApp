import {Row, Col, ProgressBar, Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import './footer.css'
import {SavingsData} from "../App/App";
const Footer = (props:FooterProps) => {

    const {balance,savings} = props;
    return (
        <Row>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body className='balance-card'>
                        <Card.Title className='balance-card_title'>Your balance: {balance + savings.currentAmount}$</Card.Title>
                        <Card.Title>Available balance: {balance}$</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

interface FooterProps {
    balance: number,
    savings: SavingsData,
}

export default Footer