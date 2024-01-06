import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Reducers/Auth";

const Store = configureStore({
    reducer: {
        auth: authReducer, 
    }
})

export default Store;