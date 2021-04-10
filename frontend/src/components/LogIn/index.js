import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Form from "../SubComponents/Form/index.js";
import logo from "../../icons/icon-c.png";
import { UserContext } from "../../App.js";

function LogIn() {
  const auth = useContext(UserContext);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const getRedirectToHome = () => {
    if (auth?.user) {
      setRedirectToHome(true);
    }
  };

  useEffect(() => {
    getRedirectToHome();
  }, [auth, redirectToHome]);

  return redirectToHome ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
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
