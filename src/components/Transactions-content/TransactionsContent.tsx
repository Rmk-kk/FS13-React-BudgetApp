import './transactions-content.css'
import {Col} from "react-bootstrap";
import React from "react";
import {listItem} from "../App/App";


interface TransactionContentProps {
    list: listItem[]
}
const TransactionsContent = ({list}:TransactionContentProps) => {

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