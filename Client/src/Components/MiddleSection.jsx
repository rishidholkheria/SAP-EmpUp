import React from "react";
import OurServices from "./OurServices";
import "./MiddleSection.css";
// import solutionImage from "./solutionImage.png";

const MiddleSection = () => {
  return (
    <div className="hero_right">
      <OurServices
        number={"01"}
        heading={"Easy solution"}
        description={" Easy solution for a fully loaded Virtual HR Office. Chat portal to facilitate chat with the HR directly!"}
      />
      <OurServices
        number={"02"}
        heading={"Boost productivity"}
        description={"Boost your employee's productivity and moral by stress buster games and 360 degree feedback."}
      />
      <OurServices
        number={"03"}
        heading={"Virtual Library"}
        description={"Virtual library lets you store all the company's referral books and many more important files & documents."}
      />
    </div>
  );
};

export default MiddleSection;
