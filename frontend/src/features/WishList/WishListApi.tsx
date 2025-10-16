import axios from "axios"


export const getWishList = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist`,
        { withCredentials : true }
    )
    return response.data.wishlist;
}


export const postWishlist  = async(productId : string)=>{
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist`,{productId},
        { withCredentials : true }
    )
    return response.data.wishlist;
}


export const deleteWishlist  = async(productId : string)=>{
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${productId}`,
        { withCredentials : true }
    )
    return response.data.wishlist;
}

export const moveWishlistTOCart  = async(productId : string)=>{
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${productId}/move-to-cart`,
        { withCredentials : true }
    )
    return response.data.wishlist;
}