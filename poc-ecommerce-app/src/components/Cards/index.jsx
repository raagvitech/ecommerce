import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../../configure";
import { CartList } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ productData }) => {

    const { CartListData } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(CartListData, "CartListData")


    const addtoCart = (data) => {

        console.log(data, "data", user)

        const payload = {
            item_uuid: data.uuid,
            user_uuid: user?.user?.uuid,
            quantity: 1
        }
        axios.post(authentication.cart_add, payload, {
            headers: {
                "Authorization": `Bearer ${user?.accessToken}`
            }
        })
            .then((res) => {
                dispatch(CartList({ user_uuid: user?.user?.uuid }, user?.accessToken));
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    const cartUpdate = (data, quantity) => {

        console.log(data, "data", user)

        const payload = {
            item_uuid: data.uuid,
            user_uuid: user?.user?.uuid,
            quantity: quantity
        }
        axios.post(authentication.cart_add, payload, {
            headers: {
                "Authorization": `Bearer ${user?.accessToken}`
            }
        })
            .then((res) => {
                dispatch(CartList({ user_uuid: user?.user?.uuid }, user?.accessToken));
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    const cartItem = CartListData?.find((item) => item.item_uuid === productData.uuid)
    return (
        <div className="max-w-xs mx-auto p-4 cursor-pointer" key={productData?.uuid}  >
            <div className="relative bg-blue-500 text-white rounded-2xl shadow-lg overflow-hidden p-6 text-center">
                {/* Blurred Hoodie Image */}
                <div className="absolute inset-0">
                    <img
                        src={productData?.image} // Replace with actual hoodie image
                        alt="Man Hoodie"
                        className="w-full h-70 object-cover blur-md opacity-50"
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10">
                    <img
                        onClick={() => navigate(`/user/product/view/${productData?.uuid}`, {
                            state: productData
                        })}
                        src={productData?.image} // Replace with actual hoodie image
                        alt="Man Hoodie"
                        className="w-full h-70 object-cover"
                    />
                    <h3 className="text-xl font-bold">{productData?.name}</h3>
                    <p className="text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                    {/* Sizes */}
                    <div className="mt-3 text-sm font-medium tracking-wide">
                        {productData?.size}
                    </div>

                    {/* Price */}
                    <p className="text-lg font-semibold mt-2">${productData?.price}</p>

                    {/* Add to Cart Button */}
                    {cartItem ?
                        <div class="inline-flex rounded-md shadow-xs" role="group">
                            <button
                                onClick={() => cartUpdate(productData, -1)}
                                type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                -
                            </button>
                            &nbsp;
                            <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                {cartItem.quantity}
                            </button>
                            &nbsp;
                            <button
                                onClick={() => cartUpdate(productData, 1)}
                                type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                +
                            </button>
                        </div>
                        :
                        <button
                            onClick={() => addtoCart(productData)}
                            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg shadow-md transition">
                            ADD TO CART
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
