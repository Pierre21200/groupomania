import React, { useState, useEffect, useContext } from "react";
import {
  getComments,
  updateComment
} from "../../../Utils/FetchData/Comments/index";
import { Redirect } from "react-router-dom";
import User from "../../../SubComponents/User/index";
import Button from "../../../SubComponents/Button/index";
import { UserContext } from "../../../../App.js";
import decodedToken from "../../../Utils/DecodeToken/index";
import { postComments } from "../../../Utils/FetchData/Comments/index.js";
import Textarea from "../../../SubComponents/Textarea/index";
import Modal from "../../../SubComponents/Modal/index";

const Comments = ({ postId }) => {
  const token = localStorage.getItem("token");
  const auth = useContext(UserContext); // auth Context

  const [comments, setComments] = useState([]); // stock les commentaires
  const [majComment, setMajComment] = useState(false); // modération d'un post

  const [modalModerateComment, setModalModerateComment] = useState(false); // faire apparaitre création de poste

  const [redirectToLogin, setRedirectToLogin] = useState(false); // redirection si pas de token

  // Concernant comments
  const [dropdownComments, setDropdownComments] = useState(false); // faire apparaitre création de commentaire et commentaires
  const [commentContent, setCommentContent] = useState(""); // contenu du commentaire
  const [validCommentContent, setValidCommentContent] = useState(false); // regex contenu du commentaire

  const fetchComments = async () => {
    const result = await getComments(token, postId);
    if (result) {
      setComments(result.data.postComments);
    }
  };

  // gestion d'evenement de l'input
  const handleChangeCommentContent = event => {
    setCommentContent(event.target.value);
    setValidCommentContent(event.target.value !== "" ? true : false);
  };

  // Création d'un commentaire
  const creatingComment = async postId => {
    getRedirectToLogin();
    const decode = decodedToken();
    if (decode) {
      try {
        let userId = auth.user.id;
        await postComments(token, userId, postId, commentContent);
        setMajComment(!majComment);
        setCommentContent("");
        console.log("Le commentaire a bien été créé");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Votre session a expiré");
    }
  };

  // Modération d'un commentaire
  const moderateComment = async commentId => {
    await updateComment(token, commentId);
    setMajComment(!majComment);
    setModalModerateComment(false);
  };

  // redirection à la page de connexion si token inexistant ou expiré
  const getRedirectToLogin = () => {
    const decode = decodedToken();
    if (!decode) {
      setRedirectToLogin(true);
      auth.setUser(null);
    }
  };

  // gestion de dropdownComments
  const seeComments = postId => {
    if (dropdownComments === postId) {
      setDropdownComments(false);
    } else {
      setDropdownComments(postId);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [majComment]);

  return redirectToLogin ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : (
    <div>
      {modalModerateComment ? (
        <Modal
          sidebar={true}
          title="Suppression d'un commentaire"
          content="Vous êtes sur le point de supprimer un commentaire, êtes vous sur ?"
        />
      ) : null}
      <Button
        className="btn btn-outline-primary btn-see-comments"
        disabled=""
        value="Commentaires"
        onClick={() => seeComments(postId)}
      />
      {dropdownComments && dropdownComments === postId ? (
        <div>
          <div>
            <div>
              {comments.map(comment => (
                <div className="comment" id={comment.id} key={comment.id}>
                  <div className="comment-user">
                    <User id={comment.userId} />
                  </div>
                  <div className="comment-content">{comment.content}</div>
                  {auth?.user.moderator ? (
                    <div className="container-moderate">
                      <i
                        onClick={() => moderateComment(comment.id)}
                        className="btn-moderate-comment far fa-times-circle fa-2x"
                      ></i>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="comments row">
              <div className="col-9">
                <Textarea
                  className="input-newComment form-control"
                  name="Commenter ce post"
                  onChange={handleChangeCommentContent}
                  value={commentContent}
                />
              </div>

              <div className="col-3">
                <Button
                  className="btn btn-outline-primary btn-new-comment"
                  onClick={() => creatingComment(postId)}
                  disabled={validCommentContent ? "" : "disabled"}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Comments;
