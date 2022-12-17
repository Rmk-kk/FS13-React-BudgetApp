import React, {useEffect, useState} from 'react';
import './App.css';
import '../header/Header'
import Container from 'react-bootstrap/Container';
import Header from "../header/Header";
import Content from "../content/Content";
import Footer from "../footer/Footer";
import {FC} from "react";


const App = () => {
    const [formData, setFormData] = useState<FormData>({source: '', amount: '', modalType: ''});
    const handleForm = (data:FormData) => {
        setFormData(data);
    }
    useEffect(() => {
        console.log(formData);
    }, [formData])

  return (
    <Container className="App">
        <Header handleForm={handleForm}/>
        <Content formData={formData}/>
        <Footer/>
    </Container>
  );
}

export interface FormData extends Object{
    source: string
    amount: string,
    modalType: string,
}

export default App;
