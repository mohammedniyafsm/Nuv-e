import axios from "axios"


export const getCart = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { withCredentials: true }
    )
    return response.data.cart;
}

export const postCart = async (product: {
    productId: string;
    quantity: number;
    price: number;
}) => {
    const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        product,
        { withCredentials: true }
    );
    return response.data.cart;
};


export const putCart = async (itemId: string, quantity: number) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${itemId}`
        , { quantity },
        { withCredentials: true }
    )
    console.log(response.data)
    return response.data.cart
}

export const removeCart = async (itemId: string) => {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${itemId}`,
        { withCredentials: true }
    )
    return response.data.cart
}

export const addCoupon = async (code: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/apply`,
    { code },
    { withCredentials: true }
  );
  console.log(response.data.cart)
  return response.data.cart;
};

export const removeCoupon = async () => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/remove`, {
    withCredentials: true,
  });
  return response.data.cart;
};
