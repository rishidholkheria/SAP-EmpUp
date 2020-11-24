import React, { useState, useEffect } from "react";
import "./Feed.css";
import axios from "axios";
import Post from "./Post";
import Goal from "./Goal";
import NoticeBoard from "./NoticeBoard";
import AllInboxIcon from "@material-ui/icons/AllInbox";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [goal, setGoal] = useState("");

  useEffect(() => {
    const organisationId = localStorage.getItem("orgId");
    axios
      .get(`http://localhost:4000/api/announcement/${organisationId}`)
      .then((res) => {
        // console.log(res.data.data);
        setPosts(res.data.data);
      });
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h1>Home</h1>
      </div>

      <NoticeBoard />

      <div className="announcement">
        <div className="announce_icon">
          <AllInboxIcon />
        </div>
        <div className="announce_head">
          <h2>Announcements</h2>
        </div>
      </div>
      {[...posts]
        .reverse()
        .slice(0, 5)
        .map((post) => (
          <Post
            // displayName={post.aId}
            // displayName={"Amazon"}
            text={post.aText}
            date={post.aDate}
            // avatar={amazonLogo}
            // username={post.username}
            // verified={post.verified}
            // image={post.image}
          />
        ))}
    </div>
  );
};

export default Feed;
