import React, { useState, useEffect } from "react";
import "./Feed.css";
import axios from "axios";
import Post from "./Post";
import TweetBox from "./TweetBox";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      console.log(res);
      setPosts(res.data);
    });
  }, []);

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
          displayName={post.userId}
          // username={post.username}
          // verified={post.verified}
          text={post.title}
          // image={post.image}
          // avatar={post.avatar}
        />
      ))}
    </div>
  );
};

export default Feed;
