import React, { useEffect, useState } from "react";
import GetFeedback from "./GetFeedback";
import "./HRofficeRight.css";
import axios from "axios";

const HRofficeRight = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/feedback")
      .then((res) => {
        setFeedback(res.data.data);
        // console.log(res.data.data.feedback);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
      <div className="feedback_section">
        {[...feedback].reverse().map((newFeedback) => (
          <GetFeedback
            feedback_Title={newFeedback.fTitle}
            feedback_desc={newFeedback.feedback}
          />
        ))}
      </div>
    </div>
  );
};

export default HRofficeRight;
