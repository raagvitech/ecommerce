'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartList } from '../../../redux/slices/cartSlice';
import axios from 'axios';
import { authentication } from '../../../configure';

// const products = [
//     {
//         id: 1,
//         name: 'Throwback Hip Bag',
//         color: 'Salmon',
//         price: '$90.00',
//         quantity: 1,
//         imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
//     },
//     {
//         id: 2,
//         name: 'Medium Stuff Satchel',
//         color: 'Blue',
//         price: '$32.00',
//         quantity: 1,
//         imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     },
//     {
//         id: 2,
//         name: 'Medium Stuff Satchel',
//         color: 'Blue',
//         price: '$32.00',
//         quantity: 1,
//         imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     },
//     {
//         id: 2,
//         name: 'Medium Stuff Satchel',
//         color: 'Blue',
//         price: '$32.00',
//         quantity: 1,
//         imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     },
//     {
//         id: 2,
//         name: 'Medium Stuff Satchel',
//         color: 'Blue',
//         price: '$32.00',
//         quantity: 1,
//         imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     },
//     {
//         id: 2,
//         name: 'Medium Stuff Satchel',
//         color: 'Blue',
//         price: '$32.00',
//         quantity: 1,
//         imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     },
// ];

export default function Cartlist({ open, setOpen }) {  // ✅ Receive state from parent

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { CartListData, paymentDetails } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(CartList({ user_uuid: user?.user?.uuid }, user?.accessToken));
    }, [])

    const RemoveCart = (id) => {
        axios.delete(`${authentication?.remove_cart_item}${id}`, {
            headers : {
                'Authorization' : `Bearer ${user?.accessToken}`
            }
        })
            .then((res) => {
                setTimeout(() => {
                    dispatch(CartList({ user_uuid: user?.user?.uuid }, user?.accessToken));
                }, 500)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel className="pointer-events-auto w-screen max-w-md bg-white shadow-xl">
                            <div className="flex h-full flex-col overflow-y-scroll">
                                {/* Header */}
                                <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b">
                                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping Cart</DialogTitle>
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="p-2 text-gray-400 hover:text-gray-500"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Product List */}
                                <div className="px-4 py-6 sm:px-6 flex-1 overflow-y-auto">
                                    <ul className="space-y-6">
                                        {CartListData.map((product) => (
                                            <li key={product.uuid} className="flex items-center space-x-4 border-b pb-4">
                                                <img src={product?.image_url} alt={product.name} className="h-20 w-20 rounded-md object-cover" />
                                                <div className="flex-1">
                                                    <h3 className="text-sm font-medium text-gray-900">{product.product_name}</h3>
                                                    <p className="text-sm text-gray-500">{product.quantity} * ${product.product_price}</p>
                                                    <p className="text-sm font-semibold text-gray-900">${Number(product.quantity) * Number(product.product_price)}</p>
                                                </div>
                                                <button className="text-red-500 text-sm" onClick={() => RemoveCart(product?.uuid)}>Remove</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Checkout Section */}
                                <div className="border-t px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-lg font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${paymentDetails?.total_amount}</p>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            className="w-full bg-indigo-600 text-black px-6 py-3 rounded-md hover:bg-indigo-700"
                                            onClick={() => { navigate('/user/checkout'); setOpen(false); }}
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                    <div className="mt-4 text-center text-sm">
                                        <button onClick={() => setOpen(false)} className="text-indigo-600 hover:underline">
                                            Continue Shopping →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
