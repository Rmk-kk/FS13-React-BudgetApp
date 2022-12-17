import {Row, Col} from "react-bootstrap";
import IncomeRow from "../IncomeRow/IncomeRow";
import ExpenseRow from "../ExpenseRow/ExpenseRow";
import SavingsRow from "../SavingsRow/SavingsRow";
import {FormData} from "../app/App";
import './content.css'
import {useEffect, useState} from "react";
import expenseRow from "../ExpenseRow/ExpenseRow";

const Content = (props:ContentProps) => {
    const [incomeData, setIncomeData] = useState<FormData[]>([]);
    const [expenseData, setExpenseData] = useState<FormData[]>([]);
    const {formData} = props;

    useEffect(() => {
        setContentData(formData)
    }, [props.formData])


    const setContentData = (data:FormData) => {
        if(data.modalType === 'Income') {
             setIncomeData([...incomeData,data])
        } else if(data.modalType === 'Expense') {
            setExpenseData([...expenseData,data])
        }
    }
    return (
        <>
            <Row className='mainContent-wrap'>
                <IncomeRow incomeData={incomeData}/>
                <ExpenseRow expenseData={expenseData}/>
                <SavingsRow/>
            </Row>
            <hr/>
        </>
    )
}

interface ContentProps {
    formData: FormData
}

export default Content