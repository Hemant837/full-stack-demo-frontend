import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import ProductsContext from "../context/products-context";
import Input from "../components/util/Input";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const authCtx = useContext(ProductsContext);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(emailRegex)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!(password && password.length > 5)) {
      setError("Please enter a password which is at least 6 characters long.");
      setLoading(false);
      return;
    }

    const userData = {
      userEmail: email,
      userPassword: password,
    };

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth",
        userData
      );
      // console.log("Auth Page", response.data);

      if (response.status === 200) {
        setLoading(false);
        authCtx.login();
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data.token);
        navigate("/products");
      }
    } catch (error) {
      setError(
        error.response.data.error ||
          "An error occurred during login. Please try again."
      );
      console.error(error);
    }
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Login</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={formSubmitHandler}>
        <Input
          text="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <Input
          text="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
        {/* <div className="mb-4 font-semibold text-green-600 hover:underline">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div> */}
        {loading && (
          <p className="my-2 font-semibold text-center">Loading...</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 font-semibold text-white w-full py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Log In
        </button>
      </form>
      <div className="mt-4 font-semibold text-center hover:underline">
        <Link to="/signup">Don't have account? Signup</Link>
      </div>
    </div>
  );
};

export default AuthPage;
