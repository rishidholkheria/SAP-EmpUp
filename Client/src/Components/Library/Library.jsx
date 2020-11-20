import React, { useState, useEffect } from "react";
import Book from "./Book";
import "./Library.css";
import axios from "axios";

const Library = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/virtual-library").then((res) => {
      console.log(res);
      setBooks(res.data.data);
    });
  }, []);

  return (
    <div className="library">
      <div className="library__header">
        <h1>Library</h1>
      </div>
      {[...books].map((newBook) => (
        <Book
          bookTitle={newBook.name}
          bookDesc={newBook.description}
          bookDept={newBook.department}
        />
      ))}
    </div>
  );
};

export default Library;
