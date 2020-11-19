import React from "react";
import "./AdminRegister.css";
import purplewave from "./img/purplewave.png";
import login from "./img/login.svg";
import profile from "./img/profile.svg";

const AdminRegister = () => {
  // const inputs = document.querySelectorAll(".input");

  // function addcl() {
  //   let parent = this.parentNode.parentNode;
  //   parent.classList.add("focus");
  // }

  // function remcl() {
  //   let parent = this.parentNode.parentNode;
  //   if (this.value == "") {
  //     parent.classList.remove("focus");
  //   }
  // }

  // inputs.forEach((input) => {
  //   input.addEventListener("focus", addcl);
  //   input.addEventListener("blur", remcl);
  // });

  return (
    <div className="admin_card">
      <img className="wave" src={purplewave} alt="Wave" />
      <div className="admin_container">
        <div className="img">
          <img src={login} alt="Background" />
        </div>
        <div className="login-content">
          <form action="index.html">
            <img src={profile} alt="Avatar" />
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                {/* <h5 className="input-placeholder">Username</h5> */}
                <input type="text" className="input" placeholder="Admin Name" />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                {/* <h5 className="input-placeholder">Password</h5> */}
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                />
              </div>
            </div>
            {/* <a href="#">Forgot Password?</a> */}
            <input type="submit" className="login" value="Register" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
