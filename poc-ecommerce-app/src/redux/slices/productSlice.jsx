import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => action.payload,
    addProduct: (state, action) => [...state, action.payload],
    updateProduct: (state, action) => {
      return state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
    deleteProduct: (state, action) => state.filter((p) => p.id !== action.payload),
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
