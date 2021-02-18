import React, { useState, useEffect, useContext } from "react";
import Comments from "../Comments/index.js";
import Input from "../Input/index";
import { UserContext } from "../../App.js";
import decodedToken from "../DecodeToken/index";
import Button from "../Button/index";
import "./Posts.css";
import { getPosts, postPost, updatePost } from "../FetchData/Posts/index";
import { postComments } from "../FetchData/Comments/index.js";
import { Redirect } from "react-router-dom";

const Posts = () => {
  const auth = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [showCreatingPost, setShowCreatingPost] = useState(false);
  const [newPost, setNewPost] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [validComm, setValidComm] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChangeCommentContent = event => {
    setCommentContent(event.target.value);
    setValidComm(event.target.value !== "" ? true : false);
  };
  const handleChangePostTitle = event => {
    setPostTitle(event.target.value);
  };
  const handleChangePostContent = event => {
    setPostContent(event.target.value);
  };

  const getSetPosts = async () => {
    const result = await getPosts(token);
    setPosts(result.data.allPosts);
  };

  const getRedirect = () => {
    const decode = decodedToken();
    if (!decode) {
      setRedirect(true);
      auth.setUser(null);
    }
  };

  useEffect(() => {
    getRedirect();
    const decode = decodedToken();
    if (decode) {
      getSetPosts();
    }
  }, [token, newPost, newComment]);

  const creatingComment = async postId => {
    getRedirect();
    const decode = decodedToken();
    if (decode) {
      try {
        let userId = auth.user.id;
        const result = await postComments(
          token,
          userId,
          postId,
          commentContent
        );
        setNewComment(result.data.newComment);
        console.log("Le commentaire a bien été créé");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Votre session a expiré");
    }
  };

  const creatingPost = async () => {
    getRedirect();
    const decode = decodedToken();
    if (decode) {
      try {
        const result = await postPost(postTitle, postContent, token);
        setNewPost(result.data.newPost);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Votre session a expiré");
    }
  };

  const seeCreatingPost = () => {
    setShowCreatingPost(!showCreatingPost);
  };

  const moderate = postId => {
    updatePost(token, postId);
  };

  return redirect ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : (
    <div>
      <Button
        onClick={seeCreatingPost}
        disabled=""
        className="btn btn-outline-primary bouton"
        value="Créer un nouveau post"
      />
      {showCreatingPost ? (
        <div id="createPostForm">
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
      ) : null}

      {posts.map(post => (
        <div key={post.id} id={post.id} className="card">
          <div className="card-body">
            <div className="card-header">
              <h6 className="card-title mb-2 text-muted">
                Utilisateur : {auth.user.firstName}
                <br />
                20/06/2021
              </h6>
              {/* <h6 className="card-date">20/06/2021</h6> */}
              {auth?.user.moderator ? (
                <Button
                  disabled=""
                  value="Modérer"
                  onClick={() => moderate(post.id)}
                />
              ) : null}
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
