import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/User/UserSlice"
import  addressReducer  from "../features/Address/Address";
import  productReducer  from "../features/Product/Product";
import wishlistReducer  from "../features/WishList/WishlistSlice";
import cartreducer from "../features/Cart/CartSlice";


export const  Store = configureStore({
    reducer : {
        user : userReducer,
        address : addressReducer,
        product : productReducer,
        wishlist : wishlistReducer,
        cart : cartreducer

    }
})


export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
