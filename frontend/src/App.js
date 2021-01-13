import LogIn from "./components/LogIn/LogIn.js";
import Home from "./components/Home/Home.js";
import Profile from "./components/Profile/Profile.js";

import Posts from "./components/Posts/Posts.js";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL.  */}
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>
        <Route exact path="/Home">
          <Home section={<Posts />} />
        </Route>
        <Route exact path="/Profile">
          <Home section={<Profile />} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

// getAllUsers
// Postman
// Vérifier tout les composants : idée de personnaliser tout ce qui est commun

// doc match en wrappant dans with-router : plutot useParams
// dans redirect, routeprivate
// switch

// idées générales
// penser à l'idée de composants et de leur props, a utiliser router dès que possible
// idées css :
// dans la partie posts actuel, mettre ne image de fond le logo groupomania, pleins en opacité réduit, qui aparaissent pour le chargement
