import './header.css'
import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {ModalType} from "../../interfaces";

const Header = (props:HeaderProps) => {
    const { showModal } = props;

    return (
        <>
            <div className='header_wrap'>
                <h1>Budget</h1>
                <div className='header_wrap-btn_wrap'>
                    <Button variant="secondary" onClick={() => showModal('Income')}>Add Income</Button>
                    <Button variant="outline-secondary" onClick={() => showModal('Expense')}>Add Expense</Button>
                </div>
            </div>
        </>

    )
}

interface HeaderProps {
    showModal: (string:ModalType) => void
}

export default Header