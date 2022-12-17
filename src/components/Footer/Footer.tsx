import {Row, Col, ProgressBar, Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import './footer.css'
const Footer = (props:FooterProps) => {

    const {balance} = props;
    return (
        <Row>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body className='balance-card'>
                        <Card.Title>Your balance: {balance}$</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

interface FooterProps {
    balance: number
}

export default Footer