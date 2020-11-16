import React from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  return (
    <div className="profile_card">
      <div className="card_container">
        <div className="card">
          <div className="main">
            <div className="card_header">
              <div className="image"></div>
              <h3 className="name">John Cena</h3>
            </div>
          </div>
          <div className="content">
            <div className="about">
              <h3 className="about_title">About</h3>
              <p className="about_text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repudiandae architecto veniam accusamus aut optio! Nisi quasi
                ea, dolorum aperiam maxime, repellat voluptate deleniti earum
                reprehenderit, quas fuga nostrum explicabo architecto!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
