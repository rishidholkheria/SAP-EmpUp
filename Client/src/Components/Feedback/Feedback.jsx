import React, { useState, useEffect } from "react";
import "./Feedback.css";
import axios from "axios";
require('dotenv').config();

const Feedback = () => {
  const [title, setTitle] = useState("");
  const [dept, setDept] = useState("");
  const [message, setMessage] = useState("");

  const SubmitHandler = (e) => {
    e.preventDefault();

    const fTitle = title;
    const fDept = dept;
    const feedback = message;
    const orgId = localStorage.getItem("orgId");
    axios
      .post(process.env.REACT_APP_SERVER + "/feedback", { fTitle, fDept, feedback, orgId})
      .then((res) => {
        console.log(res.data);
      })
      .then((res) => res.doesNotExist.throwAnError)
      .catch((err) => err);

    alert("Your feedback has been sent to HR Department!!!");
    setTitle("");
    setDept("");
    setMessage("");
  };

  return (
    <div className="feedback_form">
      <div className="feedback__header">
        <h1>Feedback</h1>
      </div>
      <div className="form_container">
        <form className="form" onSubmit={SubmitHandler}>
          <label>Subject</label>
          <input
            placeholder="Subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Department</label>
          <input
            placeholder="Department"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          />

          <label>Message</label>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button className="feedback_submit" type="submit">
            Submit
          </button>
          <h5>
            Note: Feedback provided will be anonymously submited to the HR
            Department
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
