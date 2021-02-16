import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect
} from "react-router-dom";

const jwt = require("jsonwebtoken");

const decodeToken = () => {
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
    return <Redirect to={{ pathname: "/" }} />; // la redirectection ne se fait pas
  }
};

export default decodeToken;
