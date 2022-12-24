import {configureStore} from "@reduxjs/toolkit";
import listReducer from "./slices/listReducer";
import modalReducer from "./slices/modalReducer";

const store = configureStore({
    reducer: {
        listReducer,
        modalReducer
    },
})

export type RootState = ReturnType<typeof store.getState>


export default store