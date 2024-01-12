import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import { checkAuthLoader } from "../util/auth";

const MainNavigation = lazy(() => import("../MainNavigation/MainNavigation"));
const AuthPage = lazy(() => import("../../Pages/Auth"));
const Signup = lazy(() => import("../../Pages/Signup"));
const HomePage = lazy(() => import("../../Pages/Home"));
const ProductsPage = lazy(() => import("../../Pages/Products"));
const AddProduct = lazy(() => import("../../Pages/AddProducts"));
const ProductDetail = lazy(() => import("../Product/ProductDetail"));
const ProductView = lazy(() => import("../../Pages/ProductView"));
const ProfilePage = lazy(() => import("../../Pages/Profile"));
const ContactUsPage = lazy(() => import("../../Pages/ContactUs"));
const ForgotPassword = lazy(() => import("../../Pages/ForgotPassword"));

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className="mt-40 text-2xl font-semibold text-center">
            Loading...
          </div>
        }
      >
        <MainNavigation />
      </Suspense>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/auth", element: <AuthPage /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      {
        path: "/products",
        element: <ProductsPage />,
        loader: checkAuthLoader,
      },
      {
        path: "/products/:id",
        element: <ProductView />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
        loader: checkAuthLoader,
      },
      { path: "/profile", element: <ProfilePage />, loader: checkAuthLoader },
      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "/edit-product/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);

export default publicRoutes;
