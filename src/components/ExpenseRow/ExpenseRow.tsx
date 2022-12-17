import {Col} from "react-bootstrap";
import CardItem from "../card-item/CardItem";
import {FormData} from "../app/App";
import nextId from "react-id-generator";

const ExpenseRow = (props:ExpenseDataProps) => {

    const {expenseData} = props;

    const elements = expenseData.map(item => {
        return <CardItem title={item.modalType} amount={item.amount} key={nextId()}/>
    })

    return (
        <Col>
            {elements}
        </Col>
    )
}

interface ExpenseDataProps {
    expenseData: FormData[],
}
export default ExpenseRow