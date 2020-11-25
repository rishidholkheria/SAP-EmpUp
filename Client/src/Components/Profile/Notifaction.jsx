import React from "react";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import "./Notification.css";

const Notifaction = () => {
  return (
    <div className="notification_card">
      <div className="notification_icon">
        <NotificationsActiveIcon />
      </div>
      <p>Hey</p>
    </div>
  );
};

export default Notifaction;
