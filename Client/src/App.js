import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Feed from "./Components/DashBoard/Feed";
import Sidebar from "./Components/Sidebar";
import Library from "./Components/Library/Library";
import Profile from "./Components/Profile/Profile";
import CommonRoom from "./Components/CommonRoom/CommonRoom";
import HRDept from "./Components/HrOffice/HRDept";
import Feedback from "./Components/Feedback/Feedback";
import HomeRight from "./Components/DashBoard/HomeRight";
import LibraryRight from "./Components/Library/LibraryRight";
import RegisterOrg from "./Components/SignInSignUp/RegisterOrg";
import AdminLogin from "./Components/SignInSignUp/AdminLogin";
import EmpLogin from "./Components/SignInSignUp/EmpLogin";
import HRofficeRight from "./Components/HrOffice/HRofficeRight";
import ContactUs from "./Components/Profile/ContactUs";
import InfoPage from "./Components/SignInSignUp/InfoPage";
import ErrorPage from "./Components/ErrorPage";
import ProfileRight from "./Components/Profile/ProfileRight";
import Payroll from "./Components/Payroll";
import GroupChatSide from "./Components/CommonRoom/GroupChatSide";
import PayrollDetails from "./Components/PayrollDetails";
import HrChatPortal from "./Components/HRchat/HrChatPortal";
import HeroSectionLeft from "./Components/HeroSectionLeft";
import HeroSectionRight from "./Components/HeroSectionRight";
import MiddleSection from "./Components/MiddleSection";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route path="/library/"></Route> */}
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
              <GroupChatSide />
            </div>
          </Route>
          <Route path="/hrd">
            <div className="path_direction">
              <Sidebar />
              <HrChatPortal />
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
              <ProfileRight />
            </div>
          </Route>
          <Route path="/hroffice">
            <div className="path_direction">
              <Sidebar />
              <HRDept />
              <HRofficeRight />
            </div>
          </Route>
          <Route path="/payroll">
            <div className="path_direction">
              <Payroll />
            </div>
          </Route>
          <Route path="/register">
            <div className="path_direction">
              <RegisterOrg />
            </div>
          </Route>
          <Route path="/infopage">
            <div className="path_direction">
              <InfoPage />
            </div>
          </Route>
          <Route path="/adminlogin">
            <div className="path_direction">
              <AdminLogin />
            </div>
          </Route>
          <Route path="/emplogin">
            <div className="path_direction">
              <EmpLogin />
            </div>
          </Route>
          <Route path="/contactus">
            <div className="path_direction">
              <ContactUs />
            </div>
          </Route>
          <Route path="/payrolldetails">
            <div className="path_direction">
              <PayrollDetails />
            </div>
          </Route>
          <Route path="/welcome">
            <div>
              {/* <Header /> */}
              <Navbar />
              <HeroSectionLeft />
              <MiddleSection />
              <HeroSectionRight />
            </div>
          </Route>
          <Route path="/error">
            <div className="path_direction">
              <ErrorPage />
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
