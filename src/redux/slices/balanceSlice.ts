import {createSlice} from "@reduxjs/toolkit";
import {Balance, listItem} from "../../components/types and interfaces";

const initialState:Balance = {income: 0, expense: 0, savings: 0, total: 0};

const balanceSlice = createSlice({
    name: 'balanceSlice',
    initialState: initialState,
    reducers: {
        calculateBalance: (state, action) => {
            let income = 0,
                expense = 0,
                savings = 0,
                total = 0;
            action.payload.forEach((item:listItem) => {
                if(item.type === 'income') {
                    income += item.amount;
                }
                else if(item.type === 'expense') {
                    expense += item.amount;
                }
                else if(item.type === 'transfer') {
                    savings += item.amount;
                }
                else if(item.type === 'withdraw') {
                    savings -= item.amount;
                }
                total = income - expense - savings;
            })
            return {income, expense, savings, total}
        }
    }
})

const balanceReducer = balanceSlice.reducer;
export default balanceReducer;
export const {calculateBalance} = balanceSlice.actions