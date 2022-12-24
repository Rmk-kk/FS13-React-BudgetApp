import {FormEvent, useState} from "react";
import nextId from "react-id-generator";
import {Button, Form, Modal} from "react-bootstrap";
import {SavingsModalProps} from "../types and interfaces";
import createDate from "../../hooks/dateHook";



const SavingsModal = ({setSavingsShow,
                          savingsShow,
                          savingsModalType,
                          handleForm, type,
                          setTargetSavings}:SavingsModalProps) => {

    const [amount, setAmount] = useState(0);


    //validate input
    const validateInput = (data:string) => {
        if(data.match(/^[0-9]*$/)){
            setAmount(Number(data))
        }
    }

    //send data to APP
    const buildDataFromForm = (e:FormEvent) => {
        e.preventDefault();
        const newDate = createDate(new Date());
        const newTransaction = {type, date: newDate, source: 'savings', amount, id: nextId()};
        if(type === 'withdraw' || type === 'transfer') {
            handleForm(e, newTransaction);
        } else if(type ==='target') {
            setTargetSavings(amount)
        }
        setSavingsShow(false)
        resetStates();
    }

    //Reset States
    const resetStates = () => {
        setAmount(0);
    }



    return (
        <Modal
            show={savingsShow}
            onHide={()=> setSavingsShow(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>New {savingsModalType}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => buildDataFromForm(e)}>

                    {/*AMOUNT*/}
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text"
                                      required
                                      value={amount}
                                      placeholder="Enter transaction amount"
                                      onChange={(e) => validateInput(e.currentTarget.value)}/>
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setSavingsShow(false)}>
                            Close
                        </Button>
                        {(type === 'target') ?
                            <Button variant="secondary" type='submit'>Change target</Button> :
                            <Button variant="secondary" type='submit'>Add Transaction</Button>
                        }
                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </Modal>
    )


}

export default SavingsModal