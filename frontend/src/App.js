import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "./pages/signin/signin.component";
import Main from "./pages/main/main.component";
import Default from "./pages/default/default.component";

import "./App.css";

const App = () => {
  return (
    <div>
      <div>
        <Switch>
        <Route exact path="/" component={Default} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/main" component={Main} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
