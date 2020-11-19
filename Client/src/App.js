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
import RegisterOrg from "./Components/SignInSignUp/RegisterOrg";
import AdminRegister from "./Components/SignInSignUp/AdminRegister";
import EmpLogin from "./Components/SignInSignUp/EmpLogin";
import HRofficeRight from "./Components/ChatPortal/HRofficeRight";

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
              <HRofficeRight />
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
          <Route path="/register">
            <div className="path_direction">
              <RegisterOrg />
            </div>
          </Route>
          <Route path="/admin">
            <div className="path_direction">
              <AdminRegister />
            </div>
          </Route>
          <Route path="/emplogin">
            <div className="path_direction">
              <EmpLogin />
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
