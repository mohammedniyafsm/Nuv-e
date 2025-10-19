import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPaymentOrder,
  getOrderById,
  getOrders,
  verifyPaymentOrder,
  placeOrder as placeOrderApi,
  cancelOrder as cancelOrderApi,
  returnOrder as returnOrderApi,
} from "./OrderApi";

import type { OrderI, PaymentI } from "./OrderApi";

interface OrderState {
  orders: OrderI[];
  currentOrder: OrderI | null;
  loading: boolean;
  error: string | null;
  paymentOrder: any | null;
  paymentVerified: boolean;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  paymentOrder: null,
  paymentVerified: false,
};

// FETCH ALL ORDER
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => await getOrders());
// FETCH ORDER BY ID (SINGLE ORDER DETAIL)
export const fetchOrderById = createAsyncThunk("orders/fetchOrderById", async (orderId: string) => await getOrderById(orderId));
// PLACE ORDER
export const placeOrder = createAsyncThunk("orders/placeOrder", async (orderData: OrderI) => await placeOrderApi(orderData));
// CANCEL ORDER
export const cancelOrder = createAsyncThunk("orders/cancelOrder", async (orderId: string) => await cancelOrderApi(orderId));
// RETURN ORDER
export const returnOrder = createAsyncThunk("orders/returnOrder", async (orderId: string) => await returnOrderApi(orderId));
// CREATE PAYMENT ORDER
export const createPayment = createAsyncThunk("orders/createPayment", async (amount: number) => await createPaymentOrder(amount));
// VERIFY ORDER PAYMENT
export const verifyPayment = createAsyncThunk("orders/verifyPayment", async (paymentData: PaymentI) => await verifyPaymentOrder(paymentData));

// ========== Slice ==========

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetPayment: (state) => {
      state.paymentOrder = null;
      state.paymentVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ==================== FETCH ALL ORDER ====================
      .addCase(fetchOrders.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(fetchOrders.rejected, (state, action) => { state.loading = false; state.error = action.error.message || null; })

      // ==================== FETCH SINGLE ORDER BY ID ====================
      .addCase(fetchOrderById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchOrderById.fulfilled, (state, action) => { state.loading = false; state.currentOrder = action.payload; })
      .addCase(fetchOrderById.rejected, (state, action) => { state.loading = false; state.error = action.error.message || null; })

      // ==================== PLACE A ORDER ====================
      .addCase(placeOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(placeOrder.fulfilled, (state) => { state.loading = false; })
      .addCase(placeOrder.rejected, (state, action) => { state.loading = false; state.error = action.error.message || null; })

      // ==================== CANCEL ORDER ====================
      .addCase(cancelOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(cancelOrder.fulfilled, (state) => { state.loading = false; })
      .addCase(cancelOrder.rejected, (state, action) => { state.loading = false; state.error = action.error.message || null; })

      // ==================== RETURN ORDER ====================
      .addCase(returnOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(returnOrder.fulfilled, (state) => { state.loading = false; })
      .addCase(returnOrder.rejected, (state, action) => { state.loading = false; state.error = action.error.message || null; })

      // ==================== CREATE PAYMENT FOR ORDER ====================
      .addCase(createPayment.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createPayment.fulfilled, (state, action) => { state.loading = false; state.paymentOrder = action.payload; })
      .addCase(createPayment.rejected, (state, action) => { state.loading = false; state.error = action.error.message || null; })

      // ==================== VERIFY PAYMENT ORDER ====================
      .addCase(verifyPayment.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(verifyPayment.fulfilled, (state) => { state.loading = false; state.paymentVerified = true; })
      .addCase(verifyPayment.rejected, (state, action) => { state.loading = false; state.error = action.error.message || null; });
  },
});

export const { resetPayment } = orderSlice.actions;
export default orderSlice.reducer;
