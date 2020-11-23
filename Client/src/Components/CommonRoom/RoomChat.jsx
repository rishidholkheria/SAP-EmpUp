import React from "react";
import Join from "./Join";
import Chat from "./Chat";

const ChatPortalSide = () => {
  return (
    <div className="room_chat">
      <Join />
      <Chat />
    </div>
  );
};

export default ChatPortalSide;
