import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthUser } from "../interfaces/interfaces";

const initialState: IAuthUser = {
  isLoggedIn: false,
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.userName = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userName = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
