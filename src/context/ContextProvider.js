import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductsContext from "./products-context";

const ContextProvider = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [newToken, setNewToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const existingUserId = localStorage.getItem("userId");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setNewToken(token);
      setUserId(existingUserId);
      setIsLogin(true);
    }
  }, [existingUserId]);

  const loginHandler = () => {
    setUserId(existingUserId);
    setIsLogin(true);
    setLoading(false);
  };

  const logoutHandler = () => {
    setIsLogin(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setLoading(false);
  };

  

  useEffect(() => {
    if (isLogin) {
      const fetchData = async () => {
        try {
          const fetchData = await axios.get(`http://localhost:5000/api/products/${userId}`);
          setItems(fetchData.data);
          setError(null);
        } catch (error) {
          setError(error.message || "An error occurred");
        }
      };
      fetchData();
      setLoading(false);

      // Fetch data every 2 seconds
      const intervalId = setInterval(fetchData, 2000);

      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }

    // If not logged in, reset the state
    setItems([]);
    setError(null);
    setLoading(false);

    // If not logged in, don't start the interval
    return undefined;
  }, [isLogin, userId]);

  const productsContext = {
    items: items,
    loading: loading,
    error: error,
    isLogin: isLogin,
    newToken: newToken,
    userId: userId,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <ProductsContext.Provider value={productsContext}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ContextProvider;
