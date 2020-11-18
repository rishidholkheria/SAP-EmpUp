import React from "react";
import "./AdminRegister.css";
import purplewave from "./img/purplewave.png";
import bg from "./img/bg.svg";
import avatar from "./img/avatar.svg";

const AdminRegister = () => {
  // const inputs = document.getElementsByClassName(".input");

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

  // input.forEach((input) => {
  //   input.addEventListener("focus", addcl);
  //   input.addEventListener("blur", remcl);
  // });

  // inputs.addEventListener("focus", addcl);

  return (
    <div>
      <img class="wave" src={purplewave} alt="Wave" />
      <div className="admin_container">
        <div class="img">
          <img src={bg} alt="Background" />
        </div>
        <div class="login-content">
          <form action="index.html">
            <img src={avatar} alt="Avatar" />
            <h2 class="title">Welcome</h2>
            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div className="div">
                {/* <h5 className="input-placeholder">Username</h5> */}
                <input type="text" class="input" placeholder="Username" />
              </div>
            </div>
            <div class="input-div pass">
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                {/* <h5 className="input-placeholder">Password</h5> */}
                <input type="password" class="input" placeholder="Password" />
              </div>
            </div>
            <a href="#">Forgot Password?</a>
            <input type="submit" class="login" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
