import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = (props) => {
  const deleteProductHandler = async () => {
    try {
      const productId = props.id;

      const deleteProduct = await axios.delete(
        `http://localhost:5000/api/delete-product/${productId}`
      );
      console.log(deleteProduct);
      alert("Product Deleted Succesfully.");
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  return (
    <li className="w-96 m-8 border p-4 mb-4 shadow-sm transition-transform transform hover:scale-105">
      <img src={props.imgUrl} alt={props.pName} className="mb-2 max-w-full" />
      <h3 className="text-lg font-semibold">{props.pName}</h3>
      <p className="text-gray-700 mb-2">{props.pDescription}</p>
      <p className="text-blue-500 font-bold">${props.price.toFixed(2)}</p>
      <Link to={`/products/${props.id}`}>
        <button className="mt-2 mr-2 px-2 rounded-sm bg-green-500 font-semibold text-white shadow-sm transition hover:-translate-y-0.5">
          View
        </button>{" "}
      </Link>
      <button
        onClick={deleteProductHandler}
        className="mt-2 px-2 rounded-sm bg-red-500 font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
      >
        Delete
      </button>

      <Link to={`/edit-product/${props.id}`}>
        <button className="mt-2 ml-2 px-2 rounded-sm bg-blue-500 font-semibold text-white shadow-sm transition hover:-translate-y-0.5">
          Edit
        </button>
      </Link>
    </li>
  );
};

export default Product;
