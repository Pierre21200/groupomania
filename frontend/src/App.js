// #
// ``
import LogIn from "./components/LogIn/index.js";
import Home from "./components/Home/index.js";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { PrivateRoute } from "./components/PrivateRoute/index";
const jwt = require("jsonwebtoken");

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  const majAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
      if (token && decodedToken.userId) {
        let result = await axios(
          `${process.env.REACT_APP_API_URL}/users/${decodedToken.userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
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
          <Route exact path="/login">
            <LogIn />
          </Route>
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

// à revoir avec Ludo
// error, error.message, error.error

// Modération d'un post
// retravailler la suppression d'un profil en l'accompagnant d'un logout (ciao token)
// faire aussi un logout
