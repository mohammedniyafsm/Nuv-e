import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export interface ProductInfo {
  _id: string;
  name: string;
  price: number;
  images: {
    url: string;
  };
}

export interface ItemI {
  // Can be string (API payload) or full object (Redux state)
  productId: string | ProductInfo;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderI {
  _id?: string;
  items: ItemI[];
  shippingAddressId: string;
  paymentMethod: string;
  paymentStatus: string;
  discountAmount?: number;
  subtotal?: number;
  orderStatus?: string;
  totalAmount?: number;
  placedAt?: Date;
  coupon : String,
}

export interface PaymentI {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}


// ===================== Orders =====================

//FETCH ALL ORDER 
export const getOrders = async () => {
  const response = await axios.get(`${API_URL}/api/orders`, { withCredentials: true });
  console.log(response.data.orders);
  return response.data.orders;
};

//FETCH SINGLE ORDER DETAIL BY ID  
export const getOrderById = async (orderId: string) => {
  const response = await axios.get(`${API_URL}/api/orders/${orderId}`, { withCredentials: true });
  return response.data.order;
};

//PLACE A ORDER 
export const placeOrder = async (orderData: OrderI) => {
  const response = await axios.post(`${API_URL}/api/orders`, orderData, { withCredentials: true });
  return response.data.message;
};

//CANCEL ORDER
export const cancelOrder = async (orderId: string) => {
  const response = await axios.put(`${API_URL}/api/orders/${orderId}/cancel`, {}, { withCredentials: true });
  return response.data.message;
};

//RETURN ORDER
export const returnOrder = async (orderId: string) => {
  const response = await axios.put(`${API_URL}/api/orders/${orderId}/return`, {}, { withCredentials: true });
  return response.data.message;
};

// ===================== Payments =====================

//CREATE PAYMENT
export const createPaymentOrder = async (amountInRupees: number) => {
  const response = await axios.post(`${API_URL}/api/create-order`, { amount: amountInRupees }, { withCredentials: true });
  return response.data;
};

//VERIFY A PAYMENT
export const verifyPaymentOrder = async (paymentData: PaymentI) => {
  const response = await axios.post(`${API_URL}/api/verify-payment`, paymentData, { withCredentials: true });
  return response.data;
};