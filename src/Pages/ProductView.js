import React, { useContext } from "react";
import { useParams } from "react-router";
import ProductsContext from "../context/products-context";

const ProductView = () => {
  const pCtx = useContext(ProductsContext);
  const { id } = useParams();
  const productId = parseInt(id, 10);

  const productDetail = pCtx.items.find((product) => product.id === productId);

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Product Details
        </h2>
      </div>
      {productDetail ? (
        <div>
          <img
            src={productDetail.imgUrl}
            alt={productDetail.pName}
            className="mb-4 max-w-full"
          />
          <h3 className="text-xl font-semibold mb-2">{productDetail.pName}</h3>
          <p className="text-gray-700 mb-2">{productDetail.pDescription}</p>
          <p className="text-blue-500 font-bold mb-4">
            ${productDetail.price.toFixed(2)}
          </p>
        </div>
      ) : (
        <p className="text-red-500 font-semibold">Product not found</p>
      )}
    </div>
  );
};

export default ProductView;
