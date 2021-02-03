import LogIn from "./components/LogIn/index.js";
import Home from "./components/Home/index.js";
import Form from "./components/Form/index";

import Posts from "./components/Posts/index.js";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from "./components/UserContext/index.js";

// créer le usercontext ici direct

// éviter this

function App() {
  const [thisUser, setThisUser] = useState(null);

  useEffect(() => {
    // vérifier si user n'est pas null
    // sinon, récupérer token, le décodé et mettre a jour mon thisUser
  }, []);
  return (
    <UserContext.Provider value={{ thisUser, setThisUser }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LogIn />
          </Route>
          <Route exact path="/home/:userId">
            <Home />
          </Route>
          <Route exact path="/home/:userId/createComment">
            <Home section={<Form createComment={true} />} />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

document.getElementById("root");

export default App;

// revoir error, error.message, error.error lol : problème non réglé

// variable d'environnement localhost4200  : problème non réglé

// controllers : ne pas récupérer les id dans params mais dans le body : problème non réglé

// stocker token dans localstorage

// package decodeUid frontend
