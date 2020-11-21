import React from "react";
import { useState, useEffect, useParams } from "react";
import "./Book.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Book = ({ bookTitle, bookDesc, bookDept, data }) => {
  const onRead = (e) => {
    const requestOne = axios.get(
      `http://localhost:4000/api/virtual-library-file/image-id/${data}`
    );
    requestOne.then((response) => {
      // console.log(response.data);
      // console.log(response.data.data);
      // console.log(response);
    });
  };

  return (
    <div className="book">
      <div className="book__container">
        <div className="department_side">
          {/* <h6>{bookDept}</h6> */}
          <h2> {bookDept} Department</h2>
        </div>

        <div className="bookinfo_side">
          {/* <h6>Best for Business in Tech</h6> */}
          <h3>{bookTitle}</h3>
          <p className="p-trunc">{bookDesc}</p>

          <a
            href={`http://localhost:4000/api/virtual-library-file/image-id/${data}`}
            target="_blank"
          >
            <button className="read_button" onClick={onRead}>
              Read
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Book;
