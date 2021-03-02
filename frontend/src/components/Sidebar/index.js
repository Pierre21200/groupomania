import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../icons/icon-c.png";
import Button from "../Button/index";
import Form from "../Form/index";
import { deleteUser } from "../FetchData/Users/index.js";
import { Redirect } from "react-router-dom";

const Sidebar = () => {
  const [redirect, setRedirect] = useState(false);
  const [showUpdatingProfile, setShowUpdatingProfile] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const token = localStorage.getItem("token");

  const logout = async () => {
    localStorage.removeItem("token");
    setRedirect(true);
  };

  const deleteProfile = async () => {
    setConfirmDelete(!confirmDelete);
  };

  const confirmDeleteProfile = async () => {
    const inactiveUser = await deleteUser(token);
    console.log("L'utilisateur a bien été inactivé");
    logout();
  };

  const seeUpdatingProfile = async () => {
    setShowUpdatingProfile(!showUpdatingProfile);
  };

  return redirect ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : (
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
        {showUpdatingProfile ? <Form updateUser={true} /> : null}
        <Button
          onClick={deleteProfile}
          disabled=""
          className="btn btn-outline-light bouton"
          value="Supprimer mon profil"
        />
        {confirmDelete ? (
          <div className="confirm-delete">
            <p>
              Vous êtes sur le point de supprimer votre profil, cette action est
              définitive, êtes vous sur ?
            </p>
            <Button
              onClick={confirmDeleteProfile}
              disabled=""
              value="Confirmez"
            />
          </div>
        ) : null}
        <Button
          onClick={logout}
          disabled=""
          className="btn btn-outline-light bouton"
          value="Deconnexion"
        />
      </div>
    </div>
  );
};

export default Sidebar;
