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
      <BottombarOptions />
    </div>
  );
};

export default Profile;
