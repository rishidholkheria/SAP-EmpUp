import React from "react";
import Book from "./Book";
import "./Library.css";
import TweetBox from "./TweetBox";

const Library = () => {
  return (
    <div className="library">
      <div className="library__header">
        <h1>Library</h1>
        <Book />
      </div>
    </div>
  );
};

export default Library;
