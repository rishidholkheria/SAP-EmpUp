import React from "react";
import "./Game.css";

const Game = ({ gameName, imageUrl, gameType }) => {
  return (
    <div className="game">
      <div className="game_container">
        <div className="image_side">
          <img src={imageUrl} alt="" />
        </div>
        <div className="game_details">
          <h2>{gameName}</h2>
          <h6 className="game_type">{gameType}</h6>
          <button className="btn">PLAY</button>
        </div>
      </div>
    </div>
  );
};

export default Game;
