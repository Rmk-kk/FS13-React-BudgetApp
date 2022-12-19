import React, {FormEvent, useEffect, useState} from 'react';
import './App.css';
import {Container, Row} from "react-bootstrap";
import Header from "../Header/Header";
import SavingsContent from "../Savings-content/SavingsContent";
import TransactionsContent from "../Transactions-content/TransactionsContent";
import ModalWindow from "../ModalWindow/ModalWindow";
import Footer from "../Footer/Footer";

export interface listItem {
    amount: number,
    type: string | null,
    id: string,
    source: string,
    date: Date | null
}

export interface Balance extends Object{
    income: number,
    expense: number,
    savings: number,
    total: number,
    target: number
}

const App = () => {
    const [list, setList] = useState<listItem[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [filterInput, setFilterInput] = useState('');
    const [radioFilter, setRadioFilter] = useState<string>('all');
    const [balance, setBalance] = useState<Balance>({income: 0, expense: 0, savings: 0, total: 0, target: 1000});


    useEffect(()=>{
        console.log(`update`)
        let income = 0,
            expense = 0,
            savings = 0,
            total;
        list.map(item => {
            if(item.type === 'income') {
                income += item.amount;
            }
            else if(item.type === 'expense') {
                expense += item.amount;
            }
            else if(item.type === 'transfer') {
                savings += item.amount;
            }
            else if(item.type === 'withdraw') {
                savings -= item.amount;
            }
        })
        total = income - expense - savings;
        setBalance({income, total, savings, expense, target: balance.target});
    },[list])


    //Modal window
    const handleModalWindow = (status:boolean) => {
        setShow(status);
    }

    //New transactions form
    const handleForm = (e:FormEvent,data:listItem) => {
        e.preventDefault();
        e.stopPropagation();
        if(validateTransaction(data)) {
            setList([...list, data])
        }
    }

    //validate transaction
    const validateTransaction = (data:listItem) => {
        if(data.type === 'transfer' && data.amount > balance.total && data.amount > balance.savings) {
            console.log(`not enough money on balance`)
            return false
        }
        else if(data.type === 'withdraw' && data.amount > balance.savings) {
            console.log(`not enough money in savings`)
            return false
        }
        else if(data.type === 'expense' && balance.income - balance.expense - data.amount < 0) {
            console.log(`not enough money for expense`)
            return false
        }
        return true
    }

    //set target savings
    const setTargetSavings = (amount:number) => {
        if(amount < 0) {
            return false
        }
        setBalance({target: amount, total:balance.total,income: balance.income, savings: balance.savings, expense:balance.expense})
    }

    //FILTER LOGIC

    //updateFilterInputstate
    const onFilterUpdate = (search:string) => {
        setFilterInput(search);
    }

    //filterListByInput
    const onFilterList = (search:string, list:listItem[]) => {
        if(search.length === 0) {
            return list
        }

        return list.filter(item => {
            return item.source.toLowerCase().indexOf(search.toLowerCase()) > -1
        })
    }

    //Radio buttons logic

    //update radio value

    const onRadioUpdate = (value: string) => {
        setRadioFilter(value);
    }

    //filter by radio button value
    const onRadioFilter = (type:string, list:listItem[]) => {
        if(type === 'all') {
            return list
        }
        else if(type === 'income') {
            return list.filter(item => {
                return item.type === 'income'
            })
        }
        else if(type === 'expense') {
            return list.filter(item => {
                return item.type === 'expense'
            })
        }
    }

    const filteredList = onRadioFilter(radioFilter, list);
    const finalList = onFilterList(filterInput,filteredList!);
    return (
    <Container className="App">
      <Header
          handleModalWindow={handleModalWindow}
          onFilterUpdate={onFilterUpdate}
          onRadioUpdate={onRadioUpdate}/>
        <Row>
            <TransactionsContent
                list={finalList}/>
            <SavingsContent
                setTargetSavings = {setTargetSavings}
                handleForm={handleForm}
                balance={balance}/>
        </Row>
        <hr/>
        <Footer balance={balance}/>
        <ModalWindow
            handleModalWindow={handleModalWindow}
            show={show}
            handleForm={handleForm}
        />
    </Container>
    );
}

export default App;
