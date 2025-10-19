import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Get all user addresses
export const getAddress = async () => {
  const response = await axios.get(`${BASE_URL}/api/user/address`, {
    withCredentials: true,
  });
  return response.data.address;
};

// Add new address
export const addAddress = async (address: object) => {
  const response = await axios.post(`${BASE_URL}/api/user/address`, address, {
    withCredentials: true,
  });
  return response.data;
};

// Delete  address
export const deleteAddress = async ( id : string) => {
  const response = await axios.delete(`${BASE_URL}/api/user/address/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

//UPDATE ADDRESS 
export const updateAddress = async ( id : string,update :object)=>{
    const response = await axios.put(`${BASE_URL}/api/user/address/${id}`,update,{
        withCredentials : true,
    })
    return response.data
}



