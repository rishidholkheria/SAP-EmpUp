import React from "react";
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

function Sidebar() {
  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />

      <a href="/">
        <SidebarOption active Icon={HomeIcon} text="Dashboard" />
      </a>

      <a href="/library">
        <SidebarOption Icon={SearchIcon} text="Library" />
      </a>

      <a href="/payroll">
        <SidebarOption Icon={SearchIcon} text="Payroll" />
      </a>

      <a href="/commonroom">
        <SidebarOption Icon={SearchIcon} text="Common Room" />
      </a>

      <a href="/hrd">
        <SidebarOption Icon={SearchIcon} text="HR Department" />
      </a>

      <a href="/feedback">
        <SidebarOption Icon={SearchIcon} text="Feedback" />
      </a>

      <a href="/profile">
        <SidebarOption Icon={SearchIcon} text="Profile" />
      </a>

      {/* Button -> Tweet */}
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        HR Office
      </Button>
    </div>
  );
}

export default Sidebar;
