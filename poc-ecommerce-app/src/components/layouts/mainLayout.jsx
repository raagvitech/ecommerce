import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/images/Depth 4, Frame 0.png";
import profile from "../../assets/images/profile.png";
import leftArrow from "../../assets/images/left-arrow.png";
import Cartlist from "../../Views/User/cart";
import { ArrowRightIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/slices/authSlice";

function MainLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cartOpen, setCartOpen] = useState(false);

  const { role: userRole } = useSelector((state) => state.auth);

  const LogoutFun = () => {
    dispatch(logout());
    navigate('/')
  }

  const { CartListData } = useSelector((state) => state.cart)

  return (
    <>

      <div className="min-h-screen flex flex-col border border-purple-900 rounded-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center px-5 py-2 border-b border-purple-600">
          {/* Left Section */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={leftArrow}
              alt="Left Arrow"
              className="w-8 h-auto p-2 cursor-pointer"
              onClick={() => navigate(-1)}
            />

            <span className="font-bold text-lg text-gray-900" onClick={() => navigate('/user/landing')}>POC</span>
          </div>

          {/* Right Section */}
          {userRole === "consumer" &&
            <div className="flex items-center gap-3">
              <span className="font-SemiBold text-lg text-gray-700 cursor-pointer" onClick={() => navigate('/user/orders')}>Orders</span>
              <ShoppingCartIcon
                onClick={() => setCartOpen(true)}
                className="h-6 w-6 cursor-pointer"
              />{CartListData?.length > 0 && <small>({CartListData?.length}) </small> }
              <ArrowRightIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => LogoutFun()}
              />
            </div>
          }
        </div>

        {/* Content Section (Takes Remaining Space) */}
        <div className="flex-1 p-0 overflow-hidden">{children}</div>
      </div>
      <Cartlist open={cartOpen} setOpen={setCartOpen} />
    </>
  );
}

export default MainLayout;
