import React from "react";
import "./Game.css";
import { Link } from "react-router-dom";

const Game = ({ gameName, imageUrl, gameType, pageUrl }) => {
  return (
    <div className="game">
      <div className="game_container">
        <div className="image_side">
          <img src={imageUrl} alt="" />
        </div>
        <div className="game_details">
          <h2>{gameName}</h2>
          <h6 className="game_type">{gameType}</h6>
          <a href={pageUrl} target="_blank">
            {" "}
            <button
              className="Gbtn"
              // onClick={(e) => {
              //   e.preventDefault();
              //   window.location.href({ pageUrl });
              // }}
            >
              PLAY
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Game;
