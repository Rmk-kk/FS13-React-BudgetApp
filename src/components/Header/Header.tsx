import './header.css'
import React, {useEffect, useState} from "react";
import { Form, Button, InputGroup} from "react-bootstrap";
import {HeaderProps} from "../types and interfaces";


const Header = (props:HeaderProps) => {
    const [value, setValue] = useState<string>('all');
    const {setShow, setFilterInput, setRadioFilter} = props;

    useEffect(() => {
        setRadioFilter(value)
    }, [value])


    return (
        <div className={'header'}>
            <h2>Budget App</h2>
            <div className='header_filter-wrap'>
                <InputGroup className='header_filter-wrap-input'>
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Search by Source
                    </InputGroup.Text>
                    <Form.Control
                        onChange={(e)=>setFilterInput(e.currentTarget.value)}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <Form noValidate className='header_filter-wrap-radio'>
                    <Form.Check
                        inline
                        label="All"
                        name="header-filter"
                        value={'all'}
                        onChange={(e)=> setValue(e.currentTarget.value)}
                        type={"radio"}
                        id={`inline-radio-1`}
                    />
                    <Form.Check
                        inline
                        label="Income"
                        name="header-filter"
                        onChange={(e)=> setValue(e.currentTarget.value)}
                        value={'income'}
                        type={"radio"}
                        id={`inline-radio-2`}
                    />
                    <Form.Check
                        inline
                        label="Expense"
                        name="header-filter"
                        value={'expense'}
                        onChange={(e)=> setValue(e.currentTarget.value)}
                        type={"radio"}
                        id={`inline-radio-3`}
                    />
                </Form>
            </div>

            <div className="header_btn-wrap">
                <Button variant="secondary" onClick={()=>setShow(true)}>Add Transaction</Button>
            </div>
        </div>
    )
}

export default Header
