import React from "react";
import "./BookMgt.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { green } from "@material-ui/core/colors";

const BookMgt = () => {
  return (
    <div className="bookmgt_container">
      <div className="bookmgt">
        <div className="name">
          <h4>Harry Potter</h4>
        </div>
        <div className="dept_date">
          <h4>Department</h4>
          <p className="date">date</p>
        </div>
      </div>
      <div className="delete_book_icon">
        <DeleteIcon style={({ fontSize: 40 }, { color: green[50] })} />
      </div>
    </div>
  );
};

export default BookMgt;
