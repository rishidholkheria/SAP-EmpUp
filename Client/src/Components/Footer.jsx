import React from "react";
import "./Footer.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Link } from "@material-ui/core";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_container">
        <h1>TWIN TECH</h1>
      </div>
      <div className="insta_git_icons">
        <div className="git">
          <a
            href="https://github.com/rishidholkheria/SAP-EmpUp"
            target="_blank"
          >
            <GitHubIcon />
          </a>
        </div>
        <div className="insta">
          <a href="https://www.instagram.com/teamcipherror/" target="_blank">
            <InstagramIcon />
          </a>
        </div>
      </div>
      <div className="tt_email">
        <p>teamempup@gmail.com</p>
      </div>
    </div>
  );
};

export default Footer;
