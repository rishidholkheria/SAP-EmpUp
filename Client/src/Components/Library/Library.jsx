import React from "react";
import Book from "./Book";
import "./Library.css";

const Library = () => {
  return (
    <div className="library">
      <div className="library__header">
        <h1>Library</h1>
      </div>
      <Book />
      <Book />
    </div>
  );
};

export default Library;
