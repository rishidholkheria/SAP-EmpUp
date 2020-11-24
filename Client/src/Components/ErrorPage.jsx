import React from "react";
import "./ErrorPage.css";
import errorImage from "./errorImage.gif";

const ErrorPage = () => {
  return (
    <div className="error_page">
      <div className="error_card">
        <img className="errorImage" src={errorImage} alt="" />
      </div>
    </div>
  );
};

export default ErrorPage;
