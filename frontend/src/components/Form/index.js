import React, { useState, useContext, useEffect } from "react";
import Input from "../Input/index.js";
import Button from "../Button/index.js";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../../App.js";
import { signUser, logUser, updateUser } from "../FetchData/Users/index";

const Form = ({ signIn, logIn, updateProfile, style }) => {
  const auth = useContext(UserContext);
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  function handleChangeFirstname(event) {
    setFirstName(event.target.value);
    setValidFirstName(event.target.value !== "" ? true : false);
  }

  function handleChangeLastname(event) {
    setLastName(event.target.value);
    setValidLastName(event.target.value !== "" ? true : false);
  }
  function handleChangeEmail(event) {
    setEmail(event.target.value);
    setValidEmail(event.target.value !== "" ? true : false);
  }
  function handleChangePassword(event) {
    setPassword(event.target.value);
    setValidPassword(event.target.value !== "" ? true : false);
  }

  const login = async () => {
    try {
      const result = await logUser(email, password);
      if (result) {
        auth.setUser(result.data.user);
        localStorage.setItem("token", result.data.token);
      }

      history.push(`/`); // Redirect
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async () => {
    try {
      signUser(firstName, lastName, email, password);
      console.log("Utilisateur suivant a bien été créé :");
    } catch (error) {
      console.log();
    }
  };

  const update = async () => {
    try {
      const result = await updateUser(firstName, lastName, email, token);
      if (result) {
        console.log("L'utilisateur a bien été modifié");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form style={style} className={updateProfile ? "update-form" : "null"}>
      {signIn ? (
        <div>
          <div>
            {updateProfile ? (
              <p>Modifiez votre profile ! </p>
            ) : (
              <p>
                Vous n'avez pas encore de compte ?<br />
                Inscrivez-vous !
              </p>
            )}
          </div>
          <Input
            value={firstName}
            name="Firstname"
            onChange={handleChangeFirstname}
          />

          <Input
            value={lastName}
            name="Lastname"
            onChange={handleChangeLastname}
          />
          <Input
            type="email"
            value={email}
            name="Email"
            onChange={handleChangeEmail}
          />

          <Input
            type="password"
            value={password}
            name="Password"
            onChange={handleChangePassword}
          />

          <Button
            className={updateProfile ? "btn btn-outline-light" : null}
            onClick={updateProfile ? update : signup}
            disabled={
              validPassword &&
              validEmail &&
              validFirstName &&
              validLastName === true
                ? ""
                : "disabled"
            }
          />
        </div>
      ) : null}

      {logIn ? (
        <div>
          <div>
            <p>
              Vous êtes déjà inscrit ?<br />
              Connectez-vous !
            </p>
          </div>
          <Input value={email} name="email" onChange={handleChangeEmail} />

          <Input
            value={password}
            name="password"
            onChange={handleChangePassword}
          />
          <Button
            onClick={login}
            disabled={validPassword && validEmail === true ? "" : "disabled"}
          />
        </div>
      ) : null}
    </form>
  );
};

export default Form;
