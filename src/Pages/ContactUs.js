import React, { useState } from "react";
import axios from "axios";

import Input from "../components/util/Input";

const ContactUsPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userName) {
      setError("Please enter your name.");
      return;
    }

    if (!email.match(emailRegex)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!(message && message.length > 5)) {
      setError("Please enter a message with at least 6 characters.");
      return;
    }

    try {
      // Set loading state
      setError("");
      // Make API request
      const response = await axios.post(
        "http://localhost:5000/api/contact-us",
        { userName, email, message }
      );
      // Provide feedback to users
      console.log(response);
      console.log(response.data);
      // Optionally redirect or show a success message

      if (response.status === 200) {
        setSuccess(response.data.message);
      } else {
        setError(response.data.error.message);
      }
    } catch (error) {
      setError(error.message || "Error sending the message");
      console.log(error);
    } finally {
      // Reset form fields and loading state
      setUserName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {success && (
        <p className="mb-4 text-green-600 font-semibold">{success}</p>
      )}
      <form onSubmit={formSubmitHandler}>
        <Input
          text="Your Name"
          name="name"
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            setError("");
          }}
        />

        <Input
          text="Your Email"
          name="email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="message"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError("");
            }}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUsPage;
