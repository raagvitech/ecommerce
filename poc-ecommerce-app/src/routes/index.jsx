import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../authentication/login";
import ProtectedRoute from "../components/ProtectedRoutes";
import MainLayout from "../components/layouts/mainLayout";
import CheckoutPage from "../Views/User/Checkout";

// user Pages
import ProductList from "../Views/User/products";
import FashionBanner from "../Views/User/landingPage";
import OrderHistory from "../Views/User/orders";
import ProductView from "../Views/User/products/productsView";


function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute roles={["admin", "consumer", "auth"]}>
                        <MainLayout>
                            <Login />
                        </MainLayout>
                    </ProtectedRoute>
                } />
                <Route path="/user/products/:gender" element={
                    <ProtectedRoute roles={["consumer"]}>
                        <MainLayout>
                            <ProductList />
                        </MainLayout>
                    </ProtectedRoute>
                } />
                <Route path="/user/landing" element={
                    <ProtectedRoute roles={["admin", "consumer", "auth"]}>
                        <MainLayout>
                            <FashionBanner />
                        </MainLayout>
                    </ProtectedRoute>
                } />
                <Route path="/user/orders" element={
                    <ProtectedRoute roles={["consumer"]}>
                        <MainLayout>
                            <OrderHistory />
                        </MainLayout>
                    </ProtectedRoute>
                } />
                <Route path="/user/product/view/:id" element={
                    <ProtectedRoute roles={["consumer"]}>
                        <MainLayout>
                            <ProductView />
                        </MainLayout>
                    </ProtectedRoute>
                } />


                <Route path="/user/checkout" element={
                    <ProtectedRoute roles={["consumer"]}>
                        <MainLayout>
                            <CheckoutPage />
                        </MainLayout>
                    </ProtectedRoute>
                } />

            </Routes>
        </Router>
    );
}

export default AppRoutes;
