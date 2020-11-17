import React from "react";
import "./NewsArticle.css";

const NewsArticle = ({ title, description, source }) => {
  return (
    <div className="news">
      <h1 className="news__title">{title}</h1>
      <p className="news__desc">{description}</p>
      {/* <span className="news__author">Author</span> <br />
      <span className="news__published">published at</span> */}
      <span className="news__source">{source}</span>
    </div>
  );
};

export default NewsArticle;
