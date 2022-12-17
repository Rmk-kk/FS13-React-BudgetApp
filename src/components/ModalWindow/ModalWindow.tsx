import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Form, Modal} from "react-bootstrap";
import './modal.css'
import {FormData} from "../app/App";

interface ModalWindowProps {
    modalType : string,
    show: boolean,
    closeModal: () => void,
    handleForm: (data:FormData) => void,
}


const ModalWindow = (props:ModalWindowProps) => {
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('');
    const [currType, setCurrType] = useState('');


    useEffect(() => {
        setShow(props.show);
    }, [props])
    const handleClose = () => {
        setShow(false);
        props.closeModal();
    }

    const handleFormChange = (data: string, type: 'amount' | 'source') => {
        if(type === 'amount') {
            setAmount(data);
        } else if(type === 'source') {
            setSource(data);
        }
    }

    const { modalType, handleForm } = props;


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New {modalType}</Modal.Title>
                </Modal.Header>
                <Form className={'modal-form'}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>{modalType} amount</Form.Label>
                        <Form.Control type="number"
                                      placeholder={`Enter ${modalType.toLowerCase()} amount`}
                                      onChange={(e) => handleFormChange(e.currentTarget.value, 'amount')}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>{`${modalType} source`}</Form.Label>
                        <Form.Control type="text"
                                      placeholder={`Enter ${modalType.toLowerCase()} source`}
                                      onChange={(e) => handleFormChange(e.currentTarget.value, 'source')}
                        />
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="secondary" onClick={() => handleForm({amount, source, modalType})}>
                            Add {modalType}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalWindow