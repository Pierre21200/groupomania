import React, { useState, useEffect, useContext } from "react";
import Comments from "./Comments/index.js";
import Input from "../../SubComponents/Input/index";
import Textarea from "../../SubComponents/Textarea/index";
import User from "../../SubComponents/User/index";
import decodedToken from "../../Utils/DecodeToken/index";
import Button from "../../SubComponents/Button/index";
import Form from "../../SubComponents/Form/index";
import { deleteUser } from "../../Utils/FetchData/Users/index.js";
import Modal from "../../SubComponents/Modal/index.js";

import { UserContext } from "../../../App.js";
import {
  getPosts,
  postPost,
  updatePost,
  getUserPosts
} from "../../Utils/FetchData/Posts/index";
import { getUser, updateProfile } from "../../Utils/FetchData/Users/index";
import { Redirect, useParams } from "react-router-dom";

const Posts = ({ userProfile, myProfile }) => {
  const userId = useParams();

  const auth = useContext(UserContext); // auth Context

  const token = localStorage.getItem("token"); // token localStorage

  // if userProfile/myProfile is true
  const [user, setUser] = useState(""); // Stock les valeurs du user selectionné par le modérateur
  const [redirectToHome, setRedirectToHome] = useState(false);

  // Concernant redirection vers login
  const [redirectToLogin, setRedirectToLogin] = useState(false); // redirection si pas de token

  // Les posts qui apparaissent (deux possibiltié : tout les posts, ou les posts d'un seul utilisateur)
  const [posts, setPosts] = useState([]);

  // Concernant toutes les logiques pour déployer des fenêtres
  const [dropdownCreatePost, setDropdownCreatePost] = useState(false); // faire apparaitre création de poste
  const [dropdownUpdateProfile, setDropdownUpdateProfile] = useState(false);
  const [dropdownUpdateInfos, setDropdownUpdateInfos] = useState(false);
  const [dropdownUpdatePassword, setDropdownUpdatePassword] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);

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

  // get + set posts : deux options, userProfile est true or not
  const fetchPosts = async () => {
    if (userProfile) {
      const resultPosts = await getUserPosts(token, userId.id);
      const resultUser = await getUser(token, userId.id);
      setUser(resultUser.data.userFound);
      setPosts(resultPosts.data.allPosts);
      setProfile(false);
    } else if (myProfile) {
      const result = await getUserPosts(token, auth.user.id);
      setUser(auth.user);
      setPosts(result.data.allPosts);
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

  const logout = () => {
    localStorage.removeItem("token");
    setRedirectToLogin(true);
  };

  const confirmDeleteProfile = async () => {
    await deleteUser(token);
    logout();
  };

  // Fonction useEffect
  useEffect(() => {
    getRedirectToLogin();
    const decode = decodedToken();
    if (decode) {
      fetchPosts();
    }
  }, [majPost, userProfile, myProfile]);

  return redirectToLogin ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : profile ? (
    <Redirect to={{ pathname: `/profile/${profile}` }} />
  ) : redirectToHome ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <div className="container">
      {auth?.user.tuto ? <Modal infos={true} /> : null}
      {!userProfile && !myProfile ? (
        <Button
          onClick={() => setDropdownCreatePost(!dropdownCreatePost)}
          disabled=""
          className="btn btn-outline-primary bouton "
          value="Créer un post"
        />
      ) : null}

      {dropdownCreatePost ? (
        <div className="container-form-create-post">
          <Input
            type="text"
            name="Titre du post"
            onChange={handleChangePostTitle}
            value={postTitle}
          />
          <Textarea
            type="text"
            name="Contenu du post"
            onChange={handleChangePostContent}
            value={postContent}
          />
          <Button
            onClick={creatingPost}
            disabled=""
            className="btn btn-outline-primary btn-form"
          />
        </div>
      ) : null}

      {userProfile ? (
        <Button
          onClick={() => setRedirectToHome(true)}
          disabled=""
          className="btn btn-outline-primary bouton btn-seecreatingpost"
          value="Retour à tout les posts"
        />
      ) : null}

      {userProfile || myProfile ? (
        <div className="container-profile-form">
          {!dropdownUpdateInfos && !dropdownUpdatePassword && !deleteProfile ? (
            <div className="container-profile-infos">
              {auth.user.moderator ? (
                <div className="profile-infos">
                  <p className="infos-title">Identifiant</p>
                  <p> {user.id}</p>
                </div>
              ) : null}

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
          ) : (
            <div>
              {dropdownUpdateInfos ? <Form updateUserInfos={true} /> : null}
              {dropdownUpdatePassword ? (
                <Form updateUserPassword={true} />
              ) : null}
            </div>
          )}

          {myProfile ? (
            <div className="buttons-profile">
              <Button
                onClick={() => setDropdownUpdateInfos(!dropdownUpdateInfos)}
                disabled=""
                className="btn sub-sidebar-btn btn-outline-primary"
                value="Modifier vos informations générales"
              />
              <Button
                onClick={() =>
                  setDropdownUpdatePassword(!dropdownUpdatePassword)
                }
                disabled=""
                className="btn sub-sidebar-btn btn-outline-primary "
                value="Modifier votre mot de passe"
              />

              <Button
                onClick={logout}
                disabled=""
                className="btn sub-sidebar-btn btn-outline-primary "
                value="Deconnexion"
              />

              {myProfile && !auth.user.moderator ? (
                <Button
                  onClick={confirmDeleteProfile}
                  disabled=""
                  className="btn sub-sidebar-btn btn-outline-danger "
                  value="Supprimer le profil"
                />
              ) : null}
            </div>
          ) : null}

          {userProfile ? (
            <Button
              onClick={() => moderateProfile(userId.id)}
              disabled=""
              className="btn sub-sidebar-btn btn-outline-danger "
              value="Supprimer le profil"
            />
          ) : null}
        </div>
      ) : null}

      {posts.length > 0 ? (
        <div>
          {posts.map(post => (
            <div key={post.id} id={post.id} className="card">
              <div className="card-body">
                <div className="card-header row">
                  <h6 className="post-user col-4 col-12-xs">
                    {auth?.user.moderator &&
                    post.userId != auth.user.id &&
                    !userProfile ? (
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

                  <h6 className="post-title col-4 col-xs-12">
                    {post.titlePost}
                  </h6>

                  {auth?.user.moderator ? (
                    <div className="container-moderate">
                      <i
                        onClick={() => moderatePost(post.id)}
                        className="btn-moderate far fa-times-circle fa-2x"
                      ></i>
                    </div>
                  ) : null}
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
      ) : (
        <p className="msg-no-post">Vous n'avez créer aucun post</p>
      )}
    </div>
  );
};

export default Posts;
