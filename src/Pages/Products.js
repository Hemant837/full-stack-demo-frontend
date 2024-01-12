import React, { useContext } from "react";

import ProductsContext from "../context/products-context";
import Product from "../components/Product/Product";

const ProductsPage = () => {
  const pCtx = useContext(ProductsContext);

  if (pCtx.loading) {
    return (
      <p className="mt-48 font-semibold text-2xl text-center">Loading...</p>
    );
  }
  if (pCtx.error) {
    return (
      <p className="mt-48 font-semibold text-2xl text-center">
        Error: {pCtx.error.message}
      </p>
    );
  }

  return (
    <div className="xl:ml-24">
      {pCtx.items.length === 0 ? (
        <p className="mt-48 font-semibold text-2xl text-center">
          No products available. Please add at least one product.
        </p>
      ) : (
        <ul className="flex flex-col justify-center items-center lg:flex-row lg:flex-wrap 2xl:justify-normal">
          {pCtx.items.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsPage;
