import React from "react";
import hrsecond from "./hrsecond.png";
import "./HeroSectionRight.css";

const HeroSectionRight = () => {
  return (
    <div className="herosection_right">
      <div className="hr_icon_left">
        <img src={hrsecond} alt="" />
      </div>
      <div className="hrs_right">
        <h1>Businesses Solutions</h1>
        <div className="pf_para">
          <p>
            "In these difficult times many businesses are struggling to keep
            their doors open and trying to find ways to keep their employees
            safe, comfortable and productive. Identifying and implementing
            effective employee policies and seeking full advantage of current
            technology may make businesses in the coming months perform better.
            Our team strives to facilitate organizations with a complete virtual
            human resource office. We ensure mental wellbeing by providing
            multiplayer games that employees can play in their leisure time.
            Chat portal facilitates easy communication and flow of information.
            Payroll facility makes it very convenient to generate payroll. 360
            feedback allows everyone to put forward their views, opinions and
            issues. Virtual library makes it easy to arrange the documents in an
            organized way. It has a dynamic structure that ensures our
            costumer's satisfaction. EmpUp provides one stop solution to all the
            problems faced by the HR department. EmpUp! Accountable, Adoptable,
            Affordable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionRight;
