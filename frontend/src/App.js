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

  // ici, on verifie l'existence d'un token et de son expiration, et on met à jour notre contexte en fonction
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwt.verify(token, "t2uxm0dsvf1");

        if (!decodedToken.userId) {
          throw new Error("Votre session a expiré");
        }

        const fetchData = async () => {
          let result = await axios(
            `http://localhost:4200/users/${decodedToken.userId}`
          );
          if (!result) {
            throw new Error("Problème avec requête");
          }
          setUser(result.data.userFound);
        };

        fetchData();
      } catch (e) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Puis on protège nos routes avec PrivateRoute
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LogIn />
          </Route>
          <PrivateRoute exact path="/home/:userId" component={Home} />
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

// question pour Ludo :
// probleme pour import userContext si je le déclare ici dans app.js
// le token dans localstorage durée illimité, quand est ce que je dois l'effacer a part au logout ?
// pourquoi ne pas tout stocker au même endroit , cad dans le context ?
// dans form login, history push plus rapide avec result.data

// peut on améliorer la logique de private route, et la redirection vers home pour la page login (car warning) ?
