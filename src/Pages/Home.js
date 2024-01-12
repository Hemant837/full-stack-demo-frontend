import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ProductsContext from "../context/products-context";

const HomePage = () => {
  const authCtx = useContext(ProductsContext);

  return (
    <div className="text-center">
      <div className="bg-white p-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Website</h1>
        <p className="text-gray-600 font-semibold">
          Explore our amazing products and discover new possibilities. Join us
          on this journey!
        </p>
        <div className="mt-8">
          {authCtx.isLogin ? (
            <Link to="/products">
              <button className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Already Login
              </button>
            </Link>
          ) : (
            <Link to="/auth">
              <button className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
