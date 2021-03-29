import React, { useContext } from "react";
import Sidebar from "./Sidebar/index.js";
import Posts from "./Posts/index.js";
import Modal from "../SubComponents/Modal/index.js";

import { UserContext } from "../../App.js";

const Home = ({ profile }) => {
  const auth = useContext(UserContext);
  return (
    <div className="home-container">
      <div className="row">
        <div className="sidebar-container col-2">
          <Sidebar />
        </div>

        <div className="container col-10">
          <header className="home-header">
            <h2 className="homeTitle">
              Bonjour {auth.user.firstName}, bienvenue sur Groupomania !{" "}
            </h2>
          </header>
        </div>

        <div className="section-container">
          {auth?.user.moderator ? (
            <Modal infos={true} firstName={auth.user.firstName} />
          ) : null}
          {profile ? <Posts userPosts={true} /> : <Posts />}
        </div>
      </div>
    </div>
  );
};

export default Home;
