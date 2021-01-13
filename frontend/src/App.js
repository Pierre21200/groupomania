import LogIn from "./components/LogIn/LogIn.js";
import Home from "./components/Home/Home.js";

import Posts from "./components/Home/Home.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Profile from "./components/Profile/Profile.js";
import Input from "./components/Input/Input.js";
import Button from "./components/Button/Button.js";
import logo from "./icons/icon-c.png";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">LogIn</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL.  */}
        <Switch>
          <Route path="/">
            <LogIn />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
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

//idées générales
// penser à l'idée de composants et de leur props, a utiliser router dès que possible
// idées css :
// dans la partie posts actuel, mettre ne image de fond le logo groupomania, pleins en opacité réduit, qui aparaissent pour le chargement
