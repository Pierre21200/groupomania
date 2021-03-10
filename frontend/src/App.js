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
            component={Home}
            profile={true}
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

// Private Route juste au dessus : toujours le même problème
// Impossible de récupérer error.message de mon backend

// vider mes inputs
// solution dans creatingPost, pas mieux à faire ? sinon, appliquer cette logique à tout mes inputs

// problème profil/id, warning memory leak et impossible de rafraichir

// penser a faire une page 404
// faire un fichier de descriptif de lancement pour mon app

// faire du tri dans mes dossiers
// mettre private route ailleurs

// la on s'attaque à la création de base en soit et au remplissage

// npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string;
// npm sequelize-cli init
