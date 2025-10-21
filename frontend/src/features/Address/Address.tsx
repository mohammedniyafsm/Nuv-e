import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddress, deleteAddress, getAddress, updateAddress } from "./AddressApi";

interface AddressList {
  _id: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  type: string;
  createdAt: Date;
}

interface AddressState {
  userId: string;
  address: AddressList[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  userId: "",
  address: [],
  loading: false,
  error: null,
};

//  GET address
export const FetchAddress = createAsyncThunk("address/fetchAddress", async () => {
  return await getAddress();
});

//  POST address
export const PostAddress = createAsyncThunk("address/postAddress", async (address: object) => {
  return await addAddress(address);
});

// DELTE address 
export const deleteAddresss = createAsyncThunk("address/deleteAddress", async (id: string) => {
  return await deleteAddress(id);
});

// UPDATE address 
export const updatedAddress = createAsyncThunk("/address/updateAddress", async ({ id, update }: { id: string; update: object })=>{
    return await updateAddress(id,update)
});


export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ==================== FETCH ADDRESS ====================
      .addCase(FetchAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.address = action.payload.address;
      })
      .addCase(FetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch address";
      })

      // ==================== ADD ADDRESS ====================
      .addCase(PostAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PostAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.updatedAddress) {
          state.address = action.payload.updatedAddress.address;
        }
      })
      .addCase(PostAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add address";
      });

      // ==================== DELETE ADDRESS ====================
      builder
      .addCase(deleteAddresss.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddresss.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.updated) {
          state.address = action.payload.updated.address;
        }
      })
      .addCase(deleteAddresss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete address";
      });

      // ==================== UPDATE ADDRESS ====================
      builder
      .addCase(updatedAddress.pending,(state)=>{
        state.loading = true
      })
      .addCase(updatedAddress.fulfilled,(state)=>{
        state.loading = false
      })
      .addCase(updatedAddress.rejected,(state,action)=>{
        state.loading = false,
        state.error = action.error.message || "Failed to Update Address"
      })
  },
});

export default addressSlice.reducer;
