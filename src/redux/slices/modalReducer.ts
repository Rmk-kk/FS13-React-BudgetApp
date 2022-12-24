import {createSlice} from "@reduxjs/toolkit";

const initialState:boolean = false;
const modalSlice = createSlice({
    name: 'modalReducer',
    initialState,
    reducers: {
        openModal: (state,action) => {
            return action.payload
        },
        closeModal: (state,action) => {
            return action.payload
        }
    }
})
const modalReducer = modalSlice.reducer;
export default modalReducer

export const {openModal, closeModal} = modalSlice.actions;