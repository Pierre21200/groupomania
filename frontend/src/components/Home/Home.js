import React, { useState, useEffect } from "react";
import Input from "../Input/Input.js";
import Sidebar from "../Sidebar/Sidebar.js";
import "./Home.css";

const Home = ({ section }) => {
  return (
    <div className="home">
      <header className="row">
        <div className="logo-home col-2">
          <h1>Groupomania</h1>
        </div>
        <div className="input-container col-10">
          <Input />
        </div>
      </header>
      <section className="row">
        <div className="sidebar-container col-2">
          <Sidebar />
        </div>
        <div className="posts-container col-10">{section}</div>
      </section>
    </div>
  );
};

export default Home;

// quel est le meilleur moyen d'allé chercher l'utilisateur associé au post, et les comms
// créer un component comment avec une props postId
// CSS par composant, avec des trucs général, puis on change la className en fonction de la page ou il se trouve
