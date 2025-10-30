import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserAPI, updateUserAPI } from "./UserApi";

interface UserState {
  _id: string;
  username: string;
  email: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  _id: "",
  username: "",
  email: "",
  loading: false,
  error: null,
};


// GET USER PROFILE 
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return await getUserAPI();
});

// UPDATE USER PROFILE
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: { username: string; email: string }) => {
    return await updateUserAPI(data);
  }
);



export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state._id = "";
      state.username = "";
      state.email = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ==================== FETCH USER DATA ====================
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state._id = action.payload._id;
        state.username = action.payload.username;
        state.email = action.payload.email;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
        state._id = "";
        state.username = "";
        state.email = "";
      })

      // ==================== UPDATE USER DATA ====================
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.username = action.payload.username;
      state.email = action.payload.email;
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update user";
    });
},
});

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;
