import React, {FormEvent, useEffect, useState} from 'react';
import './App.css';
import {Container, Row} from "react-bootstrap";
import Header from "../Header/Header";
import SavingsContent from "../Savings-content/SavingsContent";
import TransactionsContent from "../Transactions-content/TransactionsContent";
import ModalWindow from "../ModalWindow/ModalWindow";
import BalanceComponent from "../BalanceComponent/BalanceComponent";
import PieChart from "../Pie-chart/PieChart";
import {Balance, listItem} from "../types and interfaces";



const App = () => {
    const [list, setList] = useState<listItem[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [changingItem, setChangingItem] = useState<listItem | undefined>(undefined);
    const [filterInput, setFilterInput] = useState('');
    const [radioFilter, setRadioFilter] = useState<string>('all');
    const [balance, setBalance] = useState<Balance>({income: 0, expense: 0, savings: 0, total: 0, target: 1000});

    useEffect(()=>{
        let income = 0,
            expense = 0,
            savings = 0,
            total;
        list.forEach(item => {
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
        setBalance({target: amount,
            total:balance.total,
            income: balance.income,
            savings: balance.savings,
            expense:balance.expense
        })
    }

    //FILTER LOGIC
    //filterListByInput
    const onFilterList = (search:string, list:listItem[]) => {
        if(search.length === 0) {
            return list
        }

        return list.filter(item => {
            return item.source.toLowerCase().indexOf(search.toLowerCase()) > -1
        })
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

    //EDIT - DELETE logic
    //DELETE
    const onDelete = (id:string) => {
        //disabled = {option === income && balance - item.amount < 0}
        setList(prevList => prevList.filter(item => item.id !== id));
        console.log(id)
    }

    //EDIT
    const onItemChange = (id:string) => {
        const item = list.find(item => item.id === id);
        if(item) {
            setChangingItem(item);
            setShow(true)
        }
    }

    const filteredList = onRadioFilter(radioFilter, list);
    const finalList = onFilterList(filterInput,filteredList!);

    return (
    <Container className="App">
      <Header
          setShow={setShow}
          setFilterInput={setFilterInput}
          setRadioFilter={setRadioFilter}/>
        <Row>
            <TransactionsContent
                balance={balance}
                onDelete={onDelete}
                list={finalList}
                onItemChange={onItemChange}/>
            <SavingsContent
                setTargetSavings = {setTargetSavings}
                handleForm={handleForm}
                balance={balance}/>
        </Row>
        <hr/>
        <div className='footer-container'>
            <BalanceComponent balance={balance}/>
            <PieChart balance={balance}/>
        </div>
        <ModalWindow
            setShow={setShow}
            show={show}
            handleForm={handleForm}
        />
    </Container>
    );
}

export default App;
