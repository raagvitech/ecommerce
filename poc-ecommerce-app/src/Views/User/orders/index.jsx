import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { authentication } from '../../../configure';
import { useDispatch, useSelector } from 'react-redux';

const OrderHistory = () => {
  const orders = [
    {
      orderNumber: 'WU88191111',
      datePlaced: 'Jul 6, 2021',
      totalAmount: '$160.00',
      items: [
        {
          image: '/path/to/backpack.jpg',
          name: 'Micro Backpack',
          price: '$70.00',
          description:
            'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
          deliveredDate: 'July 12, 2021',
        },
        {
          image: '/path/to/tote.jpg',
          name: 'Nomad Shopping Tote',
          price: '$90.00',
          description:
            'This durable shopping tote is perfect for the world traveler. Its yellow canvas construction is water, fray, and tear resistant. The matching handle, backpack straps, and shoulder loops provide multiple carry options for a day out on your next adventure.',
          deliveredDate: 'July 12, 2021',
        },
      ],
    },
    {
      orderNumber: 'AT48441546',
      datePlaced: 'Dec 22, 2020',
      totalAmount: '$40.00',
      items: [
        {
          image: '/path/to/bag.jpg',
          name: 'Double Stack Clothing Bag',
          price: '$40.00',
          description:
            'Save space and protect your favorite clothes in this double-layer garment bag. Each compartment easily holds multiple pairs of jeans or tops while keeping your items neatly folded throughout your trip.',
        },
      ],
    },
  ];

  const dispatch = useDispatch();

  const { CartListData, paymentDetails } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)

  const [orderDetails, setOrderDetails] = useState({});

  const getOrdersList = () => {

    axios.get(`${authentication.Order_list}?page=&limit=&search=&user_uuid=${user?.user?.uuid}`, {
      headers : {
        'Authorization' : `Bearer ${user?.accessToken}`
      }
    })
      .then((res) => {
        console.log(res?.data, "fffffffffffffff")
        setOrderDetails(res?.data);
      })
      .catch((err) => {
        console.log(err?.response)
      })
  }

  console.log(orderDetails, "orderDetails")

  useEffect(() => {
    getOrdersList();
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Order History</h2>
      <p className="text-gray-500 mb-6">
        Check the status of recent orders, manage returns, and discover similar products.
      </p>

      {orderDetails?.data?.result?.map((order) => (
        <div key={order.orderNumber} className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200">
          {/* Order Info */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div>
              <p className="text-lg font-semibold text-gray-700">Order #{order.uuid}</p>
              <p className="text-gray-500">Placed on {order.createdAt}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Total: {order.total_amount}</p>
            </div>
            {/* <div className="flex space-x-4">
              <button className="px-4 py-2 text-blue-600 hover:text-blue-800 transition duration-200">View Order</button>
              <button className="px-4 py-2 text-blue-600 hover:text-blue-800 transition duration-200">View Invoice</button>
            </div> */}
          </div>

          <hr className="border-gray-300 my-4" />

          {/* Order Items */}
          {order?.details?.map((item, index) => (
            <div key={index} className="flex items-center space-x-6 mb-4">
              <img src={item.image} alt={item.name} className="w-28 h-28 rounded-lg shadow-sm object-cover" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">{item.price}</p>
                {/* <p className="text-gray-500 text-sm mt-1">{item.description}</p> */}
                {item.deliveredDate && (
                  <p className="text-green-600 font-medium mt-2">Delivered on {item.updatedAt}</p>
                )}
                {/* <div className="mt-3 flex space-x-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
                    View Product
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-md hover:bg-gray-200 transition duration-200">
                    Buy Again
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
