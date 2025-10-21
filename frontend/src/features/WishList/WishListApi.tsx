import axios from "axios"

// GET USER WISHLIST
export const getWishList = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return { _id: "", userId: "", products: [] };
    }
    throw error;
  }
};

// POST USER WISHLIST
export const postWishlist  = async(productId : string)=>{
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist`,{productId},
        { withCredentials : true }
    )
    return response.data.wishlist;
}

// DELETE USER WISHLIST
export const deleteWishlist  = async(productId : string)=>{
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${productId}`,
        { withCredentials : true }
    )
    return response.data.update;
}

// MOVE WISHLIST PRODUCT TO CART 
export const moveWishlistTOCart  = async(productId : string)=>{
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${productId}/move-to-cart`,
        { withCredentials : true }
    )
    return response.data.wishlist;
}