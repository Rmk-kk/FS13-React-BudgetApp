import {Button, Form, Modal} from "react-bootstrap";
import {FormEvent, useEffect, useState} from "react";
import {useAppSelector} from "../../hooks/reduxHook";
import createDate from "../../service/createDateFunction";
import {EditModalProps, listItem} from "../types and interfaces";
import {useDispatch} from "react-redux";
import {editTransaction} from "../../redux/slices/listReducer";

const EditModalWindow = (props:EditModalProps) => {
    const list =useAppSelector(state => state.listReducer);
    const balance = useAppSelector(state => state.balanceReducer)
    const dispatch = useDispatch();
    const [transaction, setTransaction] = useState<listItem | null>(null);
    const [amount, setAmount] = useState(0);
    const [source,setSource] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const {edit, setEdit, transactionId} = props;

    useEffect(() => {
        const item = list.find(item => item.id === transactionId);
        if(item) {
            setTransaction(item);
            setAmount(item.amount);
            setSource(item.source);
        }
    }, [transactionId])

    const validateForm = (e:FormEvent) => {
        e.preventDefault();
        if(transaction && amount > 0 && source && date) {
            const newTransaction = {id: transaction.id, amount, type: transaction.type, date: createDate(date) , source};
            if(balance.total - newTransaction.amount >= 0) {
                dispatch(editTransaction(newTransaction));
                setEdit(false)
            } else {
                console.log('Balance cannot go below zero')
            }
        }
    }


    const validateInput = (data:string, type:'amount' | 'source') => {
        if(type === 'source' && data.match(/^[A-Za-z ,:]*$/)) {
            setSource(data)
        } else if(type === 'amount' && data.match(/^[0-9]*$/)) {
            setAmount(Number(data))
        }
    }

    return (
        <Modal
            show={edit}
            onHide={()=> setEdit(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Edit Transaction</Modal.Title>
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

                    {/*Date*/}
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date"
                                      placeholder="Enter date"
                                      onChange={(e) => setDate(new Date(e.currentTarget.value))}/>
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => {
                            setEdit(false)
                        }}>
                            Close
                        </Button>
                        <Button variant="secondary" type='submit'>Edit Transaction</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditModalWindow;