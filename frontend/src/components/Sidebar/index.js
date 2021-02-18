import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../icons/icon-c.png";
import Button from "../Button/index";
import Form from "../Form/index";
import { deleteUser } from "../FetchData/Users/index.js";

const Sidebar = () => {
  const [showUpdatingProfile, setShowUpdatingProfile] = useState(false);
  const token = localStorage.getItem("token");

  const deleteProfile = async () => {
    const inactiveUser = await deleteUser(token);
    console.log("L'utilisateur a bien été inactivé");
  };

  const seeUpdatingProfile = async () => {
    setShowUpdatingProfile(!showUpdatingProfile);
  };

  return (
    <div className="sidebar">
      <div className="logo-home">
        <img className="home-logo" src={logo} alt="groupomania-logo" />
        <h1>Groupomania</h1>
      </div>
      <div className="menu">
        <Button
          onClick={seeUpdatingProfile}
          disabled=""
          className="btn btn-outline-light bouton"
          value="Mon Profil"
        />
        {showUpdatingProfile ? (
          <Form updateProfile={true} signIn={true} />
        ) : null}

        <button onClick={deleteProfile}>Supprimer le profile</button>
        <h2>Deconnexion</h2>
      </div>
    </div>
  );
};

export default Sidebar;
