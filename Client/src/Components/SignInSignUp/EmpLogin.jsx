import React from "react";
import "./EmpLogin.css";
import purplewave from "./img/purplewave.png";
import login from "./img/login.svg";
import profile from "./img/profile.svg";

const EmpLogin = () => {
  return (
    <div>
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
                <input type="text" className="input" placeholder="Username" />
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
                  placeholder="Password"
                />
              </div>
            </div>
            <a href="#">Forgot Password?</a>
            <input type="submit" className="login" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpLogin;
