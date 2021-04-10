import React, { useContext, useEffect, useState } from "react";
import Button from "../Button/index";
import Form from "../Form/index";
import User from "../User/index";
import Comments from "../../Home/Posts/Comments/index.js";
import {
  getPosts,
  postPost,
  updatePost,
  getUserPosts
} from "../../Utils/FetchData/Posts/index";

import { UserContext } from "../../../App.js";
import { Redirect, useParams } from "react-router";

const Myprofile = () => {
  const auth = useContext(UserContext);
  const [redirectToHome, setRedirectToHome] = useState(null);
  const [modifyInfos, setModifyInfos] = useState(null);
  const [modifyPassword, setModifyPassword] = useState(null);

  return redirectToHome ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <div>
      <div>
        <div>
          <Button
            onClick={() => setRedirectToHome(true)}
            disabled=""
            className="btn btn-outline-primary bouton btn-seecreatingpost"
            value="Retour à tous les posts"
          />
        </div>

        <div className="container-btn-profile">
          <Button
            onClick={() => setModifyInfos(!modifyInfos)}
            disabled=""
            className="btn sub-sidebar-btn btn-outline-primary "
            value="Modifier vos informations générales"
          />
          <Button
            onClick={() => setModifyPassword(!modifyPassword)}
            disabled=""
            className="btn sub-sidebar-btn btn-light "
            value="Modifier votre mot de passe"
          />
          <Button
            // onClick={() => setDeleteProfile(!deleteProfile)}
            disabled=""
            className="btn sub-sidebar-btn btn-light "
            value="Supprimer votre profil"
          />
        </div>

        <div>
          {modifyInfos ? <Form updateUserInfos={true} /> : null}
          {modifyPassword ? <Form updateUserPassword={true} /> : null}

          <div className="profile-infos">
            <p className="infos-title">Prénom</p>
            <p> {auth.user.firstName}</p>
          </div>
          <div className="profile-infos">
            <p className="infos-title">Nom</p>
            <p> {auth.user.lastName}</p>
          </div>
          <div className="profile-infos">
            <p className="infos-title">Email</p>
            <p> {auth.user.email}</p>
            <p> {auth.user.active}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
