import React from "react";
import logo from "../images/logo.svg";
import { useLocation, Link } from "react-router-dom";

function Header({ loggedIn, handleLogout, currentEmail }) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="logo" src={logo} alt="around us logo" />
      {loggedIn ? (
        <div className="header__user-container">
          <span className="header__user-email">{currentEmail}</span>
          <button
            className="header__button"
            onClick={handleLogout}
            type="button"
          >
            Sign out
          </button>
        </div>
      ) : (
        <Link
          className="header__link"
          to={location.pathname === "/signin" ? "/signup" : "/signin"}
        >
          {location.pathname === "/signin" ? "Sign up" : "Sign in"}
        </Link>
      )}
    </header>
  );
}
export default Header;
