import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import Signup from "../Pages/Signup";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers"
import AllProducts from "../Pages/AllProducts";
import SearchProductCategorywise from "../Pages/SearchProductCategorywise";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/SearchProduct";
import CheckoutPage from "../Pages/CheckoutPage";
import Orders from "../Pages/UserOrders";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/forgotpassword",
                element: <ForgotPassword></ForgotPassword>
            },
            {
                path: "/signup",
                element: <Signup></Signup>
            },
            {
                path: "/productcategory",
                element: <SearchProductCategorywise></SearchProductCategorywise>
            },
            {
                path: "/product/:id",
                element: <ProductDetails></ProductDetails>
            },
            {
                path: "/cart",
                element: <Cart></Cart>
            },
            {
                path: "/searchproduct",
                element: <SearchProduct></SearchProduct>
            },
            {
                path: "/checkout",
                element: <CheckoutPage></CheckoutPage>
            },
            {
                path: "/adminpanel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "allusers",
                        element: <AllUsers />
                    },
                    {
                        path: "allproducts",
                        element: <AllProducts />
                    },
                    {
                        path: "orders",
                        element: <Orders/>
                    }
                ]
            },
        ]
    }
])

export default Router