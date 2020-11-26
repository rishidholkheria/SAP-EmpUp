import React, { useEffect, useRef, useState } from "react";
import GetFeedback from "./GetFeedback";
import "./HRofficeRight.css";
import axios from "axios";

const HRofficeRight = () => {
  const [feedback, setFeedback] = useState([]);
  const [csv, setCsv] = useState(null);
  const [payrollMail, setPayrollMail] = useState("");

  const apiOne = "http://localhost:4000/api/payroll/send-payroll";
  const apiTwo = "http://localhost:4000/api/payroll/upload";
  // const apiThree = "http://localhost:4000/api/upload-employee/upload-to-db";

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

  const orgCsv = useRef(null);
  const csv_name = useRef(null);

  const onCsvInput = () => {
    orgCsv.current.click();
  };

  const clickFile = (e) => {
    let file = e.target.files[0];
    setCsv(file);

    if (orgCsv.current.value) {
      csv_name.current.innerHTML = orgCsv.current.value.match(
        /[\/\\]([\w\d\s\.\-\(\)]+)$/
      )[1];
    } else {
      csv_name.current.innerHTML = "No file chosen, yet.";
    }
  };

  const generatePayroll = () => {
    var formData = new FormData();
    formData.append("file", csv);
    const email = payrollMail;
    alert("Payroll Generated and sent to your Email!");

    const rOne = axios.post(apiTwo, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const rTwo = axios.post(apiOne, {
      email,
    });

    axios
      .all([rOne, rTwo])
      .then(
        axios.spread(async (...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];

          console.log("responseOne", responseOne);
          console.log("responseTwo", responseTwo);
        })
      )
      .catch((errors) => {
        console.log(errors);
        // alert(errors);
      });
  };
  return (
    <div className="hr_office_right">
      <div className="payroll">
        <h2>Payroll Generator</h2>
        <p className="payroll_desc">
          Email of the Payroll will be sent to each employee according to the
          set Payroll.
        </p>
        <input
          className="csv_file"
          type="file"
          placeholder="Org Income Details"
          id="file"
          hidden="hidden"
          onChange={(e) => clickFile(e)}
          ref={orgCsv}
        />
        <input
          type="text"
          className="generate_email"
          placeholder="Email Address"
          value={payrollMail}
          onChange={(e) => setPayrollMail(e.target.value)}
        />
        <input
          type="text"
          className="generate_email"
          placeholder="Excel File"
          // onChange={(e) => setCsvName(e.target.value)}
          onClick={onCsvInput}
        />
        <span className="file_text" id="custom-text" ref={csv_name}></span>
        <button className="generate" onClick={generatePayroll}>
          Generate
        </button>
      </div>
      <div className="feedback_section">
        <h3>Feedback Portal</h3>
        {[...feedback].reverse().map((newFeedback) => (
          <GetFeedback
            feedback_Title={newFeedback.fTitle}
            feedback_Dept={newFeedback.fDept}
            feedback_desc={newFeedback.feedback}
          />
        ))}
      </div>
    </div>
  );
};

export default HRofficeRight;
