import React, { useState, useEffect } from "react";
import Book from "./Book";
import "./Library.css";
import axios from "axios";
require('dotenv').config();

const Library = () => {
  const [books, setBooks] = useState([]);
  const [data, setData] = useState("");

  const organisationId = localStorage.getItem("orgId");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + `/virtual-library/${organisationId}`)
      .then((res) => {
        console.log(res);
        setBooks(res.data.data);
        setData(res.data.data);
        console.log(data);
      });
  }, []);

  return (
    <div className="library">
      <div className="library__header">
        <h1>Library</h1>
      </div>
      {[...books].reverse().map((newBook) => (
        <Book
          bookTitle={newBook.name}
          bookDesc={newBook.description}
          bookDept={newBook.department}
          data={newBook.file}
        />
      ))}
    </div>
  );
};

export default Library;
