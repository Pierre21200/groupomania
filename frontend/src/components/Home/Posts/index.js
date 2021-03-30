import React, { useState, useEffect, useContext } from "react";
import Comments from "./Comments/index.js";
import Input from "../../SubComponents/Input/index";
import Textarea from "../../SubComponents/Textarea/index";
import User from "../../SubComponents/User/index";
import decodedToken from "../../Utils/DecodeToken/index";
import Button from "../../SubComponents/Button/index";
import { UserContext } from "../../../App.js";
import {
  getPosts,
  postPost,
  updatePost,
  getUserPosts
} from "../../Utils/FetchData/Posts/index";
import { getUser, updateProfile } from "../../Utils/FetchData/Users/index";
import { Redirect, useParams } from "react-router-dom";

const Posts = ({ userPosts }) => {
  const userId = useParams();
  const auth = useContext(UserContext); // auth Context
  const token = localStorage.getItem("token"); // token localStorage

  // if userPosts is true
  const [user, setUser] = useState(""); // Stock les valeurs du user selectionné par le modérateur
  const [redirectToHome, setRedirectToHome] = useState(false); // if userPosts est true

  // Concernant redirection vers login
  const [redirectToLogin, setRedirectToLogin] = useState(false); // redirection si pas de token

  // Les posts qui apparaissent (deux possibiltié : tout les posts, ou les posts d'un seul utilisateur)
  const [posts, setPosts] = useState([]);

  // Concernant toutes les logiques pour déployer des fenêtres
  const [dropdownCreatePost, setDropdownCreatePost] = useState(false); // faire apparaitre création de poste

  // Concernant posts
  const [postTitle, setPostTitle] = useState(""); // titre du post
  const [postContent, setPostContent] = useState(""); // contenu du post
  const [validPostTitle, setValidPostTitle] = useState(false); // regex titre du post
  const [validPostContent, setValidPostContent] = useState(false); // regex contenu du post
  const [majPost, setMajPost] = useState(false); // ajout ou modération d'un post

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
  const getRedirectToLogin = () => {
    const decode = decodedToken();
    if (!decode) {
      setRedirectToLogin(true);
      auth.setUser(null);
    }
  };

  // get + set posts : deux options, userPosts est true or not
  const fetchPosts = async () => {
    if (userPosts) {
      const resultPosts = await getUserPosts(token, userId.id);
      const resultUser = await getUser(token, userId.id);
      setUser(resultUser.data.userFound);
      setPosts(resultPosts.data.allPosts);
      setProfile(false);
    } else {
      const result = await getPosts(token);
      setPosts(result.data.allPosts);
      setRedirectToHome(false);
    }
  };

  // Création d'un post
  const creatingPost = async () => {
    getRedirectToLogin();
    const decode = decodedToken();
    if (decode) {
      try {
        await postPost(postTitle, postContent, token);
        setMajPost(!majPost);
        setPostTitle("");
        setPostContent("");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Votre session a expiré");
    }
  };

  // Modération d'un post
  const moderatePost = async postId => {
    await updatePost(token, postId);
    setMajPost(true);
  };

  // Modération d'un profil en tant que modérator
  const moderateProfile = async userId => {
    await updateProfile(token, userId);
    setRedirectToHome(true);
  };

  // Fonction useEffect
  useEffect(() => {
    getRedirectToLogin();
    const decode = decodedToken();
    if (decode) {
      fetchPosts();
    }
  }, [majPost, userPosts]);

  return redirectToLogin ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : profile ? (
    <Redirect to={{ pathname: `/profile/${profile}` }} />
  ) : redirectToHome ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <div>
      {!userPosts ? (
        <div>
          {" "}
          <Button
            onClick={() => setDropdownCreatePost(!dropdownCreatePost)}
            disabled=""
            className="btn btn-outline-primary bouton btn-seecreatingpost"
            value="Créer un nouveau post"
          />
        </div>
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
            <div className="container-moderate">
              <i
                onClick={() => moderateProfile(userId.id)}
                className="btn-moderate far fa-times-circle fa-2x"
              ></i>
            </div>
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
              <p> {user.active}</p>
            </div>
          </div>
        </div>
      )}

      {dropdownCreatePost ? (
        <div id="createPostForm">
          <div className="card">
            <div className="card-body">
              <Input
                className="new-post-title form-control"
                name="Titre du post"
                onChange={handleChangePostTitle}
                value={postTitle}
              />
              <Textarea
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
                {auth?.user.moderator && !userPosts ? (
                  <Button
                    className="btn btn-outline-primary btn-post"
                    disabled=""
                    onClick={() => setProfile(post.userId)}
                    value={<User id={post.userId} />}
                  />
                ) : (
                  <div>{<User id={post.userId} />}</div>
                )}
              </h6>
              <h6 className="post-title col-4">{post.titlePost}</h6>
              {auth?.user.moderator ? (
                <div className="col-4 container-moderate">
                  <i
                    onClick={() => moderatePost(post.id)}
                    className="btn-moderate far fa-times-circle fa-2x"
                  ></i>
                </div>
              ) : (
                <div className="col-4"></div>
              )}
            </div>

            <div className="line"></div>

            <p className="post-content">{post.content}</p>

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
