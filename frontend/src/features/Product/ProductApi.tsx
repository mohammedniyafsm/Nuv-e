import axios from "axios"

//  GET ALL PRODUCTS
export const getAllProduct = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/products`);
    return response.data;
}
