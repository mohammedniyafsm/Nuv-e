import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProduct,
  getProductById,
  searchProduct,
  filterProduct,
  paginatedProduct,
} from "./ProductApi";

interface IImage {
  url: string;
  alt?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  category: string;
  size: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  images: IImage[];
  status: "active" | "out_of_stock" | "discontinued";
  createdAt: string;
  updatedAt: string;
}

interface ProductState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

// Async Thunks
export const allProduct = createAsyncThunk("product/getAllProduct", async () => {
  const response = await getAllProduct();
  return response;
});

export const productDetail = createAsyncThunk(
  "product/productDetail",
  async (id: string) => {
    const response = await getProductById(id);
    return response;
  }
);

// Search Product
export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (query: string) => {
    const response = await searchProduct(query);
    return response;
  }
);

// Filter Products
export const filterProducts = createAsyncThunk(
  "product/filterProducts",
  async (filters: { category?: string; priceMin?: number | string; priceMax?: number | string }) => {
    const response = await filterProduct(filters);
    return response;
  }
);

// Pagination
export const paginatedProducts = createAsyncThunk(
  "product/paginatedProducts",
  async ({ page, limit, sort }: { page: number; limit: number; sort?: string }) => {
    const response = await paginatedProduct(page, limit, sort);
    return response;
  }
);

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----- Get All -----
      .addCase(allProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(allProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(allProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      })

      // ----- Search -----
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      // ----- Filter -----
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      // ----- Pagination -----
      .addCase(paginatedProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export default productSlice.reducer;
