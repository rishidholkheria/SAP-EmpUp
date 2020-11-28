import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

//Navigation Bar on Top
function Header() {
  return (
    <nav className="header">
      <Link to="/">
        <img
          className="header_logo "
          src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
          alt=""
        />
      </Link>

      {/* <div className="header_search">
        <input type="text" className="header_searchinput" /> 
        <SearchIcon className="header_searchicon"></SearchIcon>{" "}
      </div> */}

      <div className="header_nav">
        <Link to="/login" className="header_link">
          <div className="header_options">
            <span className="header_optionLineOne">Hello Dude!</span>
            <span className="header_optionLineTwo">Sign out</span>
          </div>
        </Link>

        <Link to="/login" className="header_link">
          <div className="header_options">
            <span className="header_optionLineOne">Return</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link>

        <Link to="/login" className="header_link">
          <div className="header_options">
            <span className="header_optionLineOne">Your</span>
            <span className="header_optionLineTwo">Prime</span>
          </div>
        </Link>

        {/* <Link to="/checkout" className="header_link">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_basketCount">
              {basket.length}
            </span>
          </div>
        </Link> */}
      </div>
    </nav>
  );
}

export default Header;
