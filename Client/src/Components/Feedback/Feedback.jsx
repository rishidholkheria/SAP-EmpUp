import React, { useState } from "react";
import "./Feedback.css";

const Feedback = () => {
  const [title, setTitle] = useState("");
  const [dept, setDept] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    setTitle("");
    setDept("");
    setMessage("");
  };

  return (
    <div>
      <div className="feedback__header">
        <h1>Feedback</h1>
      </div>
      <div className="form_container">
        <form className="form" onSubmit={handleSubmit}>
          <label>Subject</label>
          <input
            placeholder="Subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Email</label>
          <input
            placeholder="Email"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          />

          <label>Message</label>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
