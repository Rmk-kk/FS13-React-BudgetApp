import {FormEvent, useState} from "react";
import nextId from "react-id-generator";
import {Button, Form, Modal} from "react-bootstrap";
import {SavingsType} from "../Savings-content/SavingsContent";
import {listItem} from "../App/App";


interface SavingsModalProps {
    savingsShow: boolean,
    handleSavingsWindow: (status:boolean) => void,
    savingsModalType: SavingsType,
    handleForm: (e:FormEvent,data:listItem) => void,
    type: 'target' | 'withdraw' | 'transfer' | null,
    setTargetSavings: (amount:number) => void,
}
const SavingsModal = ({handleSavingsWindow, savingsShow, savingsModalType, handleForm, type, setTargetSavings}:SavingsModalProps) => {

    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState<Date | null>(null);

    //form Validation
    const validateForm = (e:FormEvent) => {
        e.preventDefault();
        // if(date && amount > 0 && type !== null && amount) {
        //     buildDataFromForm(e);
        // }
        buildDataFromForm(e);
    }

    //send data to APP
    const buildDataFromForm = (e:FormEvent) => {
        const newTransaction = {type, date: new Date(), source: 'savings', amount, id: nextId()};
        if(type === 'withdraw' || type === 'transfer') {
            handleForm(e, newTransaction);
        } else if(type ==='target') {
            setTargetSavings(amount)
        }
        handleSavingsWindow(false)
        resetStates();
    }

    //Reset States
    const resetStates = () => {
        setAmount(0);
        setDate(null);
    }

    return (
        <Modal
            show={savingsShow}
            onHide={()=> handleSavingsWindow(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>New {savingsModalType}</Modal.Title>
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

                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => handleSavingsWindow(false)}>
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