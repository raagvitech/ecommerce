import { createSlice } from "@reduxjs/toolkit";
import { authentication } from "../../configure";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, role: 'auth' },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.role = 'auth';
    },
  },
});

export const { login, logout } = authSlice.actions;

export const LoginApi = (values) => async (dispatch) => {

  const response = await axios.post(`${authentication.login_url}`, values)
    .then((res) => {
      console.log(res?.data, "hdfashdfghjsa");
      dispatch(login({
        role: res?.data?.data?.user?.role,
        user: res?.data?.data
      }));
    })
    .catch((err) => {
      dispatch(login({
        role: "auth",
        user: {}
      }));
    })
}
// export const LogoutUrl = () => async (dispatch) => {
//   dispatch(setCurrentUser({}));
//   // dispatch(setToast({status:"success",message:"You are Logged out successfully"}))
// }



export default authSlice.reducer;
