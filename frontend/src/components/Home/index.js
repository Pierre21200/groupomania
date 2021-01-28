import React, { useState, useEffect, useReducer } from "react";
import Input from "../Input/index.js";
import Sidebar from "../Sidebar/index.js";
import Posts from "..//Posts/index.js";
import Form from "..//Form/index.js";
import Button from "..//Button/index.js";

import axios from "axios";
import "./Home.css";
import { useParams } from "react-router-dom";

const Home = ({ section }) => {
  let params = useParams();

  const [posts, setPosts] = useState(true);
  const [createPost, setCreatePost] = useState(false);
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    // ${process.env.REACT_APP_API_URL}
    // const result = await axios(`http://localhost:4200/users/${params.userId}`);
    const result = await axios(`http://localhost:4200/users/${params.userId}`);

    setUser(result.data.userFound);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const seeCreatingPost = () => {
    setCreatePost(true);
    setPosts(false);
  };

  if (!user) {
    return <div>chargement</div>;
  }
  return (
    <div className="home-container">
      {posts ? (
        <div>
          <Posts />
        </div>
      ) : null}
      {createPost ? (
        <div>
          <Form createPost={true} />
        </div>
      ) : null}
      <div className="row">
        <div className="sidebar-container col-2">
          <Sidebar />
        </div>
        <div className="container col-10">
          <header className="home-header">
            <p>{user.firstName}</p>
            <Input name="Rechercher dans les posts" />
            <button onClick={seeCreatingPost}>Créer un nouveau post</button>
          </header>
          <div className="section-container">{section}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
