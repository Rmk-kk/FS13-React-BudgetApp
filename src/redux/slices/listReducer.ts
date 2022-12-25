import {createSlice} from "@reduxjs/toolkit";
import {listItem} from "../../components/types and interfaces";

const listInitialState: listItem[] = [];
const listSlice = createSlice({
    name: 'listSlice',
    initialState : listInitialState,
    reducers: {
        addTransaction: (state, action) => {
            state.push(action.payload)
        },
        removeTransaction: (state, action) => {
            return state.filter(item => item.id !== action.payload)
        },
        editTransaction: (state, action) => {
            return state.map(item => {
                if(item.id === action.payload.id) {
                    return action.payload
                }
                return item
            })
        }
    }
})

const listReducer = listSlice.reducer;
export default listReducer;

export const {addTransaction, removeTransaction, editTransaction} = listSlice.actions