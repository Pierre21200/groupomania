import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar/index.js";
import Posts from "./Posts/index.js";
import Modal from "../SubComponents/Modal/index.js";
import logo from "../../icons/icon-c.png";
import { UserContext } from "../../App.js";
import Button from "../SubComponents/Button/index.js";
import { Redirect } from "react-router";

const Home = ({ userProfile }) => {
  const auth = useContext(UserContext);
  const [myProfile, setMyProfile] = useState(null);

  console.log(userProfile, myProfile);

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="logo-home laptop">
          <img className="home-logo" src={logo} alt="groupomania-logo" />
        </div>

        <div className="welcome-home laptop">
          <p className="welcome-title">
            Bonjour {auth.user.firstName}, bienvenue sur Groupomania !
          </p>
        </div>

        <div className="welcome-home mobile">
          <p className="welcome-title">Groupomania</p>
          {!userProfile && !myProfile ? (
            <Button
              onClick={() => setMyProfile(auth.user.id)}
              disabled=""
              className="btn navbar-btn btn-outline-light "
              value="Mon Profil"
            />
          ) : null}

          {userProfile ? (
            <Button
              onClick={() => setMyProfile(null)}
              disabled="disabled"
              className="btn navbar-btn btn-outline-light "
              value="Retour aux posts"
            />
          ) : null}

          {myProfile ? (
            <Button
              onClick={() => setMyProfile(null)}
              disabled=""
              className="btn navbar-btn btn-outline-light "
              value="Retour aux posts"
            />
          ) : null}
          {/* {myProfile ? (
            <Button
              onClick={() => setMyProfile(null)}
              disabled=""
              className="btn sidebar-btn btn-light "
              value="Retour aux posts"
            />
          ) : (
            <Button
              onClick={() => setMyProfile(auth.user.id)}
              disabled=""
              className="btn sidebar-btn btn-light "
              value="Mon Profil"
            />
          )} */}
        </div>
      </div>

      <div className="container">
        <div className="sidebar-container laptop">
          <div className="sidebar">
            {!userProfile && !myProfile ? (
              <Button
                onClick={() => setMyProfile(auth.user.id)}
                disabled=""
                className="btn sidebar-btn btn-outline-light "
                value="Mon Profil"
              />
            ) : null}

            {userProfile ? (
              <Button
                onClick={() => setMyProfile(null)}
                disabled="disabled"
                className="btn sidebar-btn btn-outline-light "
                value="Retour aux posts"
              />
            ) : null}

            {myProfile ? (
              <Button
                onClick={() => setMyProfile(null)}
                disabled=""
                className="btn sidebar-btn btn-outline-light "
                value="Retour aux posts"
              />
            ) : null}
          </div>
        </div>

        <div className="section-container">
          {auth?.user.moderator ? <Modal infos={true} /> : null}
          {myProfile ? <Posts myProfile={true} /> : null}
          {userProfile ? <Posts userProfile={true} /> : null}
          {!userProfile && !myProfile ? <Posts /> : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
