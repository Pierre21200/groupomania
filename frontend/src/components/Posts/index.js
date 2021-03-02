import React, { useState, useEffect, useContext } from "react";
import Comments from "../Comments/index.js";
import Input from "../Input/index";
import User from "../User/index";
import decodedToken from "../DecodeToken/index";
import Button from "../Button/index";
import { UserContext } from "../../App.js";
import {
  getPosts,
  postPost,
  updatePost,
  getUserPosts
} from "../FetchData/Posts/index";
import { postComments } from "../FetchData/Comments/index.js";
import { Redirect } from "react-router-dom";
import "./Posts.css";

const Posts = ({ userPosts }) => {
  const auth = useContext(UserContext); // auth Context
  const token = localStorage.getItem("token"); // token localStorage

  // Concernant redirection vers login
  const [redirect, setRedirect] = useState(false); // redirection si pas de token

  // Les posts qui apparaissent (deux possibiltié : tout les posts, ou les posts d'un seul utilisateur)
  const [posts, setPosts] = useState([]);

  // Concernant toutes les logiques pour déployer des fenêtres
  const [showCreatingPost, setShowCreatingPost] = useState(false); // faire apparaitre création de poste
  const [showComments, setShowComments] = useState(false); // faire apparaitre création de commentaire et commentaires
  const [showModeratePost, setShowModeratePost] = useState(false); // faire apparaitre bouton de modération

  // Concernant posts
  const [newPost, setNewPost] = useState(null); // un nouveau post est créé
  const [postTitle, setPostTitle] = useState(""); // titre du post
  const [postContent, setPostContent] = useState(""); // contenu du post
  const [validPostTitle, setValidPostTitle] = useState(false); // regex titre du post
  const [validPostContent, setValidPostContent] = useState(false); // regex contenu du post
  const [majPost, setMajPost] = useState(false); // modération d'un post

  // Concernant comments
  const [newComment, setNewComment] = useState(""); // un nouveau commentaire est créé
  const [commentContent, setCommentContent] = useState(""); // contenu du commentaire
  const [validCommentContent, setValidCommentContent] = useState(false); // regex contenu du commentaire

  // Pour le modérateur, stock l'id de l'utilisateur que l'on veut visionner, puis passe cette valeur dans la props de posts
  const [profile, setProfile] = useState(false); //

  // gestion d'événements des inputs
  const handleChangeCommentContent = event => {
    setCommentContent(event.target.value);
    setValidCommentContent(event.target.value !== "" ? true : false);
  };
  const handleChangePostTitle = event => {
    setPostTitle(event.target.value);
    setValidPostTitle(event.target.value !== "" ? true : false);
  };
  const handleChangePostContent = event => {
    setPostContent(event.target.value);
    setValidPostContent(event.target.value !== "" ? true : false);
  };

  // On utilise cette fonction avant chaque reqûete vers le backend afin d'éviter une erreur serveur si token est expiré
  const getRedirect = () => {
    const decode = decodedToken();
    if (!decode) {
      setRedirect(true);
      auth.setUser(null);
    }
  };

  // get & set posts
  const getSetPosts = async () => {
    if (userPosts) {
      const result = await getUserPosts(token, userPosts);
      setPosts(result.data.allPosts);
    } else {
      const result = await getPosts(token);
      setPosts(result.data.allPosts);
    }
  };

  // Fait apparaître création de post
  const seeCreatingPost = () => {
    setShowCreatingPost(!showCreatingPost);
  };

  // Fait apparaitre commentaires et création de commentaires
  const seeComments = () => {
    setShowComments(!showComments);
  };

  // Création d'un commentaire
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

  // Création d'un post
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

  // Fait apparaitre demande de confirmation de modération d'un post
  const modalModeratePost = () => {
    setShowModeratePost(!showModeratePost);
  };

  // Modération d'un post
  const moderatePost = async postId => {
    const result = await updatePost(token, postId);
    setMajPost(!majPost);
    setShowModeratePost(!showModeratePost);
    console.log(result);
  };

  // Fonction useEffect
  useEffect(() => {
    getRedirect();
    const decode = decodedToken();
    if (decode) {
      getSetPosts();
    }
  }, [token, newPost, newComment, majPost]);

  return redirect ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : profile ? (
    // <Redirect to={{ pathname: `/profile/${profile}` }} />
    <Posts userPosts={profile} />
  ) : (
    <div>
      {!userPosts ? (
        <Button
          onClick={seeCreatingPost}
          disabled=""
          className="btn btn-outline-primary bouton"
          value="Créer un nouveau post"
        />
      ) : null}

      {showCreatingPost ? (
        <div id="createPostForm">
          <div className="card">
            <div className="card-body">
              <Input
                className="new-post-title form-control"
                value={postTitle}
                name="Titre du post"
                onChange={handleChangePostTitle}
              />
              <Input
                className="new-post-content form-control"
                value={postContent}
                name="Contenu du post"
                onChange={handleChangePostContent}
              />
              <Button
                onClick={creatingPost}
                disabled={validPostTitle && validPostContent ? "" : "disabled"}
                value="Envoyer"
              />
            </div>
          </div>
        </div>
      ) : null}

      {posts.map(post => (
        <div key={post.id} id={post.id} className="card">
          <div className="card-body">
            <div className="card-header row">
              <h6 className="post-user col-4">
                {auth?.user.moderator ? (
                  <Button
                    className="btn btn-outline-primary btn-post"
                    disabled=""
                    onClick={() => setProfile(post.userId)}
                    value={<User id={post.userId} />}
                  />
                ) : (
                  <User id={post.userId} />
                )}
              </h6>

              <h6 className="post-title col-4">{post.titlePost}</h6>

              {auth?.user.moderator ? (
                <div className="col-4 post-moderate">
                  <Button
                    className="btn btn-outline-primary btn-post"
                    disabled=""
                    value="Modérer"
                    onClick={modalModeratePost}
                  />
                </div>
              ) : null}

              {showModeratePost ? (
                <div className="confirm-moderate-post">
                  <p>
                    Vous êtes sur le point de supprimer ce post, êtes vous sur ?
                  </p>
                  <Button
                    disabled=""
                    value="Confirmer"
                    onClick={() => moderatePost(post.id)}
                  />
                </div>
              ) : null}
            </div>

            <div className="line"></div>

            <p className="post-content">Contenue du post : {post.content}</p>

            <div className="line"></div>

            <Button
              className="btn btn-outline-primary btn-see-comments"
              disabled=""
              value="Commentaires"
              onClick={seeComments}
            />

            {showComments ? (
              <div>
                <div>
                  <Comments postId={post.id} newComment={newComment} />
                </div>
                <div className="comments row">
                  <div className="col-9">
                    <Input
                      className="input-newComment form-control"
                      value={commentContent}
                      name="Commenter ce post"
                      onChange={handleChangeCommentContent}
                    />
                  </div>

                  <div className="col-3">
                    <Button
                      className="btn btn-outline-primary btn-new-comment"
                      onClick={() => creatingComment(post.id)}
                      disabled={validCommentContent ? "" : "disabled"}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
