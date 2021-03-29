import React, { useState } from "react";
import logo from "../../../icons/icon-c.png";
import Button from "../../SubComponents/Button/index";
import Form from "../../SubComponents/Form/index";
import { deleteUser } from "../../Utils/FetchData/Users/index.js";
import { Redirect } from "react-router-dom";

const Sidebar = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [dropdownUpdateProfile, setDropdownUpdateProfile] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    setRedirectToLogin(true);
  };

  const confirmDeleteProfile = async () => {
    await deleteUser(token);
    logout();
  };

  return redirectToLogin ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : (
    <div className="sidebar">
      <div className="logo-home">
        <img className="home-logo" src={logo} alt="groupomania-logo" />
      </div>
      <div className="menu">
        <Button
          onClick={() => setDropdownUpdateProfile(!dropdownUpdateProfile)}
          disabled=""
          className="btn btn-outline-light bouton"
          value="Mon Profil"
        />

        {dropdownUpdateProfile ? <Form updateUser={true} /> : null}

        {deleteProfile ? (
          <Button
            onClick={confirmDeleteProfile}
            disabled=""
            className="btn btn-outline-danger btn-confirm bouton"
            value="Confirmer suppression de mon profil"
          />
        ) : (
          <Button
            onClick={() => setDeleteProfile(true)}
            disabled=""
            className="btn btn-outline-light bouton"
            value="Supprimer mon profil"
          />
        )}

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
