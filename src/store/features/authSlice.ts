import * as API from "@/app/api/auth";
import { ErrorMessage, getEmptyError } from "@/app/types/error";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getLogin = createAsyncThunk("auth/getLogin",API.login);
export const getSignUp = createAsyncThunk("auth/getSignUp",API.signUp);
export const getTokens = createAsyncThunk("auth/getTokens",API.getTokens);
export const refreshTokens = createAsyncThunk("auth/refreshTokens",API.refreshTokens);

type AuthStateType = {
  user: {
    _id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
};

const initialState: AuthStateType = {
    user: {
      _id: 0,
      username: "",
      first_name: "",
      last_name: "",
      email: "",
    },
    tokens: {
      access: "",
      refresh: "",
}
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (
      state
    ) => {
        state.user.username = "";
        state.user.first_name = "";
        state.user.last_name = "";
        state.user.email = "";
        state.tokens.access = "";
        state.tokens.refresh = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(getSignUp.fulfilled, (state, action) => {
        state.user = action.payload
    })
    .addCase(getTokens.fulfilled, (state, action) => {
        state.tokens = action.payload
    })
    .addCase(refreshTokens.fulfilled, (state, action) => {
        state.tokens = action.payload
    })
  },
});

export const {logOut} = authSlice.actions;
export const authReducer = authSlice.reducer;