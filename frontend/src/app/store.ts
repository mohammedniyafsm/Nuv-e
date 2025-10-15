import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/User/UserSlice"
import  addressReducer  from "../features/Address/Address";
import  productReducer  from "../features/Product/Product";


export const  Store = configureStore({
    reducer : {
        user : userReducer,
        address : addressReducer,
        product : productReducer

    }
})


export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
