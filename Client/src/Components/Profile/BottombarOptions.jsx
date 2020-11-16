import React from "react";
import "./BottombarOptions.css";
import EditIcon from "@material-ui/icons/Edit";
import HelpIcon from "@material-ui/icons/Help";
import InfoIcon from "@material-ui/icons/Info";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
          <InfoIcon />
          {/* <h6>About Us</h6> */}
        </div>
        <div className="Logout">
          <ExitToAppIcon />
          {/* <h6>Logout</h6> */}
        </div>
      </div>
    </div>
  );
};

export default BottombarOptions;
