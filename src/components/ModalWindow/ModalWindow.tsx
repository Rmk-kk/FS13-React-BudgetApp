import './modal.css'

import {Button, Modal, Form} from "react-bootstrap";
import {FormEvent, useState} from "react";
import nextId from "react-id-generator";
import {ModalWindowProps} from "../types and interfaces";
import {useAppSelector} from "../../hooks/reduxHook";
import {useDispatch} from "react-redux";
import {closeModal} from "../../redux/slices/modalReducer";
import createDate from "../../service/createDateFunction";



const ModalWindow = (props:ModalWindowProps) => {
    const [amount, setAmount] = useState(0);
    const [source,setSource] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [type,setType] = useState<string | null>(null);

    //validation props
    const [dateError, setDateError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [sourceError,setSourceError] = useState(false);

    //REDUX
    const modalShow = useAppSelector(state => state.modalReducer);
    const dispatch = useDispatch();
    const {handleForm} = props;

    //form Validation
    const validateForm = (e:FormEvent) => {
        e.preventDefault();
        if(!date) {
            setDateError(true);
        }
        if(!source) {
            setSourceError(true)
        }
        if(!amount || amount <= 0) {
            setAmountError(true)
        }

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
        const newDate = createDate(date!)
        const newTransaction = {type, date: newDate, source, amount, id: nextId()};
        handleForm(e, newTransaction);
        dispatch(closeModal(false))
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
            show={modalShow}
            onHide={()=> dispatch(closeModal(false))}
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
                                          setAmountError(false)
                                      }}/>
                        {amountError && <p className='modal-error_message'>Amount must be greater than 0</p>}
                    </Form.Group>
                    {/*SOURCE*/}
                    <Form.Group className="mb-3" controlId="source">
                        <Form.Label>Source</Form.Label>
                        <Form.Control type="text"
                                      value={source}
                                      placeholder="Source of transaction"
                                      onChange={(e) => {
                                          validateInput(e.currentTarget.value, 'source')
                                          setSourceError(false);
                                      }}/>
                        {sourceError && <p className='modal-error_message'>Enter valid transaction source</p>}
                    </Form.Group>

                    {/*AMOUNT*/}
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date"
                                      placeholder="Enter date"
                                      onChange={(e) => {
                                setDate(new Date(e.currentTarget.value))
                                setDateError(false)
                            }}/>
                        {dateError && <p className='modal-error_message'>Enter valid date</p>}
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
                            dispatch(closeModal(false))
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