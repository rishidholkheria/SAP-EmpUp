import React from "react";
import OurServices from "./OurServices";
import "./MiddleSection.css";

const MiddleSection = () => {
  return (
    <div className="hero_right">
      <OurServices
        number={"01"}
        heading={"Service One"}
        description={" Lorem ipsum dolor sit amet consectetur, adipisici"}
      />
      <OurServices
        number={"02"}
        heading={"Service Two"}
        description={" Lorem ipsum dolor sit amet consectetur, adipisici"}
      />
      <OurServices
        number={"03"}
        heading={"Service Three"}
        description={" Lorem ipsum dolor sit amet consectetur, adipisici"}
      />
    </div>
  );
};

export default MiddleSection;
