import {Row, Col} from "react-bootstrap";
import IncomeRow from "../IncomeRow/IncomeRow";
import ExpenseRow from "../ExpenseRow/ExpenseRow";
import {FormData} from "../App/App";
import './content.css'
import {useEffect, useState} from "react";
import {ContentProps} from '../../interfaces'
import SavingsCard from "../SavingsCard/SavingsCard";

const Content = (props:ContentProps) => {
    const [incomeData, setIncomeData] = useState<FormData[]>([]);
    const [expenseData, setExpenseData] = useState<FormData[]>([]);
    const [balance, setBalance] = useState(0);

    const {formData, showModal, handleForm, savings} = props;

    useEffect(() => {
        setContentData(formData)
        checkCurrentBalance()
    }, [props.formData])

    useEffect(() => {
        if(balance < 0) {
            setBalance(0)
        }
    }, [balance])


    const setContentData = (data:FormData) => {
        if(data.modalType === 'Income') {
             setIncomeData([...incomeData,data])
        } else if(data.modalType === 'Expense') {
            setExpenseData([...expenseData,data])
        }
    }

    const checkCurrentBalance = () => {
        let result = 0;
        incomeData.map(item => item.amount + result);
        expenseData.map(item => result - +item.amount)
        setBalance(result)
    }

    return (
        <>
            <Row className='mainContent-wrap'>
                <IncomeRow incomeData={incomeData}/>
                <ExpenseRow expenseData={expenseData}/>
                <Col>
                    <SavingsCard showModal={showModal} handleForm={handleForm} savings={savings}/>
                </Col>
            </Row>
            <hr/>
        </>
    )
}


export default Content