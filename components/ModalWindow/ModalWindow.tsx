import {Button, Modal, Form} from "react-bootstrap";
import {FormEvent, useState} from "react";
import nextId from "react-id-generator";
import {listItem} from "../App/App";

interface ModalWindowProps {
    handleModalWindow: (data:boolean) => void,
    handleForm:(e:FormEvent, data:listItem) => void,
    show: boolean,
}
const ModalWindow = (props:ModalWindowProps) => {
    const [amount, setAmount] = useState(0);
    const [source,setSource] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [type,setType] = useState<string | null>(null);
    const {handleModalWindow, handleForm, show} = props;

    //form Validation
    const validateForm = (e:FormEvent) => {
        e.preventDefault();
        if(date && source && amount > 0 && type !== null && amount) {
            buildDataFromForm(e);
        }
    }

    //send data to APP
    const buildDataFromForm = (e:FormEvent) => {
        const newTransaction = {type, date, source, amount, id: nextId()};
        handleForm(e, newTransaction);
        handleModalWindow(false)
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
            onHide={()=> handleModalWindow(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>New Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => validateForm(e)}>

                    {/*AMOUNT*/}
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text"
                                      required
                                      placeholder="Enter transaction amount"
                                      onChange={(e) => setAmount(Number(e.currentTarget.value))}/>
                    </Form.Group>
                    {/*SOURCE*/}
                    <Form.Group className="mb-3" controlId="source">
                        <Form.Label>Source</Form.Label>
                        <Form.Control type="text"
                                      required
                                      placeholder="Source of transaction"
                                      onChange={(e) => setSource(e.currentTarget.value)}/>
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
                        <Button variant="outline-secondary" onClick={() => handleModalWindow(false)}>
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