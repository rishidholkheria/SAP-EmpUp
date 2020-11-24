import React from "react";
import { Link } from "react-router-dom";
import Email from "./img/Email.svg";
import Guide from "./img/Guide.svg";
import GifLoading from "./img/GifLoading.gif";

const InfoPage = ({ addedResponse }) => {
  if (addedResponse === null) {
    return (
      <div>
        <img src={GifLoading} alt="" />
      </div>
    );
  }
  return (
    <div className="register">
      <div className="container" id="container">
        {/* Working Info */}

        <div className="form-container sign-up-container">
          <div className="form">
            <h1>Working of EmpUp!</h1>
            <button className="confirm_register">Proceed</button>
          </div>
        </div>

        {/* EMPLOYEE EMAILED INFO */}

        <div className="form-container sign-in-container">
          <div className="form">
            <h1>Your Employees are Added!</h1>

            {/* <span>or use your account</span> */}

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
              {/* <h1>EmpUp</h1>
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
              </p> */}
              <img src={Email} alt="Background" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
