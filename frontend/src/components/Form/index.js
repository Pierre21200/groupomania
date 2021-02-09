import React, { useState, useContext } from "react";
import Input from "../Input/index.js";
import Button from "../Button/index.js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext/index.js";
// import UserContext from "../../App.js";

const Form = ({ signIn, logIn }) => {
  const auth = useContext(UserContext);
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
    try {
      let result = await axios.post("http://localhost:4200/users/login", {
        email,
        password
      });
      if (result) {
        auth.setUser(result.data.user);
        localStorage.setItem("token", result.data.token);
      }
      <div>Chargement</div>;

      history.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async () => {
    try {
      let result = await axios.post("http://localhost:4200/users/signup", {
        firstName,
        lastName,
        email,
        password
      });

      console.log("Utilisateur suivant a bien été créé :");
    } catch (error) {
      console.log();
    }
  };

  return (
    <form>
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
