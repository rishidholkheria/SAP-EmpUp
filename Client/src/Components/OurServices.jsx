import React from "react";
import "./OurServices.css";

const OurServices = ({ number, heading, description }) => {
  return (
    <div className="our_services">
      <p className="one_word">{number}</p>
      <h2 className="service_one_heading">{heading}</h2>
      <p className="service_one_para">{description}</p>
    </div>
  );
};

export default OurServices;
