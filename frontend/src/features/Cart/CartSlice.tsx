import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCoupon, getCart, postCart, putCart, removeCart, removeCoupon } from "./CartApi";

interface ICouponApplied {
  code: string;
  discountAmount: number;
}

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface CartState {
  _id: string;
  userId: string;
  items: CartItem[];
  subtotal?: number;
  discountAmount?: number;
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



export const Carts = createAsyncThunk("cart/getCart", async () => {
  const data = await getCart();
  return data;
});

export const addCart = createAsyncThunk(
  "cart/addCart",
  async (product: { productId: string; quantity: number; price: number }) => {
    const data = await postCart(product);
    return data;
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (itemId: string) => {
    const data = await removeCart(itemId);
    return data;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
    const data = await putCart(itemId, quantity);
    return data;
  }
);

export const applyCouponAction = createAsyncThunk(
  '/cart/coupon/add',
  async (code: string, { rejectWithValue }) => {
    try {
      const data = await addCoupon(code);
      return data;
    } catch (err: any) {
      console.log(err)
      return rejectWithValue(
        err?.response?.data?.message || "Failed to apply coupon"
      );
    }
  }
);


export const removeCouponAction = createAsyncThunk(
  '/cart/coupon/remove', async () => {
    const data = await removeCoupon();
    return data;
  }
)



export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Cart
      .addCase(Carts.pending, (state) => {
        state.loading = true;
      })
      .addCase(Carts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state._id = action.payload._id;
        state.userId = action.payload.userId;
        state.items = action.payload.items || [];
        state.subtotal = action.payload.subtotal || 0;
        state.discountAmount = action.payload.discountAmount || 0;
        state.totalAmount = action.payload.totalAmount || 0;
        state.coupon = action.payload.coupon || undefined;
      })
      .addCase(Carts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })

      // Add to Cart
      .addCase(addCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.items || [];
        state.subtotal = action.payload.subtotal || 0;
        state.discountAmount = action.payload.discountAmount || 0;
        state.totalAmount = action.payload.totalAmount || 0;

      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add to cart";
      })

      // Delete Cart Item
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.items || [];
        state.subtotal = action.payload.subtotal || 0;
        state.discountAmount = action.payload.discountAmount || 0;
        state.totalAmount = action.payload.totalAmount || 0;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete item";
      })

      // Update Quantity
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.items || [];
        state.subtotal = action.payload.subtotal || 0;
        state.discountAmount = action.payload.discountAmount || 0;
        state.totalAmount = action.payload.totalAmount || 0;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update cart";
      })


    
      .addCase(applyCouponAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCouponAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.items = action.payload.items || [];
        state.subtotal = action.payload.subtotal || 0;
        state.discountAmount = action.payload.discountAmount || 0;
        state.totalAmount = action.payload.totalAmount || 0;
        state.coupon = action.payload.coupon || undefined;
      })
      .addCase(applyCouponAction.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.error = action.payload as string 
      })

    // Remove Coupon
    
      .addCase(removeCouponAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCouponAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.items = action.payload.items || [];
        state.subtotal = action.payload.subtotal || 0;
        state.discountAmount = action.payload.discountAmount || 0;
        state.totalAmount = action.payload.totalAmount || 0;

        // Remove coupon
        state.coupon = undefined;
      })
      .addCase(removeCouponAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove coupon";
      });
  },
});

export default CartSlice.reducer;
