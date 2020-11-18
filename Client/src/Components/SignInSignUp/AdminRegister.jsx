import React from "react";
import "./AdminRegister.css";

const AdminRegister = () => {
  return (
    <div>
      <div className="container">
        <div class="img" />
        <img src="img/bg.svg" />
        <div class="login-content">
          <form action="index.html">
            <img src="./img/avatar.svg" />
            <h2 class="title">Welcome</h2>
            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Username</h5>
                <input type="text" class="input" />
              </div>
            </div>
            <div class="input-div pass">
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>Password</h5>
                <input type="password" class="input" />
              </div>
            </div>
            <a href="#">Forgot Password?</a>
            <input type="submit" class="btn" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
