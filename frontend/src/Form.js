import React, { useState } from "react";
import "./Form.css";
import INPUT from "./input.js";
import BUTTON from "./button.js";

const Form = ({ signIn }) => {
  const [newFirstname, setNewFirstname] = useState("");
  const [validFirstname, setValidFirstname] = useState(false);
  const [newLastname, setNewLastname] = useState("");
  const [validLastname, setValidLastname] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  function handleChangeFirstname(event) {
    setNewFirstname(event.target.value);
    setValidFirstname(event.target.value !== "" ? true : false);
  }

  function handleChangeLastname(event) {
    setNewLastname(event.target.value);
    setValidLastname(event.target.value !== "" ? true : false);
  }
  function handleChangeEmail(event) {
    setNewEmail(event.target.value);
    setValidEmail(event.target.value !== "" ? true : false);
  }
  function handleChangePassword(event) {
    setNewPassword(event.target.value);
    setValidPassword(event.target.value !== "" ? true : false);
  }

  return (
    <form>
      {signIn ? (
        <div>
          <INPUT
            type="text"
            value={newFirstname}
            name={signIn ? "inputFirstnameSign" : "inputFirstnameLog"}
            onChange={handleChangeFirstname}
            placeholder="Firstname"
          />

          <INPUT
            type="text"
            value={newLastname}
            name={signIn ? "inputLastnameSign" : "inputLastnameLog"}
            onChange={handleChangeLastname}
            placeholder="Lastname"
          />
        </div>
      ) : (
        ""
      )}

      <INPUT
        type="email"
        value={newEmail}
        name={signIn ? "inputEmailSign" : "inputEmailLog"}
        onChange={handleChangeEmail}
        placeholder="Email"
      />

      <INPUT
        type="password"
        value={newPassword}
        name={signIn ? "inputPasswordSign" : "inputPasswordLog"}
        onChange={handleChangePassword}
        placeholder="Password"
        autoComplete="on"
      />

      {signIn ? (
        <BUTTON
          disabled={
            validPassword &&
            validEmail &&
            validFirstname &&
            validLastname === true
              ? ""
              : "disabled"
          }
        />
      ) : (
        <BUTTON
          disabled={validPassword && validEmail === true ? "" : "disabled"}
        />
      )}
    </form>
  );
};

export default Form;
