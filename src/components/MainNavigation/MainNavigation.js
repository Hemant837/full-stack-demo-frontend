import React from "react";
import { Outlet } from "react-router";

import Navbar from "./Navbar";
import Footer from "./Footer";

const MainNavigation = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainNavigation;
