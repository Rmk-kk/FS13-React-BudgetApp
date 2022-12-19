import './header.css'
import React from "react";
import {Dropdown, Form, Button, DropdownButton, InputGroup} from "react-bootstrap";

interface HeaderProps{
    handleModalWindow: (status:boolean) => void
    onFilterUpdate: (search:string) => void
}
const Header = (props:HeaderProps) => {

    const {handleModalWindow, onFilterUpdate} = props;

    return (
        <div className={'header'}>
            <h2>Budget App</h2>
            <div className='header_filter-wrap'>
                <InputGroup className='header_filter-wrap-input'>
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Search by Source
                    </InputGroup.Text>
                    <Form.Control
                        onChange={(e)=>onFilterUpdate(e.currentTarget.value)}
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <Form className='header_filter-wrap-radio'>
                    <Form.Check
                        inline
                        label="All"
                        name="group1"
                        type={"radio"}
                        id={`inline-radio-1`}
                    />
                    <Form.Check
                        inline
                        label="Income"
                        name="group1"
                        type={"radio"}
                        id={`inline-radio-2`}
                    />
                    <Form.Check
                        inline
                        label="Expense"
                        name="group1"
                        type={"radio"}
                        id={`inline-radio-3`}
                    />
                </Form>
            </div>

            <div className="header_btn-wrap">
                <Button variant="secondary" onClick={()=>handleModalWindow(true)}>Add Transaction</Button>
            </div>
        </div>
    )
}

export default Header