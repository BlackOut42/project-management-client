import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./authContext";
import "./styles/Navbar.css";

const NavBar = () => {
  const { authData, logout } = useContext(AuthContext);

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
        {authData ? (
          <li className="navbar-item">
            <Link to="/personalarea" className="navbar-link">
              Personal Area
            </Link>
          </li>
        ) : (<></>)}
        {authData ? (
          <li className="navbar-item">
            <button onClick={logout} className="navbar-link">
              Logout
            </button>
          </li>
        ) : (
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <> | </>
            <Link to="/register" className="navbar-link">
              Register
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
