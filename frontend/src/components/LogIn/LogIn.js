import React, { useState } from "react";
import Form from "../Form/Form.js";
import "./LogIn.css";
import logo from "../../icons/icon-c.png";

function LogIn() {
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
        <Form signIn={false} />
        <Form signIn={true} />
      </div>
    </div>
  );
}

export default LogIn;
