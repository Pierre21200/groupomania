// #

import LogIn from "./components/LogIn/index.js";
import Home from "./components/Home/index.js";
import Form from "./components/Form/index";
import UserContext from "./components/UserContext/index.js";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { PrivateRoute } from "./components/PrivateRoute/index";
const jwt = require("jsonwebtoken");

// si je déclare UserContext ici, impossible de le récupérer correctement ailleurs
// export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // const decodedToken = jwt.verify(token, {env.JWT_SECRET});
        const decodedToken = jwt.verify(token, "t2uxm0dsvf1");

        if (!decodedToken.userId) {
          throw new Error("Votre session a expiré");
        }

        const fetchData = async () => {
          let result = await axios(
            `http://localhost:4200/users/${decodedToken.userId}`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          if (!result) {
            throw new Error("Il y a eu un problème avec la requête");
          }
          setUser(result.data.userFound);
        };

        fetchData();
      } catch (e) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login">
            <LogIn />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

// revoir error, error.message, error.error : problème non réglé

// variable d'environnement localhost4200  : problème non réglé

// question pour Ludo :
// probleme pour import userContext si je le déclare ici dans app.js
// problème variables d'environnements, et de message error
// pourquoi ne pas tout stocker (user + token) au même endroit , cad dans le context ?
// lorsque j'envoie un userId lors d'une requete, il vaut mieux le récupérer depuis le frontend dans le context, ou depuis le backend avec decodeUid de mon headers authorization

// peut on améliorer la logique de private route, et la redirection vers home pour la page login (car warning) ?
