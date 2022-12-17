import {Col} from "react-bootstrap";
import CardItem from "../CardItem/CardItem";
import {CardInfo} from "../../interfaces";
import {FormData} from "../App/App";
import nextId from "react-id-generator";
const IncomeRow = (props:IncomeProps) => {

    const {incomeData} = props;


    const elements = incomeData.map(item => {
        return <CardItem title={item.modalType} amount={item.amount} source={item.source} key={nextId()}/>
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