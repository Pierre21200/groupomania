import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout/index.js";
import logo from "../../icons/icon-c.png";
import { UserContext } from "../../App.js";
import Button from "../SubComponents/Button/index.js";

const Home = ({ userProfile }) => {
  const auth = useContext(UserContext);
  const [myProfile, setMyProfile] = useState(null);

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
          {myProfile ? <Layout myProfile={true} /> : null}
          {userProfile ? <Layout userProfile={true} /> : null}
          {!userProfile && !myProfile ? <Layout /> : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
