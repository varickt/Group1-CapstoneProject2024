import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure styles match the theme

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Honest Opinions. Expert Verdicts.</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/sign-in" className="nav-link">
            Sign In
          </Link>
        </li>
        <li>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
