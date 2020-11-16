import React from "react";
import "./App.scss";
import LandingView from "./MainPage/domain/landing/LandingView";
import Planer from "./Planer/Planer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <LandingView />
          </Route>
          <Route path="/planer/:id?">
            <div id="Planer">
              <Planer />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
