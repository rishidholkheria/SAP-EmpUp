import React, { useState, useEffect } from "react";
import Book from "./Book";
import "./Library.css";
import axios from "axios";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/api/virtual-library").then((res) => {
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
