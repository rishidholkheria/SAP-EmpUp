import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Feed from "./Components/DashBoard/Feed";
import Sidebar from "./Components/Sidebar";
import Library from "./Components/Library/Library";
import Profile from "./Components/Profile/Profile";
import CommonRoom from "./Components/CommonRoom/CommonRoom";
import HRDept from "./Components/ChatPortal/HRDept";
import Feedback from "./Components/Feedback/Feedback";
import HomeRight from "./Components/DashBoard/HomeRight";
import LibraryRight from "./Components/Library/LibraryRight";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/library">
            <div className="path_direction">
              <Sidebar />
              <Library />
              <LibraryRight />
            </div>
          </Route>
          {/* <Route path="/payroll">
            <div className="path_direction">
              <Sidebar />
              <Payroll />
            </div>
          </Route> */}
          <Route path="/commonroom">
            <div className="path_direction">
              <Sidebar />
              <CommonRoom />
            </div>
          </Route>
          <Route path="/hrd">
            <div className="path_direction">
              <Sidebar />
              <HRDept />
            </div>
          </Route>
          <Route path="/feedback">
            <div className="path_direction">
              <Sidebar />
              <Feedback />
            </div>
          </Route>
          <Route path="/profile">
            <div className="path_direction">
              <Sidebar />
              <Profile />
            </div>
          </Route>
          <Route path="/">
            <div className="path_direction">
              <Sidebar />
              <Feed />
              <HomeRight />
            </div>
          </Route>
          {/* <Route path="https://medium.com/javascript-in-plain-english/material-ui-icons-and-lists-a98c8ccbdac0" /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
