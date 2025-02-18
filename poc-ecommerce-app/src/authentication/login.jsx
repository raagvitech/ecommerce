import { useDispatch, useSelector } from "react-redux";
import { login, LoginApi } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(event.target.elements, "event")
        const elements = event.target.elements
        const payoad = {
            "email" : elements?.email?.value,
            "password" : elements?.password?.value
        }
        dispatch(LoginApi(payoad))
        // navigate(role === "admin" ? "/dashboard" : "/user/products");
    };

    const { role: userRole } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userRole === "consumer") {
            navigate("/user/landing")
        }
    }, [userRole])

    return (
        // <div className="flex flex-col items-center gap-4 ">
        //     <div className="bg-white">
        //         <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        //             <h2 className="text-2xl font-bold tracking-tight text-gray-900">Login</h2>

        //             <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
        //                 {products.map((product) => (
        //                     <div key={product.id} className="group relative"
        //                         onClick={() => handleLogin(product.role)}
        //                     >
        //                         <img
        //                             alt={product.imageAlt}
        //                             src={product.imageSrc}
        //                             className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        //                         />
        //                         <div className="mt-4 flex justify-between items-center">
        //                             <div>
        //                                 <h3 className="text-md text-gray-700">
        //                                     <a>
        //                                         <span aria-hidden="true" className="absolute inset-0" />
        //                                         {product.name}
        //                                     </a>
        //                                 </h3>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Signup
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
