import React from "react";
import "./RegisterOrg.css";

const RegisterOrg = () => {
  //   const signUpHandler = () => {
  //     container.classList.add("right-panel-active");
  //   };

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

            <input type="text" placeholder="Organisation Type" />
            <input type="text" placeholder="Upload Excel" />
            {/* <input type="password" placeholder="Password" /> */}
            <span className="confirm_msg">
              Confirm your Registration to proceed.
            </span>
            <button
              onClick={() =>
                document
                  .getElementById("container")
                  .classList.remove("right-panel-active")
              }
            >
              Confirm Register
            </button>
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
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Location" />
            <input type="email" placeholder="Email" />
            <input type="number" placeholder="Contact Number" />
            <a href="#">Just few more things we need!</a>
            <button
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
              <h1>How to Upload Excel?</h1>
              <p>We will tell you biro.</p>
              {/* <button className="ghost" id="signIn">
                Sign In
              </button> */}
            </div>
            <div className="overlay-panel overlay-right">
              <h1>EmpUp</h1>
              <p>ADOBTABLE * ACCOUNTABLE * AFFORDABLE </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                doloribus nesciunt sunt eligendi autem rem vel quidem quis,
                dolorem, voluptatibus, sed atque.{" "}
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
