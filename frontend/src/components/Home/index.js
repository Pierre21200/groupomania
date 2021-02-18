import React, { useContext } from "react";
import Input from "../Input/index.js";
import Sidebar from "../Sidebar/index.js";
import Posts from "..//Posts/index.js";
import { UserContext } from "../../App.js";

import "./Home.css";

const Home = () => {
  const auth = useContext(UserContext);

  return (
    <div className="home-container">
      <div className="section-container">
        <Posts />
      </div>

      <div className="row">
        <div className="sidebar-container col-2">
          <Sidebar />
        </div>

        <div className="container col-10">
          <header className="home-header">
            <p>{auth.user.firstName}</p>
            <Input name="Rechercher dans les posts" />
          </header>
        </div>
      </div>
    </div>
  );
};

export default Home;
