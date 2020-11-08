import React, { useState, useEffect } from "react";
import "./Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
import db from "./firebase";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  return (
    <div className="feed">
      {/* Header */}
      <div className="feed__header">
        <h1>Home</h1>
      </div>

      {/* Tweet Box */}
      <TweetBox />

      {/* Post */}

      {posts.map((post) => (
        <Post
          displayName={post.displayName}
          username={post.username}
          verified={post.verified}
          text={post.text}
          image={post.image}
          avatar={post.avatar}
        />
      ))}
    </div>
  );
};

export default Feed;
