import Card from "react-bootstrap/Card";
import {Button, ProgressBar} from "react-bootstrap";
import {useEffect, useState} from "react";
import './savings.css'
import {FormData, SavingsData} from "../App/App";
import {ModalType} from "../../interfaces";
const SavingsCard = (props:SavingsCardProps) => {
    const {showModal, savings, resetSavingsTarget} = props;

    const currentPercent = (savings.target != 0) ? Math.round((savings.currentAmount * 100) / savings.target) : 0;
    // savings.target = 10000 , savings.current = 500

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body className='savings-card'>
                <Card.Title>Your savings: {savings.currentAmount}$</Card.Title>
                <Card.Text>Target: ${savings.target}</Card.Text>
                <ProgressBar animated now={currentPercent} label={`${currentPercent}%`}/>
                <Button variant="secondary" onClick={()=>showModal('Transfer')}>Transfer to savings</Button>
                <div className='savings-card_wrap'>
                    <Button variant="outline-secondary" onClick={()=>showModal('Savings')}>Set savings target</Button>
                    <Button variant="outline-secondary" onClick={()=>resetSavingsTarget()}>Reset</Button>
                </div>
                <Button variant="secondary" onClick={()=>showModal('Withdraw')}>Withdraw from savings</Button>

            </Card.Body>
        </Card>
    )
}

interface SavingsCardProps {
    handleForm: (data:FormData) => void,
    showModal: (type:ModalType) => void,
    savings: SavingsData,
    resetSavingsTarget: () => void,
}
export default SavingsCard