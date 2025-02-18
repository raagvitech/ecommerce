import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/Cards";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CartList } from "../../../redux/slices/cartSlice";
import { useParams } from "react-router-dom";

const sizes = ["All", "S", "M", "L", "XL"];
const colors = ["All", "Red", "Blue", "Green", "Yellow", "Orange", "White", "Brown", "Pink", "Navy Blue", "Grey"];
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $150", min: 100, max: 150 },
];


const ProductList = () => {
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);

  const [productsData, setProductsData] = useState([]);

  const { user } = useSelector((state) => state.auth);

const { gender } = useParams();


  const getProductsData = () => {
    axios.get(`http://localhost:5000/api/v1/product/list?page=0&limit=100&search=&category_uuid=${gender}`, {
      headers : {
        "Authorization" : `Bearer ${user?.accessToken}`
      }
    })
    .then((res) => {
      // console.log(res.data.data.result, "accessToken")
      setProductsData(res.data.data.result)
    })
  }

  const dispatch = useDispatch();

  useEffect(() => {
    getProductsData();
    dispatch(CartList({user_uuid : user?.user?.uuid }, user?.accessToken));
  },[])

  // Filter products based on selected filters
  const filteredProducts = productsData.filter((product) => {
    return (
      (selectedSize === "All" || product.size === selectedSize) &&
      (selectedColor === "All" || product.color === selectedColor) &&
      (selectedPriceRange.label === "All" || (product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max))
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4">

        {/* Sidebar Filters */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Size Filter */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 border rounded-lg text-sm ${selectedSize === size ? "bg-purple-600 text-black font-bold" : "text-gray-700 bg-gray-200"
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`px-3 py-1 border rounded-lg text-sm ${selectedColor === color ? "bg-purple-600 text-black font-bold" : "text-gray-700 bg-gray-200"
                    }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Price</h3>
            <div className="flex flex-col gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  className={`px-3 py-1 border rounded-lg text-sm ${selectedPriceRange.label === range.label ? "bg-purple-600 text-black font-bold" : "text-gray-700 bg-gray-200"
                    }`}
                  onClick={() => setSelectedPriceRange(range)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard productData={product} />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-3">No products match your filter criteria.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
