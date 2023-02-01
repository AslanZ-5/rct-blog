import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>

      <div className=" ml-auto">
        <Link
          to="login/"
          className="btn btn-outline-secondary my-1 my-sm-0 mr-1"
        >
          Sign In
        </Link>
        <Link to="sign-up/" className="btn btn-outline-success my-1 my-sm-0">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
