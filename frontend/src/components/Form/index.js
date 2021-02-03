import React, { useState, useContext } from "react";
import Input from "../Input/index.js";
import Button from "../Button/index.js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext/index.js";

const Form = ({ signIn, createPost, logIn }) => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [content, setContent] = useState("");
  const [validContent, setValidContent] = useState(false);

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
  function handleChangeTitle(event) {
    setTitle(event.target.value);
    setValidTitle(event.target.value !== "" ? true : false);
  }
  function handleChangeContent(event) {
    setContent(event.target.value);
    setValidContent(event.target.value !== "" ? true : false);
  }

  const auth = useContext(UserContext);

  const login = async () => {
    // ici, le try envoie soit une error 401 via le controller, soit un status 200
    // lorsque j'essaie de provoquer une erreur envoyer depuis le controller, je reçois une erreur 401, mais pas le message
    // comment récupérer le message error du controller

    try {
      let result = await axios.post(
        "http://localhost:4200/users/login",
        {
          email,
          password
        }
        // { headers: { Authorization: `Bearer ${token}` } }  oui mais pas ici
        // attention backtick. Créer une fonction pour récupérer mon token
      );
      if (result) {
        auth.setThisUser(result.data); // on stocke le userId dans notre contexte
      }
      if (auth.thisUser) {
        console.log(auth.thisUser.user);
        history.push(`/home/${auth.thisUser.user.id}`); // on redirige vers home avec l'id qu'on récupère dans le contexte
      }
    } catch (error) {
      console.log(error);
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

      console.log("Utilisateur suivant a bien été créé :");
      // envoyer l'id du user dans l'url, puis le récupérer à l'ouverture de home, en ajoutant un modal (message dans une fenêtre) "Utilisateur suivant bien créé :  {newUser de controller}"
    } catch (error) {
      console.log();
    }
  };

  const creatingPost = async () => {
    let utilId = 4; // modification temporaire
    try {
      let result = await axios.post("http://localhost:4200/posts/create", {
        title,
        content,
        utilId // modification temporaire
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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

        {createPost ? (
          <div>
            <div>
              <p>
                Envie de partager quelque-chose ? <br />
                Ecrivez-le !
              </p>
            </div>
            <Input value={title} name="title" onChange={handleChangeTitle} />

            <Input
              value={content}
              name="content"
              onChange={handleChangeContent}
            />

            <Button
              onClick={creatingPost}
              disabled={validTitle && validContent === true ? "" : "disabled"}
            />
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Form;
