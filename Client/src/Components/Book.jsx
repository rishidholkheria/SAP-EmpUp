import React from "react";
import "./Book.css";

const Book = () => {
  return (
    <div className="book">
      <div className="book__container">
        <div className="department_side">
          {/* <h6>Department</h6> */}
          <h2>Web and Mobile Development </h2>
        </div>

        <div className="bookinfo_side">
          <h6>Best for Business in Tech</h6>
          <h3>JavaScript, HTML, CSS, JAVA, XML</h3>
          <p className="p-trunc">
            sadjbajsndlasndnask,dnaskndsnxzn nm kjsahdn,jasbdkjasdbjsabdjsd
          </p>

          <button className="btn">Read</button>
        </div>
      </div>
    </div>
  );
};

export default Book;
