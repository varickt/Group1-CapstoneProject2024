import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Car Judge</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-link">Home</Link> {/* Home link */}
        </li>
        <li>
          <Link to="/sign-in" className="nav-link">Sign In</Link>
        </li>
        <li>
          <Link to="/register" className="nav-link">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;