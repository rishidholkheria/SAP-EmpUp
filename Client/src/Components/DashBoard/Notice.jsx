import React from "react";
import "./Notice.css";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import { red } from "@material-ui/core/colors";

const Notice = () => {
  return (
    <div className="notice">
      <div className="icon">
        <NotificationImportantIcon style={{ color: red[500] }} />
      </div>
      <p>Notices</p>
    </div>
  );
};

export default Notice;
