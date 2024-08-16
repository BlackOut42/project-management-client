import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./authContext";
import ThemeSwitcher from "./ThemeSwitcher";
import "./styles/Navbar.css";
import "./styles/ToggleSwitch.css";
import { ReactComponent as LogoSvg } from "./logo/logo.svg";

const NavBar = () => {
  const { authData, logout } = useContext(AuthContext);
  const user = authData?.user;

  return (
    <div>
      <header className="header-container">
        <ul className="theme-switcher-container">
          <ThemeSwitcher />
        </ul>

        <Link to="/" className="logo-container">
          <LogoSvg className="logo" />
        </Link>

        <ul className="greetings-container">
          {user && (
            <>
              {`Hello,`}
              <br />
              {user.firstName}
            </>
          )}
        </ul>
      </header>

      <div className="navbar-container">
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
            ) : null}
          </ul>

          <ul className="navbar-list">
            {authData ? (
              <li className="navbar-item">
                <button onClick={logout} className="navbar-link">
                  Logout
                </button>
              </li>
            ) : (
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  Log In
                </Link>
                <> | </>
                <Link to="/register" className="navbar-link">
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default NavBar;
