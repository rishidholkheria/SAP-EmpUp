import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Feed from "./Components/Feed";
import Sidebar from "./Components/Sidebar";
import Library from "./Components/Library";
import Payroll from "./Components/Payroll";
import Profile from "./Components/Profile";
import CommonRoom from "./Components/CommonRoom";
import HRDept from "./Components/HRDept";
import Feedback from "./Components/Feedback";
import HomeRight from "./Components/HomeRight";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/library">
            <div className="path_direction">
              <Sidebar />
              <Library />
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
