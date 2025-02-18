import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    placeOrder: (state, action) => [...state, action.payload],
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
