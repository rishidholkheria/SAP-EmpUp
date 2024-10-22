import React from "react";
import "./BottombarOptions.css";
import EditIcon from "@material-ui/icons/Edit";
import HelpIcon from "@material-ui/icons/Help";
import InfoIcon from "@material-ui/icons/Info";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";

const removeFromLS = () => {
  // localStorage.removeItem("isAuth");
  localStorage.clear();
};

const BottombarOptions = () => {
  return (
    <div>
      <div className="container">
        <div className="Edit">
          <EditIcon />
          {/* <h6>Edit Profile</h6> */}
        </div>
        <div className="Guide">
          <HelpIcon />
          {/* <h6>Guide</h6> */}
        </div>

        <div className="About">
          <Link to="/contactus">
            <InfoIcon />
          </Link>
        </div>

        <div className="Logout">
          <Link to="./emplogin" style={{ textDecoration: "none" }}>
            {removeFromLS}
            <ExitToAppIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottombarOptions;
