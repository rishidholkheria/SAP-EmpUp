import React, { useState, useEffect } from "react";
import "./Feed.css";
import axios from "axios";
import Post from "../Post";
import TweetBox from "../TweetBox";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [goal, setGoal] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:4000/api/announcement").then((res) => {
  //     // console.log(res);
  //     setPosts(res.data.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   axios.get("http://localhost:4000/api/organisation").then((res) => {
  //     console.log(res.data.data);
  //     console.log(res.data.data[0].monthlyGoal);
  //     setGoal(res.data.data[0]);
  //   });
  // }, []);

  return (
    <div className="feed">
      {/* Header */}
      <div className="feed__header">
        <h1>Home</h1>
      </div>

      {/* {[...goal].map((newGoal) => (
        <Goal goal={monthlyGoal}></Goal>
      ))} */}

      {/* Tweet Box */}
      <TweetBox />

      {/* Post */}
      <h2>Announcements</h2>
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
