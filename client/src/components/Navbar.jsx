import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Ensure styles match the theme

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <div className="navbar-logo">
        <h2>Honest Opinions. Expert Verdicts.</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
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
      </ul>
    </nav>
  );
};

export default Navbar;
