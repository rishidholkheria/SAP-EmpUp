import React from "react";
import "./HRDept.css";
import TweetBox from "./TweetBox";
import BookMgt from "./BookMgt";
import PostAddIcon from "@material-ui/icons/PostAdd";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

const HRDept = () => {
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
