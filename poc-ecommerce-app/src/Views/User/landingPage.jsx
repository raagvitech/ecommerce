import React from "react";
import maleModel from './../../assets/images/maleModel.png'
import femaleModel from './../../assets/images/femaleModel.png'
import { useNavigate } from "react-router-dom";

export default function FashionBanner() {

    const navigate = useNavigate();

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#fbe8e5] px-6">
            {/* Left Model */}
            <div className="absolute left-10 bottom-0">
                <div className="relative">
                    <div className="absolute -z-10 top-[-20px] left-5 w-32 h-32 bg-red-500 rounded-full"></div>
                    <img
                        onClick={() => navigate('/user/products/CAT-58A965CC')}
                        src={maleModel}
                        alt="Male Model"
                        className="h-[600px] object-contain cursor-pointer"
                    />
                </div>
            </div>

            {/* Right Model */}
            <div className="absolute right-10 bottom-0">
                <div className="relative">
                    <div className="absolute -z-10 top-[-20px] right-5 w-32 h-32 bg-red-500 rounded-full"></div>
                    <img
                        onClick={() => navigate('/user/products/CAT-57EA31AE')}
                        src={femaleModel}
                        alt="Female Model"
                        className="h-[600px] object-contain cursor-pointer"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="text-center max-w-2xl">
                <h2 className="text-3xl font-semibold text-gray-800">Find Your Style</h2>
                <h1 className="text-5xl font-bold text-red-500">With Yourself</h1>
                <p className="mt-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod
                    tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </p>
                {/* <button className="mt-6 px-6 py-3 bg-black text-black rounded-full shadow-md hover:bg-gray-800 transition">
                    Explore Now
                </button> */}
            </div>
        </div>
    );
}
