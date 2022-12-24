import {Button, Card, Col, ProgressBar} from "react-bootstrap";
import React, {useState} from "react";
import SavingsModal from "../Savings-modal/SavingsModal";
import {SavingsContentProps, SavingsType} from "../types and interfaces";

import './savings-content.css'
import {useAppSelector} from "../../hooks/reduxHook";


const SavingsContent = ({handleForm}:SavingsContentProps) => {
    const [savingsShow, setSavingsShow] = useState<boolean>(false);
    const balance = useAppSelector(state => state.balanceReducer);
    const [target, setTarget] = useState<number>(1000)
    const [savingsModalType, setSavingsModalType] = useState<SavingsType>(null);
    const progress = Math.round(balance.savings/target*100);

    const handleButtonClick = (type:SavingsType) => {
        setSavingsShow(true)
        setSavingsModalType(type);
    }

    const setTargetSavings = (amount:number) => {
        if(amount < 0) {
            return false
        }
        setTarget(amount);
    }

    return (
        <Col xs lg="4">
            <Card style={{ width: '18rem' }} className='savings-content'>
                <Card.Body>
                    <Card.Title>Your Savings Account</Card.Title>
                    <Card.Text>Current savings: {balance.savings}</Card.Text>
                    <Card.Text>Target: {target}$</Card.Text>
                    <ProgressBar now={progress} label={`${progress}%`}/>
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
                setSavingsShow={setSavingsShow}
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