import React, { useState } from "react";
import Input from "../Input/Input.js";
import Button from "../Button/Button.js";
import Form from "../Form/Form.js";

import "./LogIn.css";

function LogIn() {
  return (
    <div className="home">
      <header>
        <h1>Groupomania</h1>
      </header>
      <div className="form-container">
        <Form signIn={false} />
        <Form signIn={true} />
      </div>
    </div>
  );
}

export default LogIn;
