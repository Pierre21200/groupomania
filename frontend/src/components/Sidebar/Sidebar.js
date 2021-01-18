import React from "react";
import "./Sidebar.css";
import logo from "../../icons/icon-c.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-home">
        <img className="home-logo" src={logo} alt="groupomania-logo" />
        <h1>Groupomania</h1>
      </div>
      <div className="menu">
        <h2>Mon Profil</h2>
        <h2>Catégories</h2>
        <h2>Paramètres</h2>
        <h2>Deconnexion</h2>
      </div>
    </div>
  );
};

export default Sidebar;
