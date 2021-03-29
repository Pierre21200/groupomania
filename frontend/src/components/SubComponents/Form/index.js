import React, { useState, useContext, useEffect } from "react";
import Input from "../Input/index.js";
import Button from "../Button/index.js";
import Modal from "../Modal/index.js";
import { UserContext } from "../../../App.js";
import {
  signUser,
  logUser,
  updateUserData,
  updatePassword
} from "../../Utils/FetchData/Users/index";

const Form = ({ signIn, logIn, updateUser }) => {
  const auth = useContext(UserContext);
  const token = localStorage.getItem("token");

  const [errorLogin, setErrorLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validEmailLog, setValidEmailLog] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [validPasswordLog, setValidPasswordLog] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [validNewPassword, setValidNewPassword] = useState(false);

  const [update, setUpdate] = useState(false);
  const [confirmUpdatePassword, setConfirmUpdatePassword] = useState(false);

  const emailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/);
  const passwordReg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

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
    setValidEmailLog(event.target.value !== "" ? true : false);
    setValidEmail(emailReg.test(event.target.value) ? true : false);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
    setValidPasswordLog(event.target.value !== "" ? true : false);
    setValidPassword(passwordReg.test(event.target.value) ? true : false);
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
      setErrorLogin(true);
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

  const confirmUpdateProfile = () => {
    setUpdate(!update);
  };

  const updateProfile = async () => {
    try {
      const result = await updateUserData(firstName, lastName, email, token);
      if (result) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateNewPassword = async () => {
    try {
      const result = await updatePassword(password, newPassword, token);
      if (result) {
        window.location.reload();
        console.log("Le mot de passe a bien été modifié");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={updateUser ? "update-form" : null}>
      {update ? (
        <Modal
          fisrtNameBefore={auth.user.firstName}
          fisrtNameAfter={firstName}
          lastNameBefore={auth.user.lastName}
          lastNameAfter={lastName}
          emailBefore={auth.user.email}
          emailAfter={email}
          onclickYes={updateProfile}
          onclickCancel={confirmUpdateProfile}
        />
      ) : null}

      {signIn ? (
        <div>
          <div>
            <p>
              Vous n'avez pas encore de compte ?<br />
              Inscrivez-vous !
            </p>
          </div>
          <Input
            name="Prénom"
            onChange={handleChangeFirstname}
            value={firstName}
          />

          <Input name="Nom" onChange={handleChangeLastname} value={lastName} />
          <Input
            type="email"
            name="Email"
            onChange={handleChangeEmail}
            value={email}
          />

          {email && !validEmail ? (
            <p className="msgInvalid">Cet email n'est pas valide</p>
          ) : null}
          {validEmail ? <p className="msgValid">Cet email est valide</p> : null}

          <Input
            type="password"
            name="Mot de passe"
            onChange={handleChangePassword}
            value={password}
          />

          {password && !validPassword ? (
            <p className="msgInvalid">
              Le mot de passe doit contenir 8 caractères au minimum, un chiffre
              et un lettre
            </p>
          ) : null}
          {validPassword ? (
            <p className="msgValid">Ce mot de passe est valide</p>
          ) : null}

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
          <Input name="Email" onChange={handleChangeEmail} value={email} />

          <Input
            name="Mot de passe"
            type="password"
            onChange={handleChangePassword}
            value={password}
          />

          <Button
            onClick={login}
            disabled={
              validPasswordLog && validEmailLog === true ? "" : "disabled"
            }
          />
          {errorLogin ? (
            <p className="msgInvalid">Ces informations sont erronées</p>
          ) : null}
        </div>
      ) : null}

      {updateUser ? (
        <div>
          <div className="form-update-profile">
            <div>
              <p className="msgValidSidebar">
                Modifiez vos informations générales !
              </p>
            </div>
            <Input
              name={auth.user.firstName}
              onChange={handleChangeFirstname}
              value={firstName}
            />
            <Input
              name={auth.user.lastName}
              onChange={handleChangeLastname}
              value={lastName}
            />
            <Input
              type="email"
              name={auth.user.email}
              onChange={handleChangeEmail}
              value={email}
            />
            {email && !validEmail ? (
              <p className="msgInvalid">Cet email n'est pas valide</p>
            ) : null}
            {validEmail ? (
              <p className="msgValidSidebar">Cet email est valide</p>
            ) : null}
            <Button
              className="btn btn-outline-light"
              onClick={confirmUpdateProfile}
              disabled={
                validEmail && validFirstName && validLastName === true
                  ? ""
                  : "disabled"
              }
            />
          </div>
          <div className="form-update-password">
            <p className="msgValidSidebar">Modifiez votre mot de passe !</p>
            <Input
              type="password"
              name="Mot de passe actuel"
              onChange={handleChangePassword}
              value={password}
            />
            <Input
              type="password"
              name="Nouveau mot de passe"
              onChange={handleChangeNewPassword}
              value={newPassword}
            />
            {confirmUpdatePassword ? (
              <Button
                className="btn btn-outline-danger btn-confirm"
                onClick={updateNewPassword}
                disabled={validPassword && validNewPassword ? "" : "disabled"}
                value="Confirmer la modification du mot de passe"
              />
            ) : (
              <Button
                className="btn btn-outline-light"
                onClick={() => setConfirmUpdatePassword(true)}
                disabled={validPassword && validNewPassword ? "" : "disabled"}
              />
            )}
          </div>
        </div>
      ) : null}
    </form>
  );
};

export default Form;
