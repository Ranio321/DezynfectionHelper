import React from "react";
import "./App.scss";
import LandingView from "./MainPage/domain/landing/LandingView";
import Planer from "./Planer/Planer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProvideAuth } from "./Users/ProvideAuthorization";
import { RestircedArea } from "./common/RestricedArea";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/home">
              <LandingView />
            </Route>
            <RestircedArea redirectTo="/home">
              <Route path="/planer/:id?">
                <div id="Planer">
                  <Planer />
                </div>
              </Route>
            </RestircedArea>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
