import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../icons/icon-c.png";
import Button from "../Button/index";
import Form from "../Form/index";
import { deleteUser } from "../FetchData/Users/index.js";

const Sidebar = () => {
  const [displayNewForm, setDisplayNewForm] = useState("none"); // concerne le dropdow newPost, à nettoyer

  const token = localStorage.getItem("token");

  const deleteProfile = async () => {
    console.log("coucou");
    const supp = await deleteUser(token);
    console.log("L'utilisateur a bien été supprimé");
    // attention ici il faut supprimer le profil, mais aussi les posts et commentaires associés
    // le profile se supprime bien mais la fonction s'arrête après const supp = await... Pourquoi ?
  };

  const seeUpdatingProfile = () => {
    if (displayNewForm === "none") {
      setDisplayNewForm("block");
    } else {
      setDisplayNewForm("none");
    }
    if (displayNewForm === "none") {
      setDisplayNewForm("block");
    }
  };
  return (
    <div className="sidebar">
      <div className="logo-home">
        <img className="home-logo" src={logo} alt="groupomania-logo" />
        <h1>Groupomania</h1>
      </div>
      <div className="menu">
        {/* On veut faire un bouton qui fait apparaitre un petit formulaire en
        dessous */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>

        <Button
          onClick={seeUpdatingProfile}
          disabled=""
          className="btn btn-outline-light bouton"
          value="Mon Profil"
        />
        <Form
          updateProfile={true}
          signIn={true}
          style={{ display: displayNewForm }}
        />

        <button onClick={deleteProfile}>Supprimer le profile</button>
        <h2>Deconnexion</h2>
      </div>
    </div>
  );
};

export default Sidebar;
