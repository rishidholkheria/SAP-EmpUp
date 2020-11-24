import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import React from "react";
import amazonLogo from "./amazonLogo.jpg";
import "./Post.css";

const Post = ({ text, date }) => {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={amazonLogo} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h2>Amazon</h2>
          </div>
          <p className="a_Date">{date}</p>
          <div className="post__headerDescription">
            <p>{text} </p>
          </div>
        </div>
        {/* <img src={image} alt="" /> */}
        {/* <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
          <PublishIcon fontSize="small" />
        </div> */}
      </div>
    </div>
  );
};

export default Post;
