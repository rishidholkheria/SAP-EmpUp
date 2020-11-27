import React, { useRef, useState, useEffect } from "react";
import "./RegisterOrg.css";
import axios from "axios";
import useHistory, { Link } from "react-router-dom";
require('dotenv').config();

const RegisterOrg = () => {
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgContact, setOrgContact] = useState("");
  const [orgLocation, setOrgLocation] = useState("");
  const [orgType, setOrgType] = useState("");
  const [excel, setExcel] = useState(null);
  const [res, setRes] = useState("");
  const [disable, setDisabled] = useState(true);
  const [nameError, setNameError] = useState(null);

  // const history = useHistory();

  const apiOne = process.env.REACT_APP_SERVER + "/organisation";
  const apiTwo = process.env.REACT_APP_SERVER + "/upload-employee/upload";
  const apiThree = process.env.REACT_APP_SERVER + "/upload-employee/upload-to-db";
  const apiFour =
  process.env.REACT_APP_SERVER + "/upload-employee/send-password-to-organisation";

  const firstRender = useRef(true);
  const Input = useRef(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setDisabled(validateInfo());
  }, [orgName, orgEmail, orgContact, orgLocation, orgType, excel]);

  const clickExcelInput = (e) => {
    let file = e.target.files[0];
    setExcel(file);
  };

  const validateInfo = () => {
    if (
      !/\S+@\S+\.\S+/.test(orgEmail) ||
      orgName === "" ||
      orgLocation === "" ||
      orgType === "" ||
      orgContact.length !== 10 ||
      !Input.current.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)
    ) {
      setNameError("Fields are empty fill them correctly to proceed.");
      return true;
    } else {
      setNameError(null);
      return false;
    }
  };

  const onConfirmRegister = () => {
    var formData = new FormData();
    formData.append("file", excel);

    const requestOne = axios.post(apiOne, {
      orgName,
      orgEmail,
      orgContact,
      orgLocation,
      orgType,
    });
    const requestTwo = axios.post(apiTwo, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const requestThree = axios.post(apiThree, {});
    const requestFour = axios.post(apiFour, {orgEmail});

    axios
      .all([requestOne, requestTwo, requestThree, requestFour])
      .then(
        axios.spread(async (...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          const responseFour = responses[3];
          // const responesThree = responses[2];

          console.log("responseOne", responseOne);
          console.log("responseTwo", responseTwo);
          console.log("responseThree", responseThree);
          console.log("responseFour", responseFour);
          setRes(responseThree);
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <div className="register">
      <div className="container" id="container">
        {/* Signup */}

        <div className="form-container sign-up-container">
          <div className="form">
            <h1>Organisation Structure</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>

            <input
              type="text"
              placeholder="Organisation Type"
              value={orgType}
              onChange={(e) => setOrgType(e.target.value)}
            />
            <input
              id="file"
              type="file"
              placeholder="Upload Excel"
              ref={Input}
              onChange={(e) => clickExcelInput(e)}
            />
            {/* <input type="password" placeholder="Password" /> */}
            <span className="confirm_msg">
              Confirm your Registration to proceed.
            </span>

            {nameError ? (
              <p className="error_line">{nameError}</p>
            ) : (
              <Link to="/infopage">
                <button
                  className="confirm_register"
                  onClick={onConfirmRegister}
                  addedResponse={res}
                >
                  Confirm Register
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Sign In */}

        <div className="form-container sign-in-container">
          <div className="form">
            <h1>Register Organisation</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            {/* <span>or use your account</span> */}
            <input
              type="text"
              placeholder="Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={orgLocation}
              onChange={(e) => setOrgLocation(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={orgEmail}
              onChange={(e) => setOrgEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Contact Number"
              value={orgContact}
              onChange={(e) => setOrgContact(e.target.value)}
            />
            <a href="#">Just few more things we need!</a>
            <button
              className="nextSlide"
              onClick={() =>
                document
                  .getElementById("container")
                  .classList.add("right-panel-active")
              }
            >
              Next
            </button>
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>About Uploading Excel</h1>
              <p>
                The following format has to be strictly followed in order to
                upload all of your employees smoothly.
                <br /> 1.Email <br /> 2.Name <br /> 3.Designation
                <br /> 4.Department <br /> 6.Type <br /> 7.BasicSalary
              </p>

              {/* <button className="ghost" id="signIn">
                Sign In
              </button> */}
              <button
                className="prevSlideBtn"
                onClick={() =>
                  document
                    .getElementById("container")
                    .classList.remove("right-panel-active")
                }
              >
                Previous Slide
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>EmpUp</h1>
              <p>ADOBTABLE * ACCOUNTABLE * AFFORDABLE </p>
              <p>
                In these difficult times many businesses are struggling to keep
                their doors open and trying to find ways to keep their employees
                safe, comfortable and productive. Our team strives to facilitate
                organizations with a complete virtual human resource office.
                EmpUp fulfils their requirements in this pandemic.
                <br />
                EmpUp provides one stop solution to all the problems faced by
                the HR department.{" "}
              </p>
              {/* <button className="ghost" id="signUp">
                Sign Up
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterOrg;
