import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css"; // Import CSS file for NavBar styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Homepage
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">
            About
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
