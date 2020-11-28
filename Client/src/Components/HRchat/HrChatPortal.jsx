import React from "react";
import "./HrChatPortal.css";
import chatbg from "./chatbg.jpg";
import io from "socket.io-client";
import Message from "../CommonRoom/Message";
require("dotenv").config();

let socket;
const employeeName = localStorage.getItem("empName");

class HrChatPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatMessage: "",
      rName: "Room Name",
      eName: "",
    };
  }
  componentDidMount() {
    socket = io(process.env.REACT_APP_SOCKET);
    this.setState({ eName: employeeName });

    socket.on("message", (message) => {
      console.log(message);
      this.setState({ messages: [...this.state.messages, message] });

      console.log(this.state.messages);

      return () => {
        socket.close();
      };
    });
  }

  // Join chatroom
  joinRoomChat = () => {
    console.log(this.eName);
    console.log(this.rName);
    socket.emit("joinRoom", {
      eName: this.state.eName,
      rName: this.state.rName,
    });
    //setSocket(socket);

    this.setState({ messages: [] });
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

  changeA = () => {
    var room = "HR Dept A";
    this.setState({ rName: room });
    {
      this.joinRoomChat();
    }
  };
  changeB = () => {
    var room = "HR Dept B";
    this.setState({ rName: room });
    {
      this.joinRoomChat();
    }
  };
  changeC = () => {
    var room = "HR Dept C";
    this.setState({ rName: room });
    {
      this.joinRoomChat();
    }
  };

  render() {
    const { chatMessage, eName, rName, messages } = this.state;
    return (
      <div className="hrchat">
        <div className="hrchat_header">
          <h1>HR Department</h1>
        </div>
        <div className="hrchat_portal">
          <div className="hr_room">
            <div className="hr_contacts">
              <h2>Contacts</h2>
            </div>
            <div className="contacts" onClick={this.changeA}>
              <h3>HR Department A</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                quibusdam rem illum maxime itaque officia quaerat odio explicabo
                veritatis aspernatur?
              </p>
            </div>

            <div className="contacts" onClick={this.changeB}>
              <h3>HR Department B</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                quibusdam rem illum maxime itaque officia quaerat odio explicabo
                veritatis aspernatur?
              </p>
            </div>
            <div className="contacts" onClick={this.changeC}>
              <h3>HR Department C</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                quibusdam rem illum maxime itaque officia quaerat odio explicabo
                veritatis aspernatur?
              </p>
            </div>
          </div>
          <div className="hr_message">
            {/* <img className="chatbg" src={chatbg} alt="" /> */}
            <div className="hrmsg_header">
              <h2>{rName}</h2>
            </div>
            <div className="hrchat_container">
              {[...messages].map((msg) => (
                <Message
                  text={msg.text}
                  time={msg.time}
                  userName={msg.username}
                ></Message>
              ))}
            </div>
            <div className="chat-form-container">
              <form id="chat-form">
                <input
                  id="msg"
                  type="text"
                  placeholder="Enter Message"
                  value={chatMessage}
                  onChange={(e) =>
                    this.setState({ chatMessage: e.target.value })
                  }
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
      </div>
    );
  }
}

export default HrChatPortal;
