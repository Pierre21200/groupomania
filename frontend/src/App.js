// #

import LogIn from "./components/LogIn/index.js";
import Home from "./components/Home/index.js";
import Form from "./components/Form/index";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { PrivateRoute } from "./components/PrivateRoute/index";
const jwt = require("jsonwebtoken");

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  // cette fonction vérifie l'existence du token, son expiration, et met a jour le context en fonction
  const majAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Vous n'êtes pas connecté !");
      }
      const decodedToken = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
      if (!decodedToken.userId) {
        throw new Error("Votre session a expiré");
      }
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
    } catch (e) {
      console.log(e);
    }
  };

  // faire une fonction qui permet de décoder le token, et je l'utilise partout, je dois bien vérifier en frontend si token expiré

  // faire une fonction fetchData

  // const decodeToken = () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       throw new Error("Vous n'êtes pas connecté !");
  //     }
  //     const decodedToken = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
  //     if (!decodedToken.userId) {
  //       throw new Error("Votre session a expiré");
  //     }
  //   } catch (e) {
  //     localStorage.removeItem("token");
  //     history.push("/login");
  //   }
  // };

  // const fetchData = async () => {
  //   const token = localStorage.getItem("token");

  //   let result = await axios(
  //     `http://localhost:4200/users/${decodedToken.userId}`,
  //     {
  //       headers: { Authorization: `Bearer ${token}` }
  //     }
  //   );
  //   if (!result) {
  //     throw new Error("Il y a eu un problème avec la requête");
  //   }
  //   setUser(result.data.userFound);
  // };

  useEffect(() => {
    try {
      majAuth();
    } catch (e) {
      console.log(e);
      localStorage.removeItem("token");
    }
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

// revoir error, error.message, error.error : problème non réglé en attente de Ludovic

// variable d'environnement localhost4200  : a revoir

// question pour Ludo :

// problème pour import userContext si je le déclare ici dans app.js // pas export par défaut // done

// pourquoi ne pas tout stocker (user + token) au même endroit , cad dans le context ? // si on rafraichi la page c'est ciao // done

// lorsque j'envoie un userId lors d'une requete, il vaut mieux le récupérer depuis le frontend dans le context, ou depuis le backend avec decodeUid de mon headers authorization
// plus rapide dans le backend avec decodeUid authorization // done

// peut on améliorer la logique de private route, et la redirection vers home pour la page login (car warning) ? // done
