import React from "react";
import "./GroupChatSide.css";
import io from "socket.io-client";
import { useState } from "react";
import Message from "./Message"
import { useEffect } from "react";
require('dotenv').config();

let socket;
// const CommonRoomRight = () => {
//   // const chatForm = document.getElementById("chat-form");
//   const [messages, setMessages] = useState(["me"]);
//   const [chatMessage, setChatMessage] = useState("");
//   const [rName, setRoomName] = useState("");
//   const [eName, setEname] = useState("");
//   const [socketState, setSocket] = useState("");
//   const [temp, setTemp] = useState([]);

  class GroupChatSide extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        messages: [],
        chatMessage: "", 
        rName: "",
        eName: ""
      }
  
  }
  componentDidMount(){
    socket = io(process.env.REACT_APP_SOCKET);

    socket.on("message", (message) => {
        console.log(message);
        this.setState({messages: [...this.state.messages, message]})
        // console.log(messages);
      // outputMessage(message);
      //setChatMessage(message);
        console.log(this.state.messages);

       
        return () => {
          socket.close();
        };
  })

  }

  // useEffect(() => {
  //   socket = io("http://localhost:4000");

  //   socket.on("message", (message) => {
  //       console.log(message);
  //       console.log(messages);
  //     // outputMessage(message);
  //     //setChatMessage(message);
  //       setMessages([...messages, message]);

  //       console.log(messages);

       
  //       return () => {
  //         socket.close();
  //       };

  //     // setTemp(message);
  //     // Scroll down
  //     // chatMessages.scrollTop = chatMessages.scrollHeight;
  //   });
  // }, []);

  // useEffect(()=>{
   
  // },[])

  // Join chatroom
  joinRoomChat = () => {
    socket.emit("joinRoom", { eName: this.state.eName, rName: this.state.rName });
    //setSocket(socket);
  };

  // // Get room and users
  // socket.on("roomUsers", ({ room, users }) => {
  //   // outputRoomName(room);
  //   // outputUsers(users);
  // });

  // Message from server

   sendChatMsg = (e) => {
    e.preventDefault();

    //console.log(chatMessage);
    if (!this.state.chatMessage) {
      return false;
    }   

    socket.emit("chatMessage", this.state.chatMessage);
    //setChatMessage("");
    this.setState({chatMessage: ""})
  };

  // Output message to DOM
  // function outputMessage(message) {
  //   setChatMessage(message);
  // }

  // Add room name to DOM
  // function outputRoomName(room) {
  //   roomName.innerText = room;
  //   setRoomName(room);
  // }

  // Add users to DOM
  // function outputUsers(users) {
  //   userList.innerHTML = "";
  //   users.forEach((user) => {
  //     const li = document.createElement("li");
  //     li.innerText = user.username;
  //     userList.appendChild(li);
  //   });
  // }

 render(){
  const {chatMessage, eName, rName, messages} = this.state
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
                onChange={(e) => this.setState({eName: e.target.value})}
              />
            </div>
            <div className="form-control">
              <label htmlFor="room">Room</label>
              <select
                name="room"
                id="room"
                className="room_select"
                value={rName}
                onChange={(e) => this.setState({rName: e.target.value})}
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
              username={msg.username}
            ></Message>
            // <h1>
            //   {msg.text} {msg.time}
            // </h1>
          ))}
        </main>
        <div className="chat-form-container">
          <form id="chat-form">
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              value={chatMessage}
              onChange={(e) => this.setState({chatMessage: e.target.value})}
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
};

export default GroupChatSide;
