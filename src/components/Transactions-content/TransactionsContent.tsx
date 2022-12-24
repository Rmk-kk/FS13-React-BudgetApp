import './transactions-content.css'
import {Button, Col} from "react-bootstrap";
import React from "react";
import {TransactionContentProps} from "../types and interfaces";
import {useAppSelector} from "../../hooks/reduxHook";



const TransactionsContent = ({list, onDelete}:TransactionContentProps) => {

    const balance = useAppSelector(state => state.balanceReducer)

    const setDateState = (data: Date) => {
        const today = new Date(data);
        const year = today.getFullYear();
        let mm:string | number = today.getMonth() + 1; // Months start at 0!
        let dd:string | number = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return `${dd}-${mm}-${year}`;
    }

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
                <div>Date: {setDateState(date!)}</div>
                <Button variant="secondary"
                        size="sm"
                        onClick={()=>onDelete(id)}
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