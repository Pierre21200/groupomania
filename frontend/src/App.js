import LogIn from "./components/LogIn/index.js";
import Home from "./components/Home/index.js";
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
          {/* <Home section={<Posts />} /> */}
          <Home />
        </Route>
        <Route exact path="/home/:userId/createComment">
          <Home section={<Form createComment={true} />} />
        </Route>
      </Switch>
    </Router>
  );
}

document.getElementById("root");

export default App;

// A voir avec Ludovic
// l 52 home
// creatingComment
// A partir de form.js, récupérer message d'erreur from controller
// stockage du token, useAuth ?
