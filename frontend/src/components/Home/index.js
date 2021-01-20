import React, { useState, useEffect } from "react";
import Input from "../Input/index.js";
import Sidebar from "../Sidebar/index.js";
import "./Home.css";

const Home = ({ section }) => {
  return (
    <div className="home-container">
      <div className="row">
        <div className="sidebar-container col-2">
          <Sidebar />
        </div>
        <div className="container col-10">
          <header className="input-container">
            <Input name="Voulez-vous poster quelque-chose ?" />
          </header>
          <div className="section-container">{section}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
