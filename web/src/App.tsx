import React from "react";
import LandingView from "./home/domain/landing/LandingView";
import Planer from "./planer/Planer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProvideAuth } from "./users/ProvideAuthorization";
import { RestircedArea } from "./common/RestricedArea";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/home" component={LandingView} />
          <RestircedArea redirectTo="/home">
            <Route path="/planer/:id?" component={Planer} />
          </RestircedArea>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
