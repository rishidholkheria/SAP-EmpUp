import React from "react";
import { useState, useEffect, useParams } from "react";
import "./Book.css";
import axios from "axios";

const Book = ({ bookTitle, bookDesc, bookDept }) => {
  const [id, setId] = useState("");
  // let one = "http://localhost:4000/api/virtual-library";
  // let two = "http://localhost:4000/api/virtual-library-file/";

  // const readBook = (e) => {
  //   e.preventDefault();
  // };
  const onRead = (e) => {
    const requestOne = axios.get(
      "http://localhost:4000/api/virtual-library/id"
    );
    requestOne.then((response) => {
      // console.log(response.data);
      // console.log(response.data.data);
      setId(response.data.data.libId);
      console.log(response.data.data.libId);
    });

    // const filename = id;

    const requestTwo = axios.get(
      `http://localhost:4000/api/employee-file-image/files/${id}`
    );

    requestTwo.then((response) => {
      console.log(response.data);
    });

    // e.preventDefault();
    // axios
    //   .get("http://localhost:4000/api/employee-file-image/files/filename")
    //   .then((res) => {
    //     console.log(res);
    //   });
  };

  // const { filename } = useParams();
  // console.log(filename);

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

          <button className="read_button" onClick={onRead}>
            Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
