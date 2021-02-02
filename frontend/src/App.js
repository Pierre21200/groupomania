import LogIn from "./components/LogIn/index.js";
import Home from "./components/Home/index.js";
import Form from "./components/Form/index";

import Posts from "./components/Posts/index.js";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from "./components/UserContext/index.js";

function App() {
  const [thisUser, setThisUser] = useState({});
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

// A voir avec Ludovic
// l 52 home done
// creatingComment
// A partir de form.js, récupérer message d'erreur from controller
// stockage du token, useAuth ?

// revoir error, error.message, error.error lol : problème non réglé

// variable d'environnement localhost4200 nanani : problème non réglé

// controllers : ne pas récupérer les id dans params mais dans le body : problème non réglé

// fetchData : Done

// creatingComments : Done

// useContext pour stocker user
// contextProvider qui wrapp app avec une props value={setUser, user}
// on continue comme ça : dans login, on stocke nos infos dans user avec setUser, et on essaie de récupérer tout ça plus tard
// on a bien stocké les infos dans le UserContext, on peut le récupérer plus tard, mais combien de temps les informations restent à l'intérieur
// c'est pour ça qu'il faut stocker token dans local storage ?

// stocker token dans localstorage

// package decodeUid frontend

// question : quelle dif entre auth frontend et backend
// dans le controller on recupère bien un id pour le passer a la base de données, parfois avec params, parfois avec decodeUid
// pourquoi ne pas directement l'envoyer depuis le frontend (puisque c'est ce qu'on est amené a faire)
// dans le backend le middleware auth va vérifier si userId dans req.headers.authorization est égal au userId dans req.body
// decodeUid c'est exactement la même sauf qu'il te renvoie pas une error mais te permet de récupérer l'id
// voir axios header, exemple :
// fetch(`${process.env.REACT_APP_API_URL}/posts/reaction`, {
// method: "POST",
// headers: { "Content-Type": "application/json", Authorization: "Bearer " + auth.token },
// body: JSON.stringify({
//     post_id: props.id,
//     reaction: reaction,
//     reacted: hasReacted,
// }),

// bien faire la différence autre auth backend et auth frontend
// dans le backend, on doit envoyer le token dans req.header.authorization
