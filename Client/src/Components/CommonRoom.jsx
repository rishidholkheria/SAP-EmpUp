import React from "react";
import "./CommonRoom.css";
import Game from "./Game";

const CommonRoom = () => {
  return (
    <div className="cr">
      <div className="cr__header">
        <h1>Common Room</h1>
      </div>
      <Game />
    </div>
  );
};

export default CommonRoom;
