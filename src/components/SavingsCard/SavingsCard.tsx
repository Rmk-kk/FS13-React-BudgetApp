import Card from "react-bootstrap/Card";
import {Button, ProgressBar} from "react-bootstrap";
import {useEffect, useState} from "react";
import './savings.css'
import {FormData, SavingsData} from "../App/App";
import {ModalType} from "../../interfaces";
const SavingsCard = (props:SavingsCardProps) => {
    const {showModal, savings} = props;

    const currentPercent = Math.round((savings.currentAmount * 100) / savings.target);
    // savings.target = 10000 , savings.current = 500

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body className='savings-card'>
                <Card.Title>Your savings: {savings.currentAmount}$</Card.Title>
                <Card.Text>Target: ${savings.target}</Card.Text>
                <ProgressBar animated now={currentPercent} label={`${currentPercent}%`}/>
                <Button variant="secondary" onClick={()=>showModal('TransferToSavings')}>Transfer to savings</Button>
                <Button variant="outline-secondary" onClick={()=>showModal('Savings')}>Set savings target</Button>
            </Card.Body>
        </Card>
    )
}

interface SavingsCardProps {
    handleForm: (data:FormData) => void,
    showModal: (type:ModalType) => void,
    savings: SavingsData
}
export default SavingsCard