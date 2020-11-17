import React from "react";
import "./NoticeBoard.css";
import Notice from "./Notice";

const NoticeBoard = () => {
  return (
    <div className="notice_board">
      <h3>NoticeBoard</h3>
      <Notice />
      <Notice />
      <Notice />
    </div>
  );
};

export default NoticeBoard;
