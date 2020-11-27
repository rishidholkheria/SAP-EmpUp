import React from "react";
import "./Message.css";

const Message = ({ text, userName, time }) => {
  return (
    <div className="message">
      <div className="name_text">
        <p className="chat_username">{userName}</p>
        <p className="chat_text">{text}</p>
      </div>
      <p className="chat_time">{time}</p>
    </div>
  );
};

export default Message;
