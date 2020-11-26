import React, { useState, useRef } from "react";
import "./EmpLogin.css";
import { useHistory } from "react-router-dom";
import purplewave from "./img/purplewave.png";
import login from "./img/login.svg";
import profile from "./img/profile.svg";
import axios from "axios";
import { useEffect } from "react";
require('dotenv').config();

const EmpLogin = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [disable, setDisabled] = useState(true);
  const [nameError, setNameError] = useState(null);
  const history = useHistory();

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setDisabled(formValidation());
  }, [userName, userPassword]);

  const formValidation = () => {
    if (!/\S+@\S+\.\S+/.test(userName) || userPassword < 6) {
      setNameError("Fields are empty fill them correctly to proceed.");
      return true;
    } else {
      setNameError(null);
      return false;
    }
  };

  const userLogin = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SERVER + "/employee/login", {
        userName,
        userPassword,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("orgId", res.data.payload.orgId);
        localStorage.setItem("empId", res.data.payload.userid);
        localStorage.setItem("isAuth", res.data.payload.isAuthorized);
        localStorage.setItem("empName", res.data.payload.name);
        history.push("/");
      })
      .catch((err) => {
        // err;
        alert("WRONG USERNAME PASSWORD");
      });
  };

  return (
    <div>
      <img className="wave" src={purplewave} alt="Wave" />
      <div className="admin_container">
        <div className="img">
          <img src={login} alt="Background" />
        </div>
        <div className="login-content">
          <form action="index.html" onSubmit={userLogin}>
            <img src={profile} alt="Avatar" />
            <h2 className="title">Welcome</h2>
            <div className="emp_error">
              {nameError ? (
                <p className="error_line">{nameError}</p>
              ) : (
                <p>EmpUp always there to help you!</p>
              )}
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                {/* <h5 className="input-placeholder">Username</h5> */}
                <input
                  type="text"
                  className="input"
                  placeholder="Username"
                  autoFocus
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
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
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>
            </div>
            <a href="#">Forgot Password?</a>
            <button
              type="submit"
              className="emp_login_btn"
              value="Login"
              disabled={disable}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpLogin;
