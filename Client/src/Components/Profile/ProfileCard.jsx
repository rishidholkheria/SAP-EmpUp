import React from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  const employeeName = localStorage.getItem("empName");

  return (
    <div className="profile_card">
      <div className="card_container">
        <div className="card">
          <div className="main">
            <div className="card_header">
              <div>
                <div className="image"></div>
                <h3 className="name">
                  {!employeeName ? "UserName" : employeeName}
                </h3>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="about">
              <h3 className="about_title">About</h3>
              <p className="about_text">
                I have been working with web development since 2010, the period
                during which I have worked in different environments. I am a
                self-motivated and self-taught professional who likes to solve
                problems. I merge a passion for usability and user experience
                with technical knowledge to create cool digital experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
