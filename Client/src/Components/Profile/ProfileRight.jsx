import React from "react";
import "./ProfileRight.css";
import Notification from "./Notifaction";

const ProfileRight = () => {
  return (
    <div className="profile_right">
      <div className="notifications">
        <h2>News</h2>
      </div>
      <div className="notice_array">
        <Notification />
      </div>
    </div>
  );
};

export default ProfileRight;
