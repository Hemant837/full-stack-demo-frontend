import React, { useState, useContext } from "react";
import axios from "axios";

import ProductsContext from "../context/products-context";
import Input from "../components/util/Input";

const AddProduct = () => {
  const pCtx = useContext(ProductsContext)

  const [formValues, setFormValues] = useState({
    userId: pCtx.userId,
    id: parseInt(Math.random() * 10000 + 1),
    pName: "",
    pDescription: "",
    price: "",
    imgUrl: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  

  const addProductHandler = async (event) => {
    event.preventDefault();

    if (!formValues.pName) {
      setError("Please enter a product name.");
      return;
    }
    if (!(formValues.pDescription && formValues.pDescription.length > 5)) {
      setError("Please enter the description with at least 6 characters.");
      return;
    }

    if (!formValues.price || isNaN(formValues.price) || formValues.price <= 0) {
      setError("Price must be a valid positive number.");
      return;
    }

    if (formValues.price >= 1000) {
      setError("Price must be less than or equal to 999.");
      return;
    }

    if (
      !formValues.imgUrl ||
      (!formValues.imgUrl.includes(".jpg") &&
        !formValues.imgUrl.includes(".jpeg"))
    ) {
      setError("Please enter a valid image URL.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/add-product",
        formValues
      );

      console.log(response);
      console.log(response.data);

      if (response.status === 200) {
        setSuccess(response.data.message);
        // alert(response.data.message);
      } else {
        setError(
          response.data.error || "Error adding the product. Please try again."
        );
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      setSuccess("");
    } finally {
      setFormValues({
        userId: pCtx.userId,
        id: parseInt(Math.random() * 10000 + 1),
        pName: "",
        pDescription: "",
        price: "",
        imgUrl: "",
      });
    }
  };

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Product</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && (
        <p className="mb-4 text-green-600 font-semibold">{success}</p>
      )}
      <form onSubmit={addProductHandler}>
        <Input
          text="Product Name"
          name="pName"
          type="text"
          value={formValues.pName}
          onChange={(e) => {
            handleInputChange("pName", e.target.value);
            setError("");
          }}
        />
        <Input
          text="Description"
          name="pDescription"
          type="text"
          value={formValues.pDescription}
          onChange={(e) => {
            handleInputChange("pDescription", e.target.value);
            setError("");
          }}
        />
        <Input
          text="Price"
          name="price"
          type="number"
          value={formValues.price}
          onChange={(e) => {
            handleInputChange("price", parseInt(e.target.value));
            setError("");
          }}
        />
        <Input
          text="Image URL"
          name="imgUrl"
          type="text"
          value={formValues.imgUrl}
          onChange={(e) => {
            handleInputChange("imgUrl", e.target.value);
            setError("");
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-green"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
