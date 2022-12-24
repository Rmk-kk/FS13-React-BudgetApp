import {configureStore} from "@reduxjs/toolkit";
import listReducer from "./slices/listReducer";
import modalReducer from "./slices/modalReducer";
import balanceReducer from "./slices/balanceSlice";

const store = configureStore({
    reducer: {
        listReducer,
        modalReducer,
        balanceReducer
    },
})

export type RootState = ReturnType<typeof store.getState>


export default store