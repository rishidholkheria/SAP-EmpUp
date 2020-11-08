import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/library"></Route>
          <Route path="/payroll"></Route>
          <Route path="/commonroom"></Route>
          <Route path="/hrd"></Route>
          <Route path="/">
            <Sidebar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
