import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// (Get user profile)
export const getUserAPI = async () => {
  const response = await axios.get(`${BASE_URL}/api/user/profile`, {
    withCredentials: true,
  });
  return response.data; 
};

// (Update user profile)
export const updateUserAPI = async (data: { username: string; email: string }) => {
  const response = await axios.put(`${BASE_URL}/api/user/profile`, data, {
    withCredentials: true,
  });
  return response.data.updateData; 
};
