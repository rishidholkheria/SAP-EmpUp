import React from "react";
import "./CommonRoom.css";
import Game from "./Game";

const CommonRoom = () => {
  return (
    <div className="cr">
      <div className="cr__header">
        <h1>Common Room</h1>
      </div>
      <Game
        gameName="Scribbl"
        imageUrl="https://cdn.titotu.io/images/games/skribbl-io-1280x720.jpg"
        gameType="Multiplayer"
      />
      <Game
        gameName="UNO"
        imageUrl="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Funo%2Fhome%2FGameName_Store_Landscape_2560x1440-2560x1440-5195e8a3e06d672f97a1ee49ecea59027c14cae4.jpg?h=1080&resize=1&w=1920"
        gameType="Multiplayer"
      />{" "}
      <Game
        gameName="Mega Pro Racer"
        gameType="Multiplayer"
        imageUrl="https://i.ytimg.com/vi/XpdlkjlT00o/maxresdefault.jpg"
      />{" "}
      <Game
        gameType="Singleplayer/Multiplayer"
        gameName="Miniclip Games"
        imageUrl="https://play-lh.googleusercontent.com/bHetiyxgX73PkPLZAhv6HZJmkj72ZxirY1z_EgTiQ7nA8Czle3nKXYTEZsUBH4SvynA=w412-h732-rw"
      />{" "}
      <Game
        gameName="Chess"
        gameType="Singleplayer/Multiplayer"
        imageUrl="https://images.outlookindia.com/public/uploads/articles/2020/6/30/Chess-Online-Twitter_571_855.jpg"
      />{" "}
      <Game
        gameName="AGAME Games"
        gameType="Singleplayer"
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRjXLW-Qik4hirJF9Cf4oeuGoXH-dTRCzsPQ&usqp=CAU"
      />
    </div>
  );
};

export default CommonRoom;
