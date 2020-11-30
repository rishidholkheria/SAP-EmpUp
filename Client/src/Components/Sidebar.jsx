import React, { useState, useEffect } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import amazonLogo from "./DashBoard/amazonLogo.jpg";
import EmpUpLogo from "./EmpUpLogo.png";
import boostLogo from "./boostLogo.png";

function Sidebar() {
  const [auth, setAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <div className="sidebar">
      {/* <TwitterIcon className="sidebar__twitterIcon" /> */}
      <div className="amazon_logo_container">
        <Avatar className="sidebar__twitterIcon" src={boostLogo} />
      </div>
      <Link to="/dashboard">
        <SidebarOption active Icon={HomeIcon} text="Dashboard" />
      </Link>
      <Link to="/library">
        <SidebarOption Icon={SearchIcon} text="Library" />
      </Link>
      {/* <Link to="/payroll">
        <SidebarOption Icon={SearchIcon} text="Payroll" />
      </Link> */}
      <Link to="/commonroom">
        <SidebarOption Icon={SearchIcon} text="Common Room" />
      </Link>
      <Link to="/hrd">
        <SidebarOption Icon={SearchIcon} text="HR Department" />
      </Link>
      <Link to="/feedback">
        <SidebarOption Icon={SearchIcon} text="Feedback" />
      </Link>
      <Link to="/profile">
        <SidebarOption Icon={SearchIcon} text="Profile" />
      </Link>

      {localStorage.getItem("isAuth") === "true" ? (
        <Link to="/hroffice">
          <Button variant="outlined" className="sidebar__tweet" fullWidth>
            HR Office
          </Button>
        </Link>
      ) : (
        <h1></h1>
      )}
      {/* {showHrOffice} */}
    </div>
  );
}

export default Sidebar;
