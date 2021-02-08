import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Form from "../Form/index.js";
import "./LogIn.css";
import logo from "../../icons/icon-c.png";
import UserContext from "../UserContext/index.js";

function LogIn() {
  const history = useHistory();
  const auth = useContext(UserContext);

  if (auth.user) {
    history.push(`/home/${auth.user.id}`);
  }

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="login-container-title">
          <img className="login-logo" src={logo} alt="groupomania-logo" />
          <h1 className="login-title">Groupomania</h1>
        </div>
        <p className="login-subtitle">Votre nouveau réseau d'entreprise</p>
      </header>
      <div className="form-container">
        <Form logIn={true} />
        <Form signIn={true} />
      </div>
    </div>
  );
}

export default LogIn;
