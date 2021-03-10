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
import { getUser, updateProfile } from "../FetchData/Users/index";
import { Redirect, useParams } from "react-router-dom";
import "./Posts.css";

const Posts = ({ userPosts }) => {
  const userId = useParams();
  const auth = useContext(UserContext); // auth Context
  const token = localStorage.getItem("token"); // token localStorage

  const [user, setUser] = useState("");

  const [redirectToHome, setRedirectToHome] = useState(false);

  // Concernant redirection vers login
  const [redirectToLogin, setRedirectToLogin] = useState(false); // redirection si pas de token

  // Les posts qui apparaissent (deux possibiltié : tout les posts, ou les posts d'un seul utilisateur)
  const [posts, setPosts] = useState([]);

  // Concernant toutes les logiques pour déployer des fenêtres
  const [showCreatingPost, setShowCreatingPost] = useState(false); // faire apparaitre création de poste
  // const [showComments, setShowComments] = useState(false); // faire apparaitre création de commentaire et commentaires
  const [showModeratePost, setShowModeratePost] = useState(false); // faire apparaitre bouton de modération
  const [showModerateProfile, setShowModerateProfile] = useState(false); // faire apparaitre bouton de modération

  // Concernant posts
  const [newPost, setNewPost] = useState(null); // un nouveau post est créé
  const [postTitle, setPostTitle] = useState(""); // titre du post
  const [postContent, setPostContent] = useState(""); // contenu du post
  const [validPostTitle, setValidPostTitle] = useState(false); // regex titre du post
  const [validPostContent, setValidPostContent] = useState(false); // regex contenu du post
  const [majPost, setMajPost] = useState(false); // modération d'un post

  // Pour le modérateur, stock l'id de l'utilisateur que l'on veut visionner, puis passe cette valeur dans la props de posts
  const [profile, setProfile] = useState(false); //

  // gestion d'événements des inputs
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
      setRedirectToLogin(true);
      auth.setUser(null);
    }
  };

  // get & set posts
  const getSetPosts = async () => {
    if (userPosts) {
      const resultPosts = await getUserPosts(token, userId.id);
      const resultUser = await getUser(token, userId.id);
      setUser(resultUser.data.userFound);
      setPosts(resultPosts.data.allPosts);
    } else {
      const result = await getPosts(token);
      setPosts(result.data.allPosts);
    }
  };

  // Fait apparaître création de post
  const seeCreatingPost = () => {
    setShowCreatingPost(!showCreatingPost);
  };

  const creatingPost = async () => {
    getRedirect();
    const decode = decodedToken();
    if (decode) {
      try {
        const result = await postPost(postTitle, postContent, token);
        setNewPost(result.data.newPost);
        // il y a surement mieux à faire
        setPostTitle("");
        setPostContent("");
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
    setNewPost(true);
    setShowModeratePost(!showModeratePost);
  };

  const modalModerateProfile = () => {
    setShowModerateProfile(!showModerateProfile);
  };

  // Modération d'un post
  const moderateProfile = async userId => {
    const result = await updateProfile(token, userId);
  };

  // Fonction useEffect
  useEffect(() => {
    getRedirect();
    const decode = decodedToken();
    if (decode) {
      getSetPosts();
    }
  }, [newPost]);

  return redirectToLogin ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : profile ? (
    <Redirect to={{ pathname: `/profile/${profile}` }} />
  ) : redirectToHome ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <div>
      {!userPosts ? (
        <Button
          onClick={seeCreatingPost}
          disabled=""
          className="btn btn-outline-primary bouton btn-seecreatingpost"
          value="Créer un nouveau post"
        />
      ) : (
        <div>
          <div>
            <Button
              onClick={() => setRedirectToHome(true)}
              disabled=""
              className="btn btn-outline-primary bouton btn-seecreatingpost"
              value="Retour à tous les posts"
            />
          </div>
          <div className="profile">
            <div className="profile-infos">
              <p className="infos-title">Identifiant</p>
              <p> {user.id}</p>
            </div>
            <div className="profile-infos">
              <p className="infos-title">Prénom</p>
              <p> {user.firstName}</p>
            </div>
            <div className="profile-infos">
              <p className="infos-title">Nom</p>
              <p> {user.lastName}</p>
            </div>
            <div className="profile-infos">
              <p className="infos-title">Email</p>
              <p> {user.email}</p>
            </div>
            <div>
              <Button
                onClick={modalModerateProfile}
                disabled=""
                className="btn btn-outline-primary bouton btn-moderate-profile"
                value="Modérer"
              />
            </div>
          </div>
        </div>
      )}

      {showModerateProfile ? (
        <div>
          Vous êtes sur le point de supprimer ce profil, êtes vous sur ?
          <Button
            onClick={() => moderateProfile(userId.id)}
            disabled=""
            className="btn btn-outline-primary bouton btn-seecreatingpost"
            value="Confirmer"
          />
        </div>
      ) : null}

      {showCreatingPost ? (
        <div id="createPostForm">
          <div className="card">
            <div className="card-body">
              <Input
                className="new-post-title form-control"
                name="Titre du post"
                onChange={handleChangePostTitle}
                value={postTitle}
              />
              <Input
                className="new-post-content form-control"
                name="Contenu du post"
                onChange={handleChangePostContent}
                value={postContent}
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

            <div>
              <Comments postId={post.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
