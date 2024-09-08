import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../redux/orderSlice";
import authReducer from "../redux/authSlice";

const store = configureStore({
  reducer: {
    order: orderReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
