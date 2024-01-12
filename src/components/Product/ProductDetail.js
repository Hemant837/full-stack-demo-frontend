import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

import ProductsContext from "../../context/products-context";
import Input from "../util/Input";

const ProductDetail = () => {
  const pCtx = useContext(ProductsContext);
  const { id } = useParams();
  const productId = parseInt(id, 10);

  const navigate = useNavigate();

  const productDetail = pCtx.items.find((product) => product.id === productId);
  const userId = pCtx.userId

  const [updatedProduct, setUpdatedProduct] = useState({
    userId: userId,
    pName: productDetail.pName,
    pDescription: productDetail.pDescription,
    price: productDetail.price,
    imgUrl: productDetail.imgUrl,
  });

  const updateProductHandler = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/update-product/${productId}`,
        updatedProduct
      );
    } catch (error) {
      console.log(error);
    } finally {
      alert("Product Updated Successfully");
      navigate("/products");
    }
  };

  const handleInputChange = (name, value) => {
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Edit Product
      </h2>
      <form onSubmit={updateProductHandler}>
        <Input
          text="Product Name"
          name="pName"
          type="text"
          value={updatedProduct.pName}
          onChange={(e) => handleInputChange("pName", e.target.value)}
        />
        <Input
          text="Description"
          name="pDescription"
          type="text"
          value={updatedProduct.pDescription}
          onChange={(e) => handleInputChange("pDescription", e.target.value)}
        />
        <Input
          text="Price"
          name="price"
          type="number"
          value={updatedProduct.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
        />
        <Input
          text="Image URL"
          name="imgUrl"
          type="text"
          value={updatedProduct.imgUrl}
          onChange={(e) => handleInputChange("imgUrl", e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-green"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProductDetail;
