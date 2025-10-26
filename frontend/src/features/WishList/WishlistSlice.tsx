import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteWishlist, getWishList, moveWishlistTOCart, postWishlist } from "./WishListApi";


interface WishListI {
    _id?: string;
    name: string;
    category: string;
    size?: string;
    price: number;
    images: { url: string; alt: string; _id: string }[];
}


interface WishListState {
    _id: string;
    userId: string;
    products: WishListI[];
    loading: boolean;
    error: string | null;
}


// POST USER WISHLIST
export const WishLists = createAsyncThunk(
    '/wishlist/getWishlist', async () => {
        return await getWishList();
    }
)

// POST USER WISHLIST
export const addWishlist = createAsyncThunk(
    '/wishlist/addWishlist', async (productId: string) => {
        return await postWishlist(productId);
    }
)

// POST USER WISHLIST
export const removeWishlist = createAsyncThunk(
    '/wishlist/removeWishlist', async (productId: string) => {
        return await deleteWishlist(productId);
    }
)

// POST USER WISHLIST
export const WishListMoveCart = createAsyncThunk(
    '/wishlist/moveWishlistTOCart', async (productId: string) => {
        return await moveWishlistTOCart(productId);
    }
)

const initialState: WishListState = {
    _id: "",
    userId: "",
    products: [],
    loading: false,
    error: null
}


const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
      // ==================== FETCH USER WISHLIST ====================
            .addCase(WishLists.pending, (state) => {
                state.loading = true
            })
            .addCase(WishLists.fulfilled, (state, action) => {
                state.loading = false;
                state._id = action.payload._id;
                state.userId = action.payload.userId;
                state.products = action.payload.products;
            })
            .addCase(WishLists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch wishlist";
            })

        builder
       // ==================== ADD  USER WISHLIST ====================
            .addCase(addWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(addWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(addWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add to wishlist";
            })

        builder
              // ==================== REMOVE USER WISHLIST ====================
            .addCase(removeWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(removeWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to remove from wishlist";
            })
    }
})

export default WishlistSlice.reducer;


