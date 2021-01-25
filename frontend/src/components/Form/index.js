import React, { useState } from "react";
import Input from "../Input/index.js";
import Button from "../Button/index.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Form = ({ signIn }) => {
  const history = useHistory();

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
    // ici, le try envoie soit une error 401 via le controller, soit un status 200
    // lorsque j'essaie de provoquer une erreur envoyer depuis le controller, je reçois une erreur 401, mais pas le message
    // comment récupérer le message error du controller

    try {
      let result = await axios.post("http://localhost:4200/users/login", {
        email,
        password
      });

      history.push("/home");
      // envoyer l'id du user dans l'url, puis le récupérer à l'ouverture de home
      // history.push("/home"{user.id});
    } catch (error) {
      console.log("error 401");
    }
  };

  // même logique que login, mais importance des regex car seul vérification
  //comment récuper le newUser, et le message.error
  const signup = async () => {
    try {
      let result = await axios.post("http://localhost:4200/users/signup", {
        firstName,
        lastName,
        email,
        password
      });

      console.log("Utilisateur a bien été créé");
      // envoyer l'id du user dans l'url, puis le récupérer à l'ouverture de home, en ajoutant un modal (message dans une fenêtre) "Utilisateur suivant bien créé :  {newUser de controller}"
    } catch (error) {
      console.log();
    }
  };

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
            value={firstName}
            name="Firstname"
            onChange={handleChangeFirstname}
          />

          <Input
            value={lastName}
            name="Lastname"
            onChange={handleChangeLastname}
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

      {signIn ? (
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
      ) : (
        <Button
          onClick={login}
          disabled={validPassword && validEmail === true ? "" : "disabled"}
        />
      )}
    </form>
  );
};

export default Form;
