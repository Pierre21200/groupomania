import React, { useState, useEffect, useContext } from "react";
import Comments from "../Comments/index.js";
import Input from "../Input/index";
import { UserContext } from "../../App.js";
import decodedToken from "../DecodeToken/index";
import Button from "../Button/index";
import "./Posts.css";
import { getPosts, postPost } from "../FetchData/Posts/index";
import { postComments } from "../FetchData/Comments/index.js";

const Posts = () => {
  const auth = useContext(UserContext);
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [displayNewPost, setDisplayNewPost] = useState("none"); // concerne le dropdow newPost, à nettoyer
  const [newPost, setNewPost] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [validComm, setValidComm] = useState(false);

  function handleChangeCommentContent(event) {
    setCommentContent(event.target.value);
    setValidComm(event.target.value !== "" ? true : false);
  }

  function handleChangePostTitle(event) {
    setPostTitle(event.target.value);
  }

  function handleChangePostContent(event) {
    setPostContent(event.target.value);
  }

  useEffect(async () => {
    if (!token) {
      <div>Chargement</div>;
    } else {
      const result = await getPosts(token);
      setPosts(result.data.allPosts);
    }
  }, [token, newPost]);

  const creatingComment = async postId => {
    decodedToken(); // fonctionnelle sauf redirection

    // le problème est qu'un rendu est bien activé, même de <Comments/>, mais les comms ne sont pas mis à jour : décalage avec result ?
    try {
      let userId = auth.user.id;
      const result = await postComments(token, userId, postId, commentContent);
      setNewComment(result.data.newComment);
      console.log("Le commentaire a bien été créé");
    } catch (error) {
      console.log(error);
    }
  };

  const creatingPost = async () => {
    try {
      const result = await postPost(postTitle, postContent, token);
      setNewPost(result.data.newPost);
    } catch (error) {
      console.log(error);
    }
  };

  if (!posts) {
    return <div>Chargement</div>;
  }

  const seeCreatingPost = () => {
    if (displayNewPost === "none") {
      setDisplayNewPost("block");
    } else {
      setDisplayNewPost("none");
    }
    if (displayNewPost === "none") {
      setDisplayNewPost("block");
    }
  };

  return (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>

      <Button
        onClick={seeCreatingPost}
        disabled=""
        className="btn btn-outline-primary bouton"
        value="Créer un nouveau post"
      />
      <div id="createPostForm" style={{ display: displayNewPost }}>
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
        <div key={post.id} id={post.id} className="card">
          <div className="card-body">
            <div className="card-header">
              <h6 className="card-title mb-2 text-muted">
                Utilisateur : {auth.user.firstName}
              </h6>
              <h6 className="card-date">20/06/2021</h6>
              {/* {auth.user.moderator ? <div>Modo</div> : null}  */}
              {/* donc ici on va ajouter un bouton qui va permettre la modération */}
            </div>

            <h6 className="card-subtitle"> Titre du post : {post.titlePost}</h6>
            <p className="card-text">Contenu du post : {post.content}</p>

            <div className="line"></div>
            <div className="like">
              <Button disabled="" value="J'aime"></Button>
            </div>
            <div className="commenter">
              <Input
                className="input-newComment"
                type="text"
                value={commentContent}
                name="commenter"
                onChange={handleChangeCommentContent}
              ></Input>
              <Button
                className="btn btn-outline-primary btn-newComment"
                onClick={() => creatingComment(post.id)}
                disabled={validComm ? "" : "disabled"}
              />
            </div>

            <div>
              Commentaires du post :{" "}
              <Comments postId={post.id} newComment={newComment} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
