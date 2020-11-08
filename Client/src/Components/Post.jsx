import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import React from "react";
import "./Post.css";

const Post = ({ displayName, text }) => {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {displayName}{" "}
              {/* <span>
                {verified && <VerifiedUserIcon className="post__badge" />}
                {"  "}@{username}
              </span> */}
            </h3>
          </div>
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
