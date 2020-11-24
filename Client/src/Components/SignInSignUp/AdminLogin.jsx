import React, { useState } from "react";
import "./AdminLogin.css";
import { useHistory } from "react-router-dom";
import purplewave from "./img/purplewave.png";
import login from "./img/login.svg";
import profile from "./img/profile.svg";
import axios from "axios";

const AdminRegister = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const history = useHistory();

  const onAdminLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/api/admin/", {
        adminEmail,
        adminPassword,
      })
      .then((res) => {
        console.log(res.data);
        // console.log(res.data.payload);
        // localStorage.setItem("adminToken", res.data.accessToken);
        // localStorage.setItem("orgId", res.data.payload.orgId);
        // localStorage.setItem("isAuth", res.data.payload.isAuthorized);
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
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                {/* <h5 className="input-placeholder">Username</h5> */}
                <input
                  type="text"
                  className="input"
                  placeholder="Admin Email"
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
                {/* <h5 className="input-placeholder">Password</h5> */}
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
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
