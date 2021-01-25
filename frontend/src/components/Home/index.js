import React, { useState, useEffect } from "react";
import Input from "../Input/index.js";
import Sidebar from "../Sidebar/index.js";
import Users from "../Users/index.js";

import "./Home.css";
import { useParams } from "react-router-dom";
const Home = ({ section }) => {
  // un composant qui vérifie le token et son expiration: useAuth nanani

  // un composant qui va récupérer les données utilisateurs grâce a id, quelque chose comme ça :
  // const thisUser = () => {
  //   let params = useParams();
  //   let user = fakeusers.filter(user => user.id === params);
  // };

  return (
    <div className="home-container">
      <div className="row">
        <div className="sidebar-container col-2">
          <Sidebar />
        </div>
        <div className="container col-10">
          <header className="input-container">
            {/* <Users /> */}
            <Input name="Voulez-vous poster quelque-chose ?" />
          </header>
          <div className="section-container">{section}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
