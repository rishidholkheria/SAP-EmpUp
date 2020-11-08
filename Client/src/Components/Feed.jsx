import React, { useState, useEffect } from "react";
import "./Feed.css";
import axios from "axios";
import Post from "./Post";
import TweetBox from "./TweetBox";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/announcement").then((res) => {
      // console.log(res);
      setPosts(res.data.data);
    });
  }, []);

  const reverse = () => {
    const rev_posts = posts;
    return rev_posts.reverse();
  };

  return (
    <div className="feed">
      {/* Header */}
      <div className="feed__header">
        <h1>Home</h1>
      </div>
      {/* Tweet Box */}
      <TweetBox />
      {/* Post */}
      {[...posts]
        .reverse()
        .slice(0, 5)
        .map((post) => (
          <Post
            displayName={post.aId}
            // username={post.username}
            // verified={post.verified}
            text={post.aText}
            // image={post.image}
            // avatar={post.avatar}
          />
        ))}
    </div>
  );
};

export default Feed;
