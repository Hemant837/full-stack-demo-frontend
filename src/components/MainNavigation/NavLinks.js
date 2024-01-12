import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ProductsContext from "../../context/products-context";

const NavLinks = (props) => {
  const authCtx = useContext(ProductsContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };

  return (
    <ul
      className={`md:w-96 justify-between ${
        props.isSmallNav ? "block" : "hidden "
      } font-semibold md:flex`}
    >
      {authCtx.isLogin && (
        <React.Fragment>
          <li className="hover:underline text-white text-lg">
            <Link to="/products" onClick={props.closeSmallNav}>
              Products
            </Link>
          </li>
          <li className="hover:underline text-white text-lg">
            <Link to="/add-product" onClick={props.closeSmallNav}>
              Add Product
            </Link>
          </li>
          <li className="hover:underline text-white text-lg">
            <Link to="/profile" onClick={props.closeSmallNav}>
              Profile
            </Link>
          </li>
          <li
            onClick={() => {
              logoutHandler();
              props.closeSmallNav();
            }}
            className="border w-max rounded-sm px-2 cursor-pointer text-white text-lg transition-transform transform hover:scale-105"
          >
            Logout
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default NavLinks;
