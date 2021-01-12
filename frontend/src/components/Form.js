import React, { useState } from "react";
import Input from "./Input.js";
import Button from "./Button.js";

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
    <form className={signIn ? "form-sign" : "form-log"}>
      {signIn ? (
        <div>
          <div>
            <p>
              Vous n'avez pas encore de compte ?<br />
              Inscrivez-vous !
            </p>
          </div>
          <Input
            type="text"
            value={newFirstname}
            name="inputFirstname"
            onChange={handleChangeFirstname}
            placeholder="Firstname"
          />

          <Input
            type="text"
            value={newLastname}
            name="inputLastname"
            onChange={handleChangeLastname}
            placeholder="Lastname"
          />
        </div>
      ) : (
        <div>
          <p>
            Vous êtes déjà inscrit ?<br />
            Connectez-vous !
          </p>
        </div>
      )}

      <Input
        type="email"
        value={newEmail}
        name={signIn ? "inputEmailSign" : "inputEmailLog"}
        onChange={handleChangeEmail}
        placeholder="Email"
      />

      <Input
        type="password"
        value={newPassword}
        name={signIn ? "inputPasswordSign" : "inputPasswordLog"}
        onChange={handleChangePassword}
        placeholder="Password"
        autoComplete="on"
      />

      {signIn ? (
        <Button
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
        <Button
          disabled={validPassword && validEmail === true ? "" : "disabled"}
        />
      )}
    </form>
  );
};

export default Form;
