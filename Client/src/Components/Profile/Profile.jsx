import React from "react";
import BottombarOptions from "./BottombarOptions";
import "./Profile.css";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__header">
        <h1>Profile</h1>
      </div>
      <ProfileCard />

      <div className="bottombar">
        <BottombarOptions />
      </div>
    </div>
  );
};

export default Profile;
