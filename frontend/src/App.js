// #
// ``
import LogIn from "./components/LogIn/index.js";
import Home from "./components/Home/index.js";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute/index";
import { getUser } from "./components/FetchData/Users/index.js";
const jwt = require("jsonwebtoken");

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  console.log("1");

  const majAuth = async () => {
    console.log("2");
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
      if (token && decodedToken.userId) {
        const result = await getUser(token, decodedToken.userId);
        if (!result) {
          throw new Error("Il y a eu un problème avec la requête");
        }
        setUser(result.data.userFound);
      }
    } catch (e) {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    majAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <Route exact path="/login" component={LogIn} />
          <PrivateRoute exact path="/" component={Home} />
          {/* <PrivateRoute
            exact
            path="/profile/:id"
            component={<Home profile={true} />}
          /> */}

          <Route exact path="/profile/:id">
            <Home profile={true} />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

// quand je modifie mon profil, faire un nouveau rendu de home

// Private Route juste au dessus

// error, error.message, error.error
// revoir message tout les messages d'erreur

// vider mes inputs
// pas réussi

// problème sur profile/:id au niveau de auth quand je raffraichi

// penser a faire une page 404
// faire un fichier de descriptif de lancement pour mon app
