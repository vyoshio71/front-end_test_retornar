import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fruits, sizes, addons } from "../mocks/acaiData";
import { IOrderState } from "../interfaces/interfaces";



const initialState: IOrderState = {
  selectedSize: 0,
  selectedFruit: 0,
  selectedAddons: [],
  totalPrice: 0,
  count: 1,
};

const calculateTotalPrice = (state: IOrderState) => {
  let total = 0;
  if (state.selectedSize) {
    total += sizes.find((size) => size.id === state.selectedSize)?.price || 0;
  }
  if (state.selectedFruit) {
    total += fruits.find((fruit) => fruit.id === state.selectedFruit)?.price || 0;
  }
  state.selectedAddons.forEach((id) => {
    total += addons.find((addon) => addon.id === id)?.price || 0;
  });
  return total * state.count;
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    selectSize(state, action: PayloadAction<{ id: number; price: number }>) {
      state.selectedSize = action.payload.id;
      state.totalPrice = calculateTotalPrice(state);
    },
    selectFruit(state, action: PayloadAction<{ id: number; price: number }>) {
      state.selectedFruit = action.payload.id;
      state.totalPrice = calculateTotalPrice(state);
    },
    toggleAddon(state, action: PayloadAction<{ id: number; price: number }>) {
      const index = state.selectedAddons.indexOf(action.payload.id);
      if (index >= 0) {
        state.selectedAddons.splice(index, 1);
      } else {
        state.selectedAddons.push(action.payload.id);
      }
      state.totalPrice = calculateTotalPrice(state);
    },
    incrementCount(state) {
      state.count += 1;
      state.totalPrice = calculateTotalPrice(state);
    },
    decrementCount(state) {
      if (state.count > 1) {
        state.count -= 1;
        state.totalPrice = calculateTotalPrice(state);
      }
    },
    resetOrder(state) {
      state.selectedSize = 0;
      state.selectedFruit = 0;
      state.selectedAddons = [];
      state.totalPrice = 0;
      state.count = 1;
    },
  },
});

export const { selectSize, selectFruit, toggleAddon, incrementCount, decrementCount, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
