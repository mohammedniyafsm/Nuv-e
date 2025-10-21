    import axios from "axios";

    const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/user/products`;

    //  Get All Products
    export const getAllProduct = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
    };

    //  Get Product By ID
    export const getProductById = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data.product;
    };

    //  Search Products
    export const searchProduct = async (query: string) => {
    const response = await axios.get(`${BASE_URL}/search?search=${query}`);
    return response.data.response;
    };

    //  Filter Products
    export const filterProduct = async (filters: {
    category?: string;
    priceMin?: number | string;
    priceMax?: number | string;
    }) => {
    const params = new URLSearchParams();
    if (filters.category) params.append("category", filters.category);
    if (filters.priceMin) params.append("priceMin", String(filters.priceMin));
    if (filters.priceMax) params.append("priceMax", String(filters.priceMax));

    const response = await axios.get(`${BASE_URL}/filter?${params.toString()}`);
    return response.data.response;
    };

    //  Pagination
    export const paginatedProduct = async (page = 1, limit = 10, sort?: string) => {
    const url = `${BASE_URL}/products?page=${page}&limit=${limit}${
        sort ? `&sort=${sort}` : ""
    }`;
    const response = await axios.get(url);
    return response.data.product;
    };
