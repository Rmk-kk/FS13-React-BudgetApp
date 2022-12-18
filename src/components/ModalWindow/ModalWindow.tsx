import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Form, Modal} from "react-bootstrap";
import './modal.css'
import {FormData, SavingsData} from "../App/App";
import {ModalInputType, ModalType} from "../../interfaces";
import * as regexpp from "regexpp";

interface ModalWindowProps {
    modalType : string,
    show: boolean,
    closeModal: () => void,
    handleForm: (data:FormData) => void,
    handleSavings:(amount:number, type:ModalType ) => void
}


const ModalWindow = (props:ModalWindowProps) => {
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('');
    const { modalType, handleForm, handleSavings } = props;

    useEffect(() => {
        setShow(props.show);
    }, [props])

    const handleClose = () => {
        setShow(false);
        setAmount('');
        setSource('');
        props.closeModal();
    }

    const handleFormChange = (data: string, type: ModalInputType) => {
        const letterValidation = /^[a-zA-Z ]*$/ig
        const numberValidation = /^\d*$/
        if(type === 'amount') {
            if(numberValidation.test(data)) {
                setAmount(data)
            }
        } else if(type === 'source') {
            if(letterValidation.test(data)) {
                setSource(data);
            }
        }
    }


    const formElement = (modal:string) => {
        if(modal === 'Expense' || modal === 'Income') {
            return (
                <>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>{modal} amount</Form.Label>
                        <Form.Control type="text"
                                      placeholder={`Enter ${modal.toLowerCase()} amount`}
                                      value={amount}
                                      onChange={(e) => handleFormChange(e.currentTarget.value, 'amount')}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>{modal} source</Form.Label>
                        <Form.Control type="text"
                                      placeholder={`Enter ${modal.toLowerCase()} source`}
                                      value={source}
                                      onChange={(e) => handleFormChange(e.currentTarget.value, 'source')}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="secondary" onClick={() => handleForm({amount, source, modalType})}>
                            Add {modalType}
                        </Button>
                    </Modal.Footer>
                </>
            )
        } else if(modal === 'Savings') {
            return (
                <>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>{modal} target amount</Form.Label>
                        <Form.Control type="text"
                                      placeholder={`Enter savings target`}
                                      value={amount}
                                      onChange={(e) => handleFormChange(e.currentTarget.value, 'amount')}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="secondary" onClick={() => handleSavings(Number(amount), 'Savings')}>
                            Set Savings Target
                        </Button>
                    </Modal.Footer>
                </>
            )
        } else if(modal === 'Transfer') {
            return (
                <>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Transfer to savings account</Form.Label>
                        <Form.Control type="text"
                                      placeholder={`Enter amount to transfer`}
                                      value={amount}
                                      onChange={(e) => handleFormChange(e.currentTarget.value, 'amount')
                        }
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="secondary"
                                type='submit'
                                onClick={() => {
                                    handleSavings(Number(amount), 'Transfer')
                                }}
                        >
                            Transfer
                        </Button>
                    </Modal.Footer>
                </>
            )
        } else if(modal === 'Withdraw') {
            return (
                <>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Withdraw from savings account</Form.Label>
                        <Form.Control type="text"
                                      placeholder={`Enter amount to withdraw`}
                                      value={amount}
                                      onChange={(e) => handleFormChange(e.currentTarget.value, 'amount')}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="secondary"
                                type='submit'
                                onClick={() => {
                                    handleSavings(Number(amount), 'Withdraw')
                                }}>
                            Withdraw
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New {modalType}</Modal.Title>
                </Modal.Header>
                <Form className={'modal-form'} onSubmit={e => {
                    e.preventDefault();
                    handleClose();
                }}>
                    {formElement(modalType)}
                </Form>
            </Modal>
        </>
    )
}

export default ModalWindow