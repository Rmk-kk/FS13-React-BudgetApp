import './transactions-content.css'
import {Button, Col} from "react-bootstrap";
import React from "react";
import {TransactionContentProps} from "../types and interfaces";
import {useAppSelector} from "../../hooks/reduxHook";
import {useDispatch} from "react-redux";
import {removeTransaction} from "../../redux/slices/listReducer";



const TransactionsContent = ({list}:TransactionContentProps) => {

    const balance = useAppSelector(state => state.balanceReducer)
    const dispatch = useDispatch();


    const elements = list.map(item => {
        const {id, amount, type, source, date} = item;
        let clazz;
        if(type === 'income') {
            clazz = 'income-transaction'
        } else if(type === 'expense') {
            clazz = 'expense-transaction'
        } else if(type ==='transfer' || type === 'withdraw') {
            clazz = 'savings-transaction'
        }

        return (
            <li className={`transaction_list-item ${clazz}`} key={id}>
                <div>Amount: {amount} $</div>
                <div>{type}</div>
                <div>Source: {source}</div>
                <div>Date: {date}</div>
                <Button variant="secondary"
                        size="sm"
                        onClick={()=>dispatch(removeTransaction(id))}
                        disabled={item.type === 'income' && balance.total - item.amount < 0}>
                    Delete
                </Button>
            </li>
        )
    })
    return (
        <Col>
            <ul className='transaction_list'>
                {elements}
            </ul>
        </Col>
    )
}

export default TransactionsContent