import React, { useContext } from "react";
import Input from "../Input/index.js";
import Sidebar from "../Sidebar/index.js";
import Posts from "..//Posts/index.js";
import { UserContext } from "../../App.js";
import "./Home.css";

const Home = ({ profile }) => {
  const auth = useContext(UserContext);
  return (
    <div className="home-container">
      <div className="section-container">
        {profile ? <Posts userPosts={true} /> : <Posts />}
      </div>

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
      </div>
    </div>
  );
};

export default Home;
