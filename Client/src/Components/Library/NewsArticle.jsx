import React from "react";
import "./NewsArticle.css";

const NewsArticle = () => {
  return (
    <div className="news">
      <h1 className="news__title">Title</h1>
      <p className="news__desc">Description</p>
      {/* <span className="news__author">Author</span> <br />
      <span className="news__published">published at</span> */}
      <span className="news__source">Source Name</span>
    </div>
  );
};

export default NewsArticle;
