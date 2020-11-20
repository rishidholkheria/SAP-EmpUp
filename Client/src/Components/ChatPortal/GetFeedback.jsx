import React from "react";
import "./GetFeedback.css";

const GetFeedback = ({ feedback_Title, feedback_desc }) => {
  return (
    <div className="feedback_card">
      <h1 className="feedback_title">{feedback_Title}</h1>
      <p className="feedback_desc">{feedback_desc}</p>
    </div>
  );
};

export default GetFeedback;
