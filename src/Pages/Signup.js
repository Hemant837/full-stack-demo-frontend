import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import ProductsContext from "../context/products-context";
import Input from "../components/util/Input";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const authCtx = useContext(ProductsContext);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName) {
      setError("Please enter your full name.");
    }
    if (!email.match(emailRegex)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a valid password.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }
    if (!/\d/.test(password)) {
      setError("Password must contain at least one digit.");
      return;
    }
    if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    const userData = {
      userId: uuidv4(),
      fullName: fullName,
      userEmail: email,
      userPassword: password,
    };

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        userData
      );
      console.log(response.data);
      authCtx.login();

      if (response.status === 200) {
        setLoading(false);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data.token);
        navigate("/products");
      }
    } catch (error) {
      setError(
        error.response.data.error ||
          "An error occurred during signup. Please try again."
      );
      console.error(error);
    }
    setEmail("");
    setPassword("");
    setLoading(false);
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Signup</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={formSubmitHandler}>
        <Input
          text="Full name"
          name="name"
          type="text"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            setError("");
          }}
        />
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
        {loading && (
          <p className="my-2 font-semibold text-center">Loading...</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 font-semibold text-white w-full py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Signup
        </button>
        <div className="mt-4 font-semibold text-center hover:underline">
          <Link to="/auth">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
