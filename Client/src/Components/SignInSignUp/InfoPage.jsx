import React from "react";
import { Link } from "react-router-dom";
import emailImage from "./img/emailImage.png";
import infoImage from "./img/infoImage.png";
import "./InfoPage.css";
// import Guide from "./img/Guide.svg";
// import GifLoading from "./img/GifLoading.gif";

const InfoPage = ({ addedResponse }) => {
  if (addedResponse === null) {
    return <div>{/* <img src={GifLoading} alt="" /> */}</div>;
  }
  return (
    <div className="register">
      <div className="container" id="container">
        {/* Working Info */}
        <div className="form-container sign-up-container">
          <div className="form">
            <h1>Working of EmpUp</h1>
            <p>
              There would be mainly 3 types of users of our platform:
              <br /> 1. Admin: <br />
              There would be an admin who would be having the access from
              anything to everything. Everything that can be done on the
              platform is accessible by the admin.
              <br /> 2. Human Resource Department: <br /> The HR would be having
              access to a lot of facilities such as posting the
              announcements/notices, getting all the feedbacks, uploading the
              resources to the virtual library, to name a few.
              <br /> 3. Employees: <br /> Every employee would be having the
              portal in which he can view the important notices, announcements,
              create their TODO, give 360 degree anonymous feedbacks to name a
              few. <br /> The employee will not have access to posting anything
              on the portal.
            </p>
            <h3>
              On clicking the proceed button you will be redirected to create an
              Admin of your organisation.
            </h3>
            <Link to="/adminlogin">
              <button className="confirm_register">Proceed</button>
            </Link>
          </div>
        </div>

        {/* EMPLOYEE EMAILED INFO */}

        <div className="form-container sign-in-container">
          <div className="form">
            <h1>Your Employees are successfully added to EmpUp!</h1>
            <h4>
              {" "}
              An email containing the credentials of the employees has been sent
              to you.
            </h4>
            Use the credentials to login to EmpUp!
            <br />
            Accountable, Adoptable, Affordable. EmpUp!
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
              {/* <h1>About Uploading Excel</h1>
              <p>
                The following format has to be strictly followed in order to
                upload all of your employees smoothly.
                <br /> 1.Email <br /> 2.Name <br /> 3.Designation
                <br /> 4.Department <br /> 6.Type <br /> 7.BasicSalary
              </p> */}
              <h3>
                EmpUp welcomes you to dive deep into the virtual working
                experience.<br/> In the time of social distancing we help you to come
                closer. With you, For your, Forever.{" "}
              </h3>
              <img src={infoImage} alt="" />
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
              <img className="emailImage" src={emailImage} alt="Background" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
