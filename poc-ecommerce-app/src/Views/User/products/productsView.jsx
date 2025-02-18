import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authentication } from "../../../configure";
import { CartList } from "../../../redux/slices/cartSlice";
import axios from "axios";

const ProductView = () => {

    const { state } = useLocation();

    console.log(state, "location")
    const [selectedSize, setSelectedSize] = useState(null);

    const sizes = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34];

    const { CartListData } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();


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

    const cartItem = CartListData?.find((item) => item.item_uuid === state.uuid)

    return (
        <div className="flex max-w-4xl mx-auto p-4">
            {/* Image Section */}
            <div className="w-1/2">
                <img
                    src={state?.image_url}
                    alt="Maternity Jeggings"
                    className="w-full object-cover"
                />
            </div>

            {/* Product Details Section */}
            <div className="w-1/2 px-6 space-y-4">
                <h2 className="text-xl font-semibold">{state?.name}</h2>

                <div className="text-red-600 text-2xl font-bold">${state?.price}.00</div>
                {/* <div className="text-gray-500 line-through">$74.95</div> */}

                <div className="flex items-center space-x-1">
                    <span>⭐️⭐️⭐️☆☆</span>
                    <span className="text-gray-500">(3.3) 25 Reviews</span>
                </div>

                <div className="text-gray-700">
                    <span className="font-medium">Color:</span> {state?.color}
                </div>

                <div>
                    <h3 className="font-medium mb-2">REGULAR</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {/* {sizes.map((size) => (
              <button
                key={size}
                className={`p-2 border rounded ${
                  selectedSize === size ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))} */}
                        A balance of casual and cool, this style works for anyone who loves laid-back comfort with a fashion-forward twist. A basic graphic tee paired with relaxed joggers or straight-leg jeans and a sleek pair of trainers offers ultimate ease without sacrificing style. Layer with a bomber jacket or denim vest to complete the look.
                    </div>
                </div>

                <div>
                    <span className="font-medium">Size :</span> {state?.size}
                </div>
                {cartItem ?
                    <div class="inline-flex rounded-md shadow-xs" role="group">
                        <button
                            onClick={() => cartUpdate(state, -1)}
                            type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            -
                        </button>
                        &nbsp;
                        <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            {cartItem.quantity}
                        </button>
                        &nbsp;
                        <button
                            onClick={() => cartUpdate(state, 1)}
                            type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            +
                        </button>
                    </div>
                    :
                    <button
                        onClick={() => addtoCart(state)}
                        className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg shadow-md transition">
                        ADD TO CART
                    </button>
                }
                {/* <button className="w-full bg-blue-900 text-black py-3 mt-4 rounded hover:bg-blue-800">
                    ADD TO BAG
                </button> */}
            </div>
        </div>
    );
};

export default ProductView;