import {Col} from "react-bootstrap";
import CardItem from "../card-item/CardItem";
import {CardInfo} from "../../interfaces";
import {FormData} from "../app/App";
import nextId from "react-id-generator";
const IncomeRow = (props:IncomeProps) => {

    const {incomeData} = props;


    const elements = incomeData.map(item => {
        return <CardItem title={item.modalType} amount={item.amount} key={nextId()}/>
    })

    return (
        <Col>
            {elements}
        </Col>
    )
}

interface IncomeProps {
    incomeData: FormData[],
}
export default IncomeRow