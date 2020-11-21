import React from "react";
import "./Notice.css";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import { red } from "@material-ui/core/colors";

const Notice = ({ myNotice }) => {
  // console.log(myNotice);
  return (
    <div className="notice">
      <div className="icon">
        <NotificationImportantIcon style={{ color: red[500] }} />
      </div>
      <p>{myNotice}</p>
    </div>
  );
};

export default Notice;
