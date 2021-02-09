import React, { useState, useEffect, useContext } from "react";
import Comments from "../Comments/index.js";
import Users from "../Users/index.js";
import Input from "../Input/index";
import Form from "../Form/index";
import UserContext from "../UserContext/index.js";

import Button from "../Button/index";
import "./Posts.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Posts = () => {
  const auth = useContext(UserContext);
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("none");

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const [comm, setComm] = useState("");
  const [validComm, setValidComm] = useState(false);

  function handleChangeComm(event) {
    setComm(event.target.value);
    setValidComm(event.target.value !== "" ? true : false);
  }

  function handleChangePostTitle(event) {
    setPostTitle(event.target.value);
  }

  function handleChangePostContent(event) {
    setPostContent(event.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4200/posts/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      // const result = await axios(
      //   `${process.env.REACT_APP_API_URL}/posts/allposts`
      // );

      setPosts(result.data.allPosts);
    };
    fetchData();
  }, []);

  const creatingComment = async postId => {
    try {
      let userId = auth.user.id;
      let result = await axios.post(
        `http://localhost:4200/comments/create`,
        {
          userId,
          postId,
          comm
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Le commentaire a bien été créé");
    } catch (error) {
      console.log(error);
    }
  };

  const creatingPost = async () => {
    try {
      let result = await axios.post(
        `http://localhost:4200/posts/`,
        {
          title: postTitle,
          content: postContent
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Le post a bien été créé");
    } catch (error) {
      console.log(error);
    }
  };

  if (!posts) {
    return <div>Chargement</div>;
  }

  const seeCreatingPost = () => {
    if (newPost === "none") {
      console.log("oui");
      setNewPost("block");
    } else {
      console.log("non");
      setNewPost("none");
    }
    if (newPost === "none") {
      setNewPost("block");
    }
  };

  return (
    <div>
      <Button
        onClick={seeCreatingPost}
        disabled=""
        className="btn btn-outline-primary bouton"
        value="Créer un nouveau post"
      />
      <div id="createPostForm" style={{ display: newPost }}>
        <div className="card">
          <div className="card-body">
            <Input
              className="post-title"
              type="text"
              value={postTitle}
              name="post-title"
              onChange={handleChangePostTitle}
            />
            <Input
              className="post-content"
              type="text"
              value={postContent}
              name="post-content"
              onChange={handleChangePostContent}
            />
            <Button
              onClick={creatingPost}
              disabled=""
              className="btn btn-outline-primary bouton"
              value="Envoyer"
            />
          </div>
        </div>
      </div>
      {posts.map(post => (
        <div key={post.id} className="card">
          <div className="card-body">
            <h6 className="card-title mb-2 text-muted">
              Utilisateur : {auth.user.firstName}
            </h6>
            <h6 className="card-date">20/06/2021</h6>
            <h6 className="card-subtitle"> Titre du post : {post.titlePost}</h6>
            <p className="card-text">Contenu du post : {post.content}</p>

            <div className="line"></div>
            <div className="like">
              <Button disabled="" value="J'aime"></Button>
            </div>
            <div className="commenter">
              <Input
                className="input-comm"
                type="text"
                value={comm}
                name="commenter"
                onChange={handleChangeComm}
              ></Input>
              <Button
                className="btn btn-outline-primary btn-comm"
                onClick={() => creatingComment(post.id)}
                disabled={validComm ? "" : "disabled"}
              />
            </div>

            <div>
              Commentaires du post : <Comments postId={post.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
