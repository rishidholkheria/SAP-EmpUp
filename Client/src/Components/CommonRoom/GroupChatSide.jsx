import React from "react";
import "./GroupChatSide.css";
import io from "socket.io-client";
import { useState } from "react";
import Message from "./Message";
import { useEffect } from "react";
require("dotenv").config();

let socket;

class GroupChatSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatMessage: "",
      rName: "",
      eName: "",
    };
  }
  componentDidMount() {
    socket = io(process.env.REACT_APP_SOCKET);

    socket.on("message", (message) => {
      console.log(message);
      this.setState({ messages: [...this.state.messages, message] });
      // console.log(messages);
      // outputMessage(message);
      //setChatMessage(message);
      console.log(this.state.messages);

      return () => {
        socket.close();
      };
    });
  }

  // Join chatroom
  joinRoomChat = () => {
    socket.emit("joinRoom", {
      eName: this.state.eName,
      rName: this.state.rName,
    });
    //setSocket(socket);
  };

  sendChatMsg = (e) => {
    e.preventDefault();

    console.log(this.state.chatMessage);
    if (!this.state.chatMessage) {
      return false;
    }

    socket.emit("chatMessage", this.state.chatMessage);
    //setChatMessage("");
    this.setState({ chatMessage: "" });
  };

  render() {
    const { chatMessage, eName, rName, messages } = this.state;
    return (
      <div className="group_chat_container">
        <div className="join_side">
          <main className="join-main">
            <form action="form" className="join_chat_form">
              <div className="form-control">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter username..."
                  // required
                  value={eName}
                  onChange={(e) => this.setState({ eName: e.target.value })}
                />
              </div>
              <div className="form-control">
                <label htmlFor="room">Room</label>
                <select
                  name="room"
                  id="room"
                  className="room_select"
                  value={rName}
                  onChange={(e) => this.setState({ rName: e.target.value })}
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="PHP">PHP</option>
                  <option value="C#">C#</option>
                  <option value="Ruby">Ruby</option>
                  <option value="Java">Java</option>
                </select>
              </div>
            </form>
            <button
              type="submit"
              className="join_chat_btn"
              onClick={this.joinRoomChat}
            >
              Join Chat
            </button>
          </main>
        </div>

        <div className="chat-container">
          <header className="chat-header">
            <h2 id="room-name">{rName}</h2>
            <a href="index.html" className="leave_chat_btn">
              Leave Room
            </a>
          </header>
          <main className="chat-main">
            {[...messages].map((msg) => (
              <Message
                text={msg.text}
                time={msg.time}
                userName={msg.username}
              ></Message>
            ))}
          </main>
          <div className="chat-form-container">
            <form id="chat-form">
              <input
                id="msg"
                type="text"
                placeholder="Enter Message"
                value={chatMessage}
                onChange={(e) => this.setState({ chatMessage: e.target.value })}
                // required
                autocomplete="off"
              />
              <button className="send_chat_btn" onClick={this.sendChatMsg}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupChatSide;
