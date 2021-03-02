import React, { useState, useContext, useEffect } from "react";
import Input from "../Input/index.js";
import Button from "../Button/index.js";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../../App.js";
import {
  signUser,
  logUser,
  updateUserData,
  updatePassword
} from "../FetchData/Users/index";

const Form = ({ signIn, logIn, updateUser, style }) => {
  const auth = useContext(UserContext);
  const token = localStorage.getItem("token");

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const [validPassword, setValidPassword] = useState(false);
  const [validNewPassword, setValidNewPassword] = useState(false);

  const emailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);

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
    // setValidEmail(emailReg.test(event.target.value) ? true : false);
    setValidEmail(true);
  }
  function handleChangePassword(event) {
    setPassword(event.target.value);
    setValidPassword(event.target.value !== "" ? true : false);
  }

  function handleChangeNewPassword(event) {
    setNewPassword(event.target.value);
    setValidNewPassword(event.target.value !== "" ? true : false);
  }

  const login = async () => {
    try {
      const result = await logUser(email, password);
      if (result) {
        auth.setUser(result.data.user);
        localStorage.setItem("token", result.data.token);
      }
    } catch (error) {
      console.log(error);
      setErrorPassword(true);
    }
  };

  const signup = async () => {
    try {
      const result = await signUser(firstName, lastName, email, password);
      if (result) {
        auth.setUser(result.data.user);
        localStorage.setItem("token", result.data.token);
        console.log("Utilisateur suivant a bien été créé :");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      const result = await updateUserData(firstName, lastName, email, token);
      if (result) {
        console.log("L'utilisateur a bien été modifié");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateNewPassword = async () => {
    try {
      const result = await updatePassword(password, newPassword, token);
      if (result) {
        console.log("Le mot de passe a bien été modifié");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={updateUser ? "update-form" : null}>
      {signIn ? (
        <div>
          <div>
            <p>
              Vous n'avez pas encore de compte ?<br />
              Inscrivez-vous !
            </p>
          </div>
          <Input
            value={firstName}
            name="Prénom"
            onChange={handleChangeFirstname}
          />

          <Input value={lastName} name="Nom" onChange={handleChangeLastname} />
          <Input
            type="email"
            value={email}
            name="Email"
            onChange={handleChangeEmail}
          />

          {email && !validEmail ? (
            <p className="msgInvalid">Cet email n'est pas valide</p>
          ) : null}
          {validEmail ? <p className="msgValid">Cet email est valide</p> : null}

          <Input
            type="password"
            value={password}
            name="Mot de passe"
            onChange={handleChangePassword}
          />

          <Button
            onClick={signup}
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
          <Input value={email} name="Email" onChange={handleChangeEmail} />

          <Input
            name="Mot de passe"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
          {errorPassword ? (
            <p className="msgInvalid">Le mot de passe n'est pas correct !</p>
          ) : null}

          <Button
            onClick={login}
            disabled={validPassword && validEmail === true ? "" : "disabled"}
          />
        </div>
      ) : null}

      {updateUser ? (
        <div>
          <div>
            <p className="msgValidSidebar">
              Modifiez vos informations générales !
            </p>
          </div>
          <Input
            value={firstName}
            name={auth.user.firstName}
            onChange={handleChangeFirstname}
          />

          <Input
            value={lastName}
            name={auth.user.lastName}
            onChange={handleChangeLastname}
          />
          <Input
            type="email"
            value={email}
            name={auth.user.email}
            onChange={handleChangeEmail}
          />

          {email && !validEmail ? (
            <p className="msgInvalid">Cet email n'est pas valide</p>
          ) : null}
          {validEmail ? (
            <p className="msgValidSidebar">Cet email est valide</p>
          ) : null}

          <Button
            className="btn btn-outline-light"
            onClick={updateProfile}
            disabled={
              validEmail && validFirstName && validLastName === true
                ? ""
                : "disabled"
            }
          />

          <p className="msgValidSidebar">Modifiez votre mot de passe !</p>

          <Input
            type="password"
            value={password}
            name="Mot de passe actuel"
            onChange={handleChangePassword}
          />

          {errorPassword ? (
            <p className="msgInvalid">Le mot de passe n'est pas correct !</p>
          ) : null}

          <Input
            type="password"
            value={newPassword}
            name="Nouveau mot de passe"
            onChange={handleChangeNewPassword}
          />

          <Button
            className="btn btn-outline-light"
            onClick={updateNewPassword}
            disabled={validPassword && validNewPassword ? "" : "disabled"}
          />
        </div>
      ) : null}
    </form>
  );
};

export default Form;
