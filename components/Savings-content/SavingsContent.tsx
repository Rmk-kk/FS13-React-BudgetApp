import {Button, Card, Col, ProgressBar} from "react-bootstrap";
import React, {FormEvent, useState} from "react";
import './savings-content.css'
import SavingsModal from "../Savings-modal/SavingsModal";
import {Balance, listItem} from "../App/App";

interface SavingsContentProps {
    handleForm: (e:FormEvent,data:listItem) => void,
    balance: Balance,
    setTargetSavings: (amount:number) => void
}

export type SavingsType = 'target' | 'withdraw' | 'transfer' | null;

const SavingsContent = ({handleForm, balance, setTargetSavings}:SavingsContentProps) => {
    const [savingsShow, setSavingsShow] = useState<boolean>(false);
    const [savingsModalType, setSavingsModalType] = useState<SavingsType>(null);

    const handleSavingsWindow = (status:boolean) => {
        setSavingsShow(status)
    }

    const handleButtonClick = (type:SavingsType) => {
        handleSavingsWindow(true)
        setSavingsModalType(type);
    }

    return (
        <Col xs lg="4">
            <Card style={{ width: '18rem' }} className='savings-content'>
                <Card.Body>
                    <Card.Title>Your Savings Account</Card.Title>
                    <Card.Text>Current savings: {balance.savings}</Card.Text>
                    <Card.Text>Target: {balance.target}$</Card.Text>
                    <ProgressBar now={Math.round(balance.savings/balance.target*100)} />
                </Card.Body>
                <Card.Footer>
                    <Button variant="secondary" onClick={() => handleButtonClick('transfer') }>Transfer to savings</Button>
                    <div className='savings-content_wrap'>
                        <Button variant="outline-secondary" onClick={() => handleButtonClick('target')}>Set Target</Button>
                        <Button variant="secondary" onClick={()=>setTargetSavings(1000)}>Reset</Button>
                    </div>
                    <Button variant="secondary" onClick={() => handleButtonClick('withdraw')}>Withdraw from savings</Button>
                </Card.Footer>
            </Card>

            <SavingsModal
                handleSavingsWindow={handleSavingsWindow}
                setTargetSavings={setTargetSavings}
                savingsShow={savingsShow}
                savingsModalType={savingsModalType}
                handleForm={handleForm}
                type={savingsModalType}
            />
        </Col>
    )
}

export default SavingsContent