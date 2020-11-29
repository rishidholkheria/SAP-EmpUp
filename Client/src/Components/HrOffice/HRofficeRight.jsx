import React, { useEffect, useRef, useState } from "react";
import { useToasts } from "react-toast-notifications";
import GetFeedback from "./GetFeedback";
import Payroll from "../Payroll";
import "./HRofficeRight.css";
import axios from "axios";
require("dotenv").config();

const HRofficeRight = () => {
  const [feedback, setFeedback] = useState([]);
  const [csv, setCsv] = useState(null);
  const [payrollMail, setPayrollMail] = useState("");
  const [date, setDate] = useState("");

  const { addToast } = useToasts();

  const apiOne = process.env.REACT_APP_SERVER + "/payroll/send-payroll";
  const apiTwo = process.env.REACT_APP_SERVER + "/payroll/upload";
  // const apiThree = "http://localhost:4000/api/upload-employee/upload-to-db";

  const organisationId = localStorage.getItem("orgId");
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + `/feedback/${organisationId}`)
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

  const getDate = () => {
    var d = new Date();
    var month = d.getMonth() + 1;
    var systemDate = d.getDate() + "-" + month + "-" + d.getFullYear();
    setDate(systemDate);
  };

  const generatePayroll = () => {
    var formData = new FormData();
    formData.append("file", csv);
    const email = payrollMail;
    getDate();
    // alert("Payroll Generated and sent to your Email!");

    addToast("Request sent wait for a while...", {
      appearance: "info",
      autoDismiss: true,
    });

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
          addToast("Payroll generated successfully!!!", {
            appearance: "success",
            autoDismiss: true,
          });
        })
      )
      .catch((errors) => {
        console.log(errors);

        addToast("Error in generating Payroll!!!", {
          appearance: "error",
          autoDismiss: true,
        });
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
        {/* <input
          type="text"
          className="generate_email"
          placeholder="Payment Period"
          value={payPeriod}
          onChange={(e) => setPayPeriod(e.target.value)}
        /> */}
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
