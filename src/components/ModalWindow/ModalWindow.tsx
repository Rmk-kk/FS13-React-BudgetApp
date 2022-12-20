import {Button, Modal, Form} from "react-bootstrap";
import {FormEvent, useEffect, useState} from "react";
import nextId from "react-id-generator";
import {ModalWindowProps} from "../types and interfaces";



const ModalWindow = (props:ModalWindowProps) => {
    const [amount, setAmount] = useState(0);
    const [source,setSource] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [type,setType] = useState<string | null>(null);
    const {setShow, handleForm, show} = props;

    //form Validation
    const validateForm = (e:FormEvent) => {
        e.preventDefault();
        if(date && source && amount > 0 && type !== null && amount) {
            buildDataFromForm(e);
        }
    }

    //inputValidations
    const validateInput = (data:string, type:'amount' | 'source') => {
        if(type === 'source' && data.match(/^[A-Za-z ,:]*$/)) {
            setSource(data)
        } else if(type === 'amount' && data.match(/^[0-9]*$/)) {
            setAmount(Number(data))
        }
    }

    //send data to APP
    const buildDataFromForm = (e:FormEvent) => {
        const newTransaction = {type, date, source, amount, id: nextId()};
        handleForm(e, newTransaction);
        setShow(false)
        resetStates();
    }

    //Reset States
    const resetStates = () => {
        setAmount(0);
        setSource('');
        setDate(null);
        setType('');
    }


    return (
        <Modal
            show={show}
            onHide={()=> setShow(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>New Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => validateForm(e)}>

                    {/*AMOUNT*/}
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text"
                                      required
                                      value={amount}
                                      placeholder="Enter transaction amount"
                                      onChange={(e) => {
                                          validateInput(e.currentTarget.value, 'amount')
                                      }}/>
                    </Form.Group>
                    {/*SOURCE*/}
                    <Form.Group className="mb-3" controlId="source">
                        <Form.Label>Source</Form.Label>
                        <Form.Control type="text"
                                      required
                                      value={source}
                                      placeholder="Source of transaction"
                                      onChange={(e) => {validateInput(e.currentTarget.value, 'source')}}/>
                    </Form.Group>

                    {/*AMOUNT*/}
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date"
                                      placeholder="Enter date"
                                      onChange={(e) => setDate(new Date(e.currentTarget.value))}/>
                    </Form.Group>

                    {/*TYPE*/}
                    <Form.Group className="mb-3" controlId="checkbox">
                        <Form.Check
                            inline
                            label="Income"
                            name="group1"
                            type='radio'
                            value='income'
                            id={`inline-radio-1`}
                            onChange={(e) => setType(e.currentTarget.value)}
                        />
                        <Form.Check
                            inline
                            label="Expense"
                            value='expense'
                            name="group1"
                            type='radio'
                            id={`inline-radio-2`}
                            onChange={(e) => setType(e.currentTarget.value)}
                        />

                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => {
                            setShow(false)
                            resetStates()
                        }}>
                            Close
                        </Button>
                        <Button variant="secondary" type='submit'>Add Transaction</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </Modal>
    )

}

export default ModalWindow;