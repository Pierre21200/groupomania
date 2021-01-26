import React, { useState, useEffect } from "react";
import Input from "../Input/index.js";
import Sidebar from "../Sidebar/index.js";
import axios from "axios";
import "./Home.css";
import { useParams } from "react-router-dom";

const Home = ({ section }) => {
  const [user, setUser] = useState([]);
  let params = useParams();

  const fetchData = async () => {
    const result = await axios(`http://localhost:4200/users/${params.userId}`);
    setUser(result.data.userFound);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="home-container">
      <div className="row">
        <div className="sidebar-container col-2">
          <Sidebar />
        </div>
        <div className="container col-10">
          <header className="home-header">
            <p>{user.firstName}</p>
            <Input name="Rechercher dans les posts" />
            <button>
              <a
                href={`http://localhost:3000/home/${params.userId}/createPost`}
              >
                Créer un nouveau post
              </a>
            </button>
          </header>
          <div className="section-container">{section}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
