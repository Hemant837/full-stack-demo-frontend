import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import ProductsContext from "../../context/products-context";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const authCtx = useContext(ProductsContext);
  const [isSmallNav, setIsSmallNav] = useState(false);

  const closeSmallNav = () => {
    setIsSmallNav(false);
  };

  const toggleSmallNav = () => {
    setIsSmallNav((prev) => !prev);
  };
  return (
    <header className="">
      <nav
        className={`${
          isSmallNav ? "h-40 p-2" : "h-14"
        } flex bg-blue-500 text-white shadow-md justify-around items-center transition-all duration-300`}
      >
        {authCtx.isLogin ? (
          <Link to="/products">
            <h2 className="font-bold text-2xl">Next Gen.</h2>
          </Link>
        ) : (
          <Link to="/">
            <h2 className="font-bold text-2xl">Next Gen.</h2>
          </Link>
        )}
        <NavLinks isSmallNav={isSmallNav} closeSmallNav={closeSmallNav} />

        {isSmallNav ? (
          <div
            className="font-bold text-2xl cursor-pointer md:hidden"
            onClick={toggleSmallNav}
          >
            X
          </div>
        ) : (
          <div
            className="block md:hidden cursor-pointer"
            onClick={toggleSmallNav}
          >
            <div className="w-6 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white"></div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
