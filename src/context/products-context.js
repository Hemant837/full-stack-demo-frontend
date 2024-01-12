import React from "react";

const ProductsContext = React.createContext({
  items: [],
  loading: null,
  error: null,
  isLogin: null,
  newToken: null,
  login: () => {},
  logout: () => {},
});

export default ProductsContext;
