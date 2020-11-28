import { Avatar, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./TweetBox.css";
import axios from "axios";
require("dotenv").config();

const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [organisationId, setOrg] = useState(null);

  useEffect(() => {
    const oId = localStorage.getItem("orgId");
    setOrg(oId);
    console.log(organisationId);
  }, []);

  const sendTweet = (e) => {
    e.preventDefault();

    console.log(organisationId);
    const newPost = {
      aText: { tweetMessage },
      aImage: { tweetImage },
      orgId: { organisationId },
    };
    console.log(newPost);
    axios
      .post(process.env.REACT_APP_SERVER + "/announcement", { newPost })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .then((res) => res.doesNotExist.throwAnError)
      .catch((err) => err);

    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" />
          <input
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
            placeholder="Whats happening?"
            type="text"
          />
        </div>
        <input
          className="tweetBox__imageInput"
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          placeholder="Optional: Enter image URL"
          type="text"
        />

        {/* <Button
          type="submit"
          onClick={sendTweet}
          className="tweetBox__tweetButton"
        >
          Post
        </Button> */}
        <button
          type="submit"
          onClick={sendTweet}
          className="tweetBox__tweetButton"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default TweetBox;
