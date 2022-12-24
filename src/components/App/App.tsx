import React, {FormEvent, useEffect, useState} from 'react';
import './App.css';
import {Container, Row} from "react-bootstrap";
import Header from "../Header/Header";
import SavingsContent from "../Savings-content/SavingsContent";
import TransactionsContent from "../Transactions-content/TransactionsContent";
import ModalWindow from "../ModalWindow/ModalWindow";
import BalanceComponent from "../BalanceComponent/BalanceComponent";
import PieChart from "../Pie-chart/PieChart";
import {listItem} from "../types and interfaces";
import {useDispatch} from "react-redux";
import {addTransaction, removeTransaction} from "../../redux/slices/listReducer";
import {useAppSelector} from "../../hooks/reduxHook";
import  {calculateBalance} from "../../redux/slices/balanceSlice";


const App = () => {
    const list =useAppSelector(state => state.listReducer);
    const balance = useAppSelector(state => state.balanceReducer)
    const dispatch = useDispatch();
    const [filterInput, setFilterInput] = useState('');
    const [radioFilter, setRadioFilter] = useState<string>('all');


    useEffect(()=>{
        dispatch(calculateBalance(list))
    },[list])

    //New transactions form
    const handleForm = (e:FormEvent,data:listItem) => {
        e.preventDefault();
        e.stopPropagation();
        if(validateTransaction(data)) {
            dispatch(addTransaction(data))
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
        else if(data.type === 'expense' && balance.total - balance.expense - data.amount < 0) {
            console.log(`not enough money for expense`)
            return false
        }
        return true
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
        dispatch(removeTransaction(id))
    }


    const filteredList = onRadioFilter(radioFilter, list);
    const finalList = onFilterList(filterInput,filteredList!);

    return (
    <Container className="App">
      <Header
          setFilterInput={setFilterInput}
          setRadioFilter={setRadioFilter}/>
            <Row>
                <TransactionsContent
                    onDelete={onDelete}
                    list={finalList}/>
                <SavingsContent
                    handleForm={handleForm}/>
            </Row>
            <hr/>
            <div className='footer-container'>
                <BalanceComponent/>
                <PieChart/>
            </div>
        <ModalWindow
            handleForm={handleForm}
        />
    </Container>
    );
}

export default App;

