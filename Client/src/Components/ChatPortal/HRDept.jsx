import React, { useRef } from "react";
import "./HRDept.css";
import TweetBox from "./TweetBox";
import BookMgt from "./BookMgt";
import PostAddIcon from "@material-ui/icons/PostAdd";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

const HRDept = () => {
  // const realFileBtn = document.getElementById("real-file");
  // const customBtn = document.getElementById("custom-button");
  // const customTxt = document.getElementById("custom-text");

  const Input = useRef(null);
  const file_name = useRef(null);

  const clickButton = () => {
    Input.current.click();
  };

  const clickFile = () => {
    if (Input.current.value) {
      file_name.current.innerHTML = Input.current.value.match(
        /[\/\\]([\w\d\s\.\-\(\)]+)$/
      )[1];
    } else {
      file_name.current.innerHTML = "No file chosen, yet.";
    }
  };

  return (
    <div className="chat_portal">
      <div className="hrd__header">
        <h1>HR Department</h1>
      </div>
      <div className="update_portal">
        <div className="update_portal_header">
          <div className="update_icon">
            <PostAddIcon />
          </div>
          <h2 className="update_portal_heading">Update Portal</h2>
        </div>
        <div className="update_portal_card">
          <div className="single_card">
            <h4>Add Announcement</h4>
            <div className="tweet_box">
              <TweetBox />
            </div>
          </div>

          <div className="single_card">
            <h4>Add Announcement</h4>
            <div className="tweet_box">
              <TweetBox />
            </div>
          </div>

          <div className="single_card">
            <h4>Add Announcement</h4>
            <div className="tweet_box">
              <TweetBox />
            </div>
          </div>
        </div>
      </div>
      <div className="library_management">
        <div className="library_header">
          <div className="library_icon">
            <LibraryAddIcon />
          </div>
          <h2 className="library_heading">Library Management</h2>
        </div>

        <div className="add_book">
          <h4>Add Book</h4>

          <div className="input_add_book">
            <input type="text" placeholder="Book Name" />
            <input type="text" placeholder="Department" />
          </div>

          <div className="get_book_file">
            <input
              className="book_file"
              type="file"
              placeholder="Book Name"
              id="real-file"
              hidden="hidden"
              onChange={clickFile}
              ref={Input}
            />

            <button
              className="book_file_btn"
              type="button"
              id="custom-button"
              onClick={clickButton}
            >
              Choose
            </button>
            <span className="file_text" id="custom-text" ref={file_name}>
              No file
            </span>
          </div>
        </div>
        <BookMgt />
        <BookMgt />
        <BookMgt />
        <BookMgt />
        <BookMgt />
      </div>
    </div>
  );
};

export default HRDept;
