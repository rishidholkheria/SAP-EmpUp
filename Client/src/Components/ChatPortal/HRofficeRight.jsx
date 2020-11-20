import React from "react";
import GetFeedback from "./GetFeedback";
import "./HRofficeRight.css";

const HRofficeRight = () => {
  return (
    <div className="hr_office_right">
      <div className="payroll">
        <h2>Payroll Generator</h2>
        <p className="payroll_desc">
          Email of the Payroll will be sent to each employee according to the
          set Payroll.
        </p>
        <button className="generate">Generate</button>
      </div>
      <div className="feedvack_section">
        <GetFeedback />
        <GetFeedback />
        <GetFeedback />
        <GetFeedback />
        <GetFeedback />
        <GetFeedback />
      </div>
    </div>
  );
};

export default HRofficeRight;
