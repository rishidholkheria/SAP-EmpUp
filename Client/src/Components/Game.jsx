import React from "react";
import "./Game.css";

const Game = () => {
  return (
    <div className="game">
      <div className="game_container">
        <div className="image_side">
          <img
            src="https://cdn.vox-cdn.com/thumbor/7lIbnnfhgZ16IYYPHi96mdKw6pY=/0x17:600x317/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/21905758/releaseWeek_promos3.jpg"
            alt=""
          />
        </div>
        <div className="game_details">
          <h2>Details Side</h2>
        </div>
      </div>
    </div>
  );
};

export default Game;
