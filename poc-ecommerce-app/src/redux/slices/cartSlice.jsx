import { createSlice } from "@reduxjs/toolkit";
import { authentication } from "../../configure";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    CartListData: [],
    paymentDetails: {
      amount: '',
      count: '',
      total_amount: ''
    }
  },
  reducers: {
    setCartList: (state, action) => {
      state.CartListData = action.payload;
    },
    setPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },
    // addToCart: (state, action) => [...state, action.payload],
    // updateCartItem: (state, action) => {
    //   return state.map((item) =>
    //     item.id === action.payload.id ? action.payload : item
    //   );
    // },
    // removeFromCart: (state, action) => state.filter((i) => i.id !== action.payload),
    // clearCart: () => [],
  },
});

export const { addToCart, updateCartItem, removeFromCart, clearCart, setCartList, setPaymentDetails } = cartSlice.actions;

export const CartList = (values, token) => async (dispatch) => {

  const response = await axios.get(`${authentication.cart_url}?user_uuid=${values.user_uuid}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => {
      dispatch(setCartList(res?.data?.data));
      dispatch(setPaymentDetails({
        amount: res?.data?.amount,
        count: res?.data?.count,
        total_amount: res?.data?.total_amount
      }));
    })
    .catch((err) => {
      dispatch(setCartList([]));
    })
}

export default cartSlice.reducer;
