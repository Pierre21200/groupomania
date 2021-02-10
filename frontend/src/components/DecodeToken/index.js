import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

const jwt = require("jsonwebtoken");

// la fonction DecodeToken te permet de vérifier token et son expiration, et redirige vers login si error
// elle sert donc a protéger tes routes en frontend en plus de PrivateRoute sur home (posts etc)
const DecodeToken = () => {
  const history = useHistory();
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Vous n'êtes pas connecté !");
    }
    const decodedToken = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    if (!decodedToken.userId) {
      throw new Error("Votre session a expiré");
    }
    console.log("La session reste ouverte !");
  } catch (e) {
    console.log(e);
    history.push("/login");
  }
};

export default DecodeToken;
