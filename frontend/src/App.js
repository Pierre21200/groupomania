// #
// ``
import LogIn from "./components/LogIn/index.js";
import Home from "./components/Home/index.js";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { PrivateRoute } from "./components/PrivateRoute/index";
import { getUser } from "./components/FetchData/Users/index.js";
import Profile from "./components/Profile/index.js";
const jwt = require("jsonwebtoken");

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  const majAuth = async () => {
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
          <Route exact path="/profile/:id">
            <Home profile={true} />
          </Route>
          {/* faire pareil mais en protégeant ma route */}
          {/* <PrivateRoute exact path="/profile/:id" component={Home} et donc le composant profile = true ici j'imagine/> */}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

// à revoir avec Ludo
// voir juste au dessus, passe la props profile à true dans home
// error, error.message, error.error

// penser à remettre RegEx mail

// Attention, dans tous mes form, récupérez message d'erreur envoyé par le backend pour afficher à l'utilisteur, en attente Ludo
// Attention pour email dans signup, s'il passe la regex mais que l'email est déjà existant dans la base de donnée ça pose problème

// voir quelques commentaires : trouver un moyen pour maper sur les premiers éléments du tableau

// Attention, quand je clique sur commentaires, les commentaires de tout les posts apparraiseent

// vider mes inputs
// ajouter date pour commentaire et post

// Fonctionnalités modérateurs : ajouter message de confirmation
// modérer (inactive) post : done
// modérer (inactive) profil
// modérer (inactive) comment : done

// gros tri css à faire

// on reattaque ensuite par posts {usersPosts=true}
