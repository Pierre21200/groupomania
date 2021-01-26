import LogIn from "./components/LogIn/index.js";
import Home from "./components/Home/index.js";
import Profile from "./components/Profile/index.js";
import Form from "./components/Form/index";

import Posts from "./components/Posts/index.js";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>
        <Route exact path="/home/:userId">
          <Home section={<Posts />} />
        </Route>
        <Route exact path="/home/:userId/createPost">
          <Home section={<Form createPost={true} />} />
        </Route>
        <Route exact path="/home/:userId/createComment">
          <Home section={<Form createComment={true} />} />
        </Route>
        <Route exact path="/profile">
          <Home section={<Profile />} />
        </Route>
        <Route exact path="/profile/:userId">
          <Home section={<Profile />} />
        </Route>
      </Switch>
    </Router>
  );
}

document.getElementById("root");

export default App;
