import React, { useState } from "react";
import "./EmpLogin.css";
import { useHistory } from "react-router-dom";
import purplewave from "./img/purplewave.png";
import login from "./img/login.svg";
import profile from "./img/profile.svg";
import axios from "axios";

const EmpLogin = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const history = useHistory();

  const userLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/api/employee/login", {
        userName,
        userPassword,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("orgId", res.data.payload.orgId);
        localStorage.setItem("empId", res.data.payload.userid);
        localStorage.setItem("isAuth", res.data.payload.isAuthorized);
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
            <input type="submit" className="login" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpLogin;
