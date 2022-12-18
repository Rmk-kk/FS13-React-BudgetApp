import Card from 'react-bootstrap/Card';
import {CardInfo} from "../../interfaces";
import {FC} from "react";
import './cardItem.css'
const CardItem:FC<CardInfo> = ({title, amount, source}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>Source: {source}</Card.Text>
                <Card.Text>Amount: {amount}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardItem;