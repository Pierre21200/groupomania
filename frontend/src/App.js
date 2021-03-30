// #
// ``
import LogIn from "./components/LogIn/index.js";
import Home from "./components/Home/index.js";
import Page404 from "./components/Utils/Page404/index.js";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/Utils/PrivateRoute/index";
import { getUser } from "./components/Utils/FetchData/Users/index.js";
const jwt = require("jsonwebtoken");

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  console.log(user);

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
          <PrivateRoute
            exact
            path="/profile/:id"
            component={Home}
            profile={true}
          />
          <Route path="/" component={Page404} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
