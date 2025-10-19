import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCoupon, getCart, postCart, putCart, removeCartItemApi, removeCoupon, clearCart } from "./CartApi";

interface ICouponApplied {
  code: string;
  discountAmount: number;
}

export interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CartState {
  _id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  coupon?: ICouponApplied;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  _id: "",
  userId: "",
  items: [],
  subtotal: 0,
  discountAmount: 0,
  totalAmount: 0,
  coupon: undefined,
  loading: false,
  error: null,
};

//  GET CART
export const Carts = createAsyncThunk<CartState>("cart/getCart", async () => {
  const data = await getCart();
  return data;
});


//  ADD CART
export const addCart = createAsyncThunk<CartState, { productId: string; quantity: number; price: number }>(
  "cart/addCart",
  async (product) => {
    const data = await postCart(product);
    return data;
  }
);

//  DELETE CART
export const deleteCart = createAsyncThunk<CartState, string>(
  "cart/deleteCart",
  async (itemId) => {
    const data = await removeCartItemApi(itemId);
    return data;
  }
);

//  CLEAR CART
export const clearCartAction = createAsyncThunk<CartState>(
  "cart/clearCart",
  async () => {
    const data = await clearCart();
    return data;
  }
);

//  UPDATE CART
export const updateCart = createAsyncThunk<CartState, { itemId: string; quantity: number }>(
  "cart/updateCart",
  async ({ itemId, quantity }) => {
    const data = await putCart(itemId, quantity);
    return data;
  }
);

//  ADD COUPON TO  CART
export const applyCouponAction = createAsyncThunk<CartState, string>(
  "/cart/coupon/add",
  async (code, { rejectWithValue }) => {
    try {
      const data = await addCoupon(code);
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Failed to apply coupon");
    }
  }
);

//  REMOVE COUPON FROM  CART
export const removeCouponAction = createAsyncThunk<CartState>(
  "/cart/coupon/remove",
  async () => {
    const data = await removeCoupon();
    return data;
  }
);


export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ==================== GET CART ====================
      .addCase(Carts.pending, (state) => {state.loading = true; })
      .addCase(Carts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
      })
      .addCase(Carts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })

      // ==================== ADD CART ====================
      .addCase(addCart.pending, (state) => { state.loading = true; })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add to cart";
      })

      // ==================== DELETE CART ====================
      .addCase(deleteCart.pending, (state) => { state.loading = true; })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete item";
      })

      // ==================== CLEAR CART ====================
      .addCase(clearCartAction.pending, (state) => { state.loading = true; })
      .addCase(clearCartAction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.items = []
        state.subtotal = 0,
        state.discountAmount = 0,
        state.totalAmount = 0,
        state.coupon = undefined
      })
      .addCase(clearCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to clear cart";
      })

      // ==================== UPDATE CART ====================
      .addCase(updateCart.pending, (state) => { state.loading = true; })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update cart";
      })

      // ==================== ADD COUPON TO CART ====================
      .addCase(applyCouponAction.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(applyCouponAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
      })
      .addCase(applyCouponAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ==================== REMOVE COUPON FROM CART ====================
      .addCase(removeCouponAction.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(removeCouponAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
        state.coupon = undefined;
      })
      .addCase(removeCouponAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove coupon";
      });
  },
});

export default CartSlice.reducer;
