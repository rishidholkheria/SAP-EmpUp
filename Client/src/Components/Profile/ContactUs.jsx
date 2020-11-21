import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact_us">
      <div className="contact_container">
        <div class="contact-info">
          <h2>OUR TEAM</h2>
          <p>
            We are Team of two young develepors dedicated towards learning.We
            mainly focus on Web and Android applications.Feel free to contact
            us.{" "}
          </p>
          <br />
          <h4>Samridhi , Rishi</h4>
          <br />
          <h3>(Twin Tech)</h3>
        </div>

        <div class="contact">
          <h1 class="contact_heading">Contact Us</h1>
          <form className="form">
            <input placeholder="Subject" />
            <input placeholder="Department" />
            <textarea placeholder="Message"></textarea>
            <button className="feedback_submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
