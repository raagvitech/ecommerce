import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartList } from "../../../redux/slices/cartSlice";
import axios from "axios";
import { authentication } from "../../../configure";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const { CartListData, paymentDetails } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(CartList({ user_uuid: user?.user?.uuid }, user?.accessToken));
  }, [])

  const Orderplace = (user_uuid) => {

    axios.post(authentication.checkout, {
      "user_uuid" : user_uuid
    },{
      headers : {
        'Authorization' : `Bearer ${user?.accessToken}`
      }
    })
    .then((res) => {
      // console.log(res?.data?.data?.uuid, "ffffffffffff")
      axios.post(authentication.Order_Create, {
        checkout_uuid: res?.data?.data?.uuid,
        user_uuid: user_uuid
      }, {
        headers: {
          'Authorization': `Bearer ${user?.accessToken}`
        }
      })
        .then((res) => {
          setShow(true);
          dispatch(CartList({ user_uuid: user?.user?.uuid }, user?.accessToken));
        })
        .catch((err) => {
          console.log(err?.response)
        })
    })
    .catch((err) => {
      console.log(err?.response)
    })

  }

  const navigate = useNavigate();

  return (
    <>
      {show && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-green-50 text-green-700 border border-green-300 rounded-lg shadow-md p-4 flex items-start space-x-4 transition-all duration-300">
          {/* Check Icon */}
          <CheckCircleIcon className="w-6 h-6 text-green-600 mt-1" />

          {/* Message Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Order Placed !</h3>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.
            </p>
            {/* Buttons */}
            <div className="mt-2 flex space-x-6">
              <button
                onClick={() => { setShow(false); navigate('/user/orders')}}
                className="text-green-700 font-semibold hover:underline">
                View status
              </button>
            </div>
          </div>
        </div>
      )
      }
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-8 bg-white p-6 rounded-lg shadow-md">

          {/* Left Side - Form Section */}
          {/* <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact information</h2>
            <input type="email" placeholder="Email address" className="w-full p-2 border rounded-md mb-4" />

            <h2 className="text-lg font-semibold text-gray-800 mt-4">Payment details</h2>
            <input type="text" placeholder="Name on card" className="w-full p-2 border rounded-md mb-2" />
            <input type="text" placeholder="Card number" className="w-full p-2 border rounded-md mb-2" />

            <div className="flex gap-4">
              <input type="text" placeholder="Expiration date (MM/YY)" className="w-1/2 p-2 border rounded-md" />
              <input type="text" placeholder="CVC" className="w-1/2 p-2 border rounded-md" />
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mt-4">Shipping address</h2>
            <input type="text" placeholder="Company" className="w-full p-2 border rounded-md mb-2" />
            <input type="text" placeholder="Address" className="w-full p-2 border rounded-md mb-2" />
            <input type="text" placeholder="Apartment, suite, etc." className="w-full p-2 border rounded-md mb-2" />

            <div className="flex gap-4">
              <input type="text" placeholder="City" className="w-1/3 p-2 border rounded-md" />
              <input type="text" placeholder="State / Province" className="w-1/3 p-2 border rounded-md" />
              <input type="text" placeholder="Postal code" className="w-1/3 p-2 border rounded-md" />
            </div>

            <div className="mt-4 flex items-center">
              <input type="checkbox" id="sameAddress" className="mr-2" />
              <label htmlFor="sameAddress" className="text-gray-700 text-sm">Same as shipping information</label>
            </div>

            <button onClick={() => setShow(true)} className="w-full mt-4 bg-indigo-600 text-black p-2 rounded-md hover:bg-indigo-700 transition">
              Order Place
            </button>
          </div> */}

          {/* Right Side - Order Summary */}
          <div className="bg-gray-100 p-6 rounded-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order summary</h2>

            {/* Product List */}
            <div className="space-y-4">
              {CartListData.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <img src={product?.image_url} alt={product.product_name} className="w-16 h-16 rounded-md object-cover" />
                  <div className="flex-1 ml-4">
                    <p className="text-sm font-medium text-gray-800">{product.product_name}</p>
                    <p className="text-xs text-gray-500">{product.quantity} * {product.product_price}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${Number(product.quantity) * Number(product.product_price)}</p>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-sm font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${paymentDetails?.amount}.00</p>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <p>Shipping</p>
                <p>$0.00</p>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <p>Taxes</p>
                <p>$0.00</p>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-900 mt-4">
                <p>Total</p>
                <p>${paymentDetails?.total_amount}.00</p>
              </div>
              <button
                onClick={() => Orderplace(user?.user?.uuid)}
                // onClick={() => setShow(true)} 
                className="w-full mt-4 bg-indigo-600 text-black p-2 rounded-md hover:bg-indigo-700 transition">
                Order Place
              </button>
            </div>
          </div>

        </div>
      </div>
    </>

  );
};

export default CheckoutPage;
