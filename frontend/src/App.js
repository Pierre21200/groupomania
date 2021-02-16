// #
// ``
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
        `${process.env.REACT_APP_API_URL}/users/${decodedToken.userId}`,
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

// à revoir avec Ludo
// error, error.message, error.error

// Concernant decodedToken
// problème avec redirect (voir dans creatingComment dans posts/index)
// une fois problème réglé, placer decodedToken avec toutes les requêtes (creatingComment, creatingPost, updateProfile, deleteProfile...)
// remplacer tout les history par Redirect

// Déclencher un rendu quand création de post et de comm
// Fonctionnelle pour le post, mais pas pour le commentaire, problème de rendu de l'élément <Comments/>
// Donc probleme avec la logique de comments, a voir avec Ludo

// dabord, modification et suppression de compte
// problème avec fonction deleteProfile dans sidebar

// Pour le css, faire un element dropdown que reutilise pour Mon Profil, Créer un post, Créer un commentaire
// problème avec dropdown, faire une exemple type pour ludo
