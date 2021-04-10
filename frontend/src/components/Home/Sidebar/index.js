import React, { useState } from "react";
import Button from "../../SubComponents/Button/index";
import Form from "../../SubComponents/Form/index";
import { deleteUser } from "../../Utils/FetchData/Users/index.js";
import { Redirect } from "react-router-dom";

const Sidebar = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [dropdownUpdateProfile, setDropdownUpdateProfile] = useState(false);
  const [dropdownUpdateInfos, setDropdownUpdateInfos] = useState(false);
  const [dropdownUpdatePassword, setDropdownUpdatePassword] = useState(false);
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
      <div className="container-btn-profile">
        <Button
          onClick={() => setDropdownUpdateProfile(!dropdownUpdateProfile)}
          disabled=""
          className="btn sidebar-btn btn-outline-light "
          value="Mon Profil"
        />
        {dropdownUpdateProfile ? (
          <div>
            <Button
              onClick={() => setDropdownUpdateInfos(!dropdownUpdateInfos)}
              disabled=""
              className="btn sub-sidebar-btn btn-light "
              value="Modifier vos informations générales"
            />
            {dropdownUpdateInfos ? <Form updateUserInfos={true} /> : null}

            <Button
              onClick={() => setDropdownUpdatePassword(!dropdownUpdatePassword)}
              disabled=""
              className="btn sub-sidebar-btn btn-light "
              value="Modifier votre mot de passe"
            />

            {dropdownUpdatePassword ? <Form updateUserPassword={true} /> : null}

            <Button
              onClick={() => setDeleteProfile(!deleteProfile)}
              disabled=""
              className="btn sub-sidebar-btn btn-light "
              value="Supprimer votre profil"
            />

            {deleteProfile ? (
              <div>
                <Button
                  onClick={() => setDeleteProfile(!deleteProfile)}
                  disabled=""
                  className="btn sub-sidebar-btn btn-danger "
                  value="Confirmer la suppression de votre profil"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="container-btn-logout">
        <Button
          onClick={logout}
          disabled=""
          className="btn sidebar-btn btn-outline-light bouton"
          value="Deconnexion"
        />
      </div>
    </div>
  );
};

export default Sidebar;
