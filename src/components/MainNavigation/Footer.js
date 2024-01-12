import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto w-full h-60 flex flex-col bg-blue-500 text-white p-4 text-lg">
      <nav className="flex flex-wrap justify-around">
        <ul className="">
          <h3 className="font-bold ">Next Gen.</h3>
          <li className="hover:underline">
            <Link to="#">Privacy Policy</Link>
          </li>
          <li className="hover:underline">
            <Link to="#">Terms of Service</Link>
          </li>
          <li className="hover:underline">
            <Link to="#">Blogs</Link>
          </li>
        </ul>
        <ul className="">
          <h3 className="font-bold ">Social Links</h3>
          <li className="hover:underline">
            <Link to="#">Facebook</Link>
          </li>
          <li className="hover:underline">
            <Link to="#">Instagram</Link>
          </li>
          <li className="hover:underline">
            <Link to="#">Linkedin</Link>
          </li>
        </ul>
        <ul className="">
          <h3 className="font-bold ">Support</h3>
          <li className="hover:underline">
            <Link to="#">About us</Link>
          </li>
          <li className="hover:underline">
            <Link to="/contact-us">Contact us</Link>
          </li>
          <li className="hover:underline">
            <Link to="#">Forum</Link>
          </li>
        </ul>
      </nav>
      <p className="mt-12 text-xl text-center font-semibold">
        © 2024 Next Gen. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
