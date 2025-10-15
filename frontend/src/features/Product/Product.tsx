import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProduct } from "./ProductApi";


interface IImage {
    url: string;
    alt?: string;
}

export interface IProduct {
    _id: string;
    name: string;
    brand: string;
    category: string;
    size: string;
    price: number;
    discount: number;
    stock: number;
    description: string;
    images: IImage[];
    status: "active" | "out_of_stock" | "discontinued";
    createdAt: string;
    updatedAt: string;
}

interface ProductState {
    products: IProduct[];
    loading: boolean;
    error: string | null;
}


export const allProduct = createAsyncThunk(
    "product/getAllProduct",
    async () => {
        const response = await getAllProduct();
        console.log(response,"this ")
        return response; 
    }
);


const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Pending
            .addCase(allProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Fulfilled
            .addCase(allProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            // Rejected
            .addCase(allProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch products";
            });
    },
});

export default productSlice.reducer;
