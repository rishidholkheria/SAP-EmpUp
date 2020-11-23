import React from "react";
import "./Message.css";

const Message = ({ text, username, time }) => {
  return (
    <div className="chat-messages">
      <p>{text}</p>
      <p>{time}</p>
    </div>
  );
};

export default Message;
