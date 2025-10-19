import axios from "axios";



//GET CART 
export const getCart = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
    withCredentials: true,
  });
  return response.data.cart;
};


//ADD CART 
export const postCart = async (product: { productId: string; quantity: number; price: number }) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, product, {
    withCredentials: true,
  });
  return response.data.cart;
};


//UPDATE CART 
export const putCart = async (itemId: string, quantity: number) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BACKEND_URL}/api/cart/${itemId}`,
    { quantity },
    { withCredentials: true }
  );
  return response.data.cart;
};


// REMOVE ITEM FROM CART
export const removeCartItemApi = async (itemId: string) => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${itemId}`, {
    withCredentials: true,
  });
  return response.data.cart;
};


//CLEAR CART ITEM 
export const clearCart = async () => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
    withCredentials: true,
  });
  return response.data.cart;
};


//ADD COUPON TO CART 
export const addCoupon = async (code: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/apply`,
    { code },
    { withCredentials: true }
  );
  return response.data.cart;
};


//REMOVE COUPON FROM CART 
export const removeCoupon = async () => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/remove`, {
    withCredentials: true,
  });
  return response.data.cart;
};
