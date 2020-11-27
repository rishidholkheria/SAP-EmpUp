import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Message = ({ text, userName, time }) => {
  return (
    <div className="message">
      <p>{userName}</p>
      <p>{text}</p>
      <p>{time}</p>
    </div>
  );
};

export default Message;
