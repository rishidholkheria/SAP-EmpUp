import React from "react";
import "./HeroSectionLeft.css";
import graphImage from "./graphImage.png";

const HeroSectionLeft = () => {
  return (
    <div className="herosection_left">
      <div className="written_part_left">
        <div className="wpf_para">
          <p className="para_one">One stop solution</p>
          <p className="para_two">for endless</p>
          <p className="para_three">Organisation Problems</p>
        </div>
      </div>

      <div className="icon_part_right">
        <img src={graphImage} alt="" />
      </div>
    </div>
  );
};

export default HeroSectionLeft;
