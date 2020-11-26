import React from "react";
import "./BookMgt.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { green } from "@material-ui/core/colors";
import axios from "axios";
import { useState } from "react";
require('dotenv').config();

const BookMgt = ({ bookTitle, bookDept, date, bookId }) => {
  const [singleId, setSingleId] = useState("");
  const organisationId = localStorage.getItem("orgId");
  const deleteBook = () => {
    console.log(bookId);
    axios
      .delete(process.env.REACT_APP_SERVER + `/virtual-library/delete/${bookId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <div className="bookmgt_container">
      <div className="bookmgt">
        <div className="name">
          <h4>{bookTitle}</h4>
        </div>
        <div className="dept_date">
          <h4>{bookDept}</h4>
          <p className="date">{date}</p>
        </div>
      </div>
      <div
        className="delete_book_icon"
        onClick={deleteBook}
        onChange={(e) => setSingleId(e.target.bookId)}
      >
        <DeleteIcon style={({ fontSize: 40 }, { color: green[50] })} />
      </div>
    </div>
  );
};

export default BookMgt;
