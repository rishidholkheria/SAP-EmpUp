import React, { useState, useRef, useEffect } from "react";
import "./AdminLogin.css";
import { useHistory } from "react-router-dom";
import purplewave from "./img/purplewave.png";
import login from "./img/login.svg";
import profile from "./img/profile.svg";
import axios from "axios";
require('dotenv').config();

const AdminRegister = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [disable, setDisabled] = useState(true);
  const [nameError, setNameError] = useState(null);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setDisabled(validateInfo());
  }, [adminEmail, adminPassword]);

  const validateInfo = () => {
    if (!/\S+@\S+\.\S+/.test(adminEmail) || adminPassword < 6) {
      setNameError("Fields are empty fill them correctly to proceed.");
      return true;
    } else {
      setNameError(null);
      return false;
    }
  };

  const history = useHistory();

  const onAdminLogin = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_SERVER + "/admin/", {
        adminEmail,
        adminPassword,
      })
      .then((res) => {
        // console.log(res.data);
        history.push("/");
      })
      .catch((err) => {
        alert("WRONG ADMIN USERNAME PASSWORD!!!");
      });
  };

  return (
    <div className="admin_card">
      <img className="wave" src={purplewave} alt="Wave" />
      <div className="admin_container">
        <div className="img">
          <img src={login} alt="Background" />
        </div>
        <div className="login-content">
          <form action="index.html" onSubmit={onAdminLogin}>
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
                <input
                  type="text"
                  className="input"
                  placeholder="Admin Email"
                  name="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  name="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
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
