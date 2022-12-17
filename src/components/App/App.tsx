import React, {useEffect, useState} from 'react';
import './App.css';
import '../Header/Header'
import Container from 'react-bootstrap/Container';
import Header from "../Header/Header";
import Content from "../Content/Content";
import Footer from "../Footer/Footer";
import ModalWindow from "../ModalWindow/ModalWindow";
import {ModalType} from "../../interfaces";


const App = () => {
    const [formData, setFormData] = useState<FormData>({source: '', amount: '', modalType: ''});
    const [savings, setSavings] = useState<SavingsData>({currentAmount: 0, target: 1000})
    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    let [balance, setBalance] = useState(0);

    useEffect(() => {
        handleBalance();
        if(balance < 0) {
            setBalance(0);
        }
    }, [formData])
    const showModal = (type:ModalType) => {
        setShow(true);
        setType(type)
    }
    const closeModal = () => {
        setShow(false);
    }

    const handleForm = (data:FormData) => {
        setFormData(data);
    }

    const handleBalance = () => {
        if(formData.modalType === 'Expense') {
            setBalance(balance -= Number(formData.amount));
        } else if(formData.modalType === 'Income') {
            setBalance(balance += Number(formData.amount));
        }
    }

    const handleSavings = (amount:number, type:ModalType) => {
        if(type === 'Savings') {
            setSavings(  {
                target: amount,
                currentAmount: savings.currentAmount
            })
        } else if(type === 'TransferToSavings' && amount <= balance) {
            setSavings(  {
                currentAmount: amount + savings.currentAmount,
                target: savings.target
            });
            setBalance(balance - amount)
        }
    }

  return (
    <Container className="App">
        <Header showModal={showModal}/>
        <Content formData={formData} handleForm={handleForm} showModal={showModal} savings={savings}/>
        <ModalWindow modalType={type} show={show} closeModal={closeModal} handleForm={handleForm} handleSavings={handleSavings}/>
        <Footer balance={balance + savings.currentAmount}/>
    </Container>
  );
}

export interface FormData extends Object{
    source: string
    amount: string,
    modalType: string,
}

export interface SavingsData extends Object {
    target: number,
    currentAmount: number
}
export default App;
