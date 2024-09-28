import * as API from "@/app/api/auth";
import { useAppSelector } from "@/hooks/hooks";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft} from "immer";
import type { RootState } from "../store";

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
    error: string
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
      error: "",
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
    .addCase(getLogin.rejected, (state, action) => {
      if (action.error.message) {
        state.user.error = action.error.message;
        console.error("Error:", action.error.message);
      }
    })
    .addCase(getSignUp.rejected, (state, action) => {
      if (action.error.message) {
        state.user.error = action.error.message;
        console.error("Error:", action.error.message);
      }
    });
  },
});

export const checkUser = (state: RootState) => Boolean(state.auth.tokens.access)
export const {logOut} = authSlice.actions;
export const authReducer = authSlice.reducer;