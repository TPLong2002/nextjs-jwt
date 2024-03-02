"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/services/Axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface AuthState {
  isAuth: boolean;
  username: string;
  access_token: string;
  email: string;
  roles: object;
}
const initialState: AuthState = {
  isAuth: false,
  username: "",
  access_token: "",
  email: "",
  roles: {},
};
// Define the initial state using that type

export const accountUser = createAsyncThunk("user/account", async () => {
  const response = (await axios.get("/user/account", {
    withCredentials: true,
  })) as any;
  if (response?.code === 0) {
    return response.data;
  } else {
    return { ...initialState };
  }
});

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(accountUser.fulfilled, (state, action) => {
      // Nếu yêu cầu thành công, cập nhật trạng thái của slice dựa trên dữ liệu nhận được từ máy chủ
      state.isAuth = action.payload.isAuth;
      state.username = action.payload.username;
      state.access_token = action.payload.access_token;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
    });
  },
});

export const { login, logout } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
