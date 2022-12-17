import {Col} from "react-bootstrap";
import CardItem from "../CardItem/CardItem";
import {FormData} from "../App/App";
import nextId from "react-id-generator";

const ExpenseRow = (props:ExpenseDataProps) => {

    const {expenseData} = props;

    const elements = expenseData.map(item => {
        return <CardItem title={item.modalType} amount={item.amount} source={item.source} key={nextId()}/>
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