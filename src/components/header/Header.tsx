import './header.css'
import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";
import ModalWindow from "../ModalWindow/ModalWindow";


const Header = (props:HeaderProps) => {
    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const showIncome = () => {
        setShow(true);
        setType('Income')
    }

    const showExpense = () =>{
        setShow(true);
        setType('Expense');
    }

    const closeModal = () => {
        setShow(false);
    }

    const { handleForm } = props;

    return (
        <>
            <div className='header_wrap'>
                <h1>Budget</h1>
                <div className='header_wrap-btn_wrap'>
                    <Button variant="secondary" onClick={() => showIncome()}>Add Income</Button>
                    <Button variant="outline-secondary" onClick={() => showExpense()}>Add Expense</Button>
                </div>
            </div>
            <ModalWindow modalType={type} show={show} closeModal={closeModal} handleForm={handleForm}/>
        </>

    )
}

interface HeaderProps {
    handleForm: (data:any) => void
}

export default Header