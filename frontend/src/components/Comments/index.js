import React, { useState, useEffect, useContext } from "react";
import { getComments, updateComment } from "../FetchData/Comments/index";
import User from "../User/index";
import Button from "../Button/index";
import { UserContext } from "../../App.js";
import decodedToken from "../DecodeToken/index";
import { postComments } from "../FetchData/Comments/index.js";
import Input from "../Input/index";

const Comments = ({ postId }) => {
  const token = localStorage.getItem("token");
  const auth = useContext(UserContext); // auth Context
  const [comments, setComments] = useState(null);
  const [majComment, setMajComment] = useState(false); // modération d'un post
  const [showModerateComment, setShowModerateComment] = useState(false); // faire apparaitre création de poste

  const [redirect, setRedirect] = useState(false); // redirection si pas de token

  // Concernant comments
  const [showComments, setShowComments] = useState(false); // faire apparaitre création de commentaire et commentaires
  const [newComment, setNewComment] = useState(""); // un nouveau commentaire est créé
  const [commentContent, setCommentContent] = useState(""); // contenu du commentaire
  const [validCommentContent, setValidCommentContent] = useState(false); // regex contenu du commentaire

  const getSetComments = async () => {
    const result = await getComments(token, postId);
    if (result) {
      setComments(result.data.postComments);
    }
  };

  const handleChangeCommentContent = event => {
    setCommentContent(event.target.value);
    setValidCommentContent(event.target.value !== "" ? true : false);
  };

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

  const modalModerateComment = () => {
    setShowModerateComment(!showModerateComment);
  };

  const moderateComment = async commentId => {
    const result = await updateComment(token, commentId);
    setMajComment(!majComment);
    setShowModerateComment(!showModerateComment);
    console.log(result);
  };

  const getRedirect = () => {
    const decode = decodedToken();
    if (!decode) {
      setRedirect(true);
      auth.setUser(null);
    }
  };

  const seeComments = postId => {
    if (showComments === postId) {
      setShowComments(false);
    } else {
      setShowComments(postId);
    }
  };

  useEffect(() => {
    getSetComments();
  }, [comments, newComment, majComment]);

  return (
    <div>
      <Button
        className="btn btn-outline-primary btn-see-comments"
        disabled=""
        value="Commentaires"
        onClick={() => seeComments(postId)}
      />
      {showComments && showComments === postId ? (
        <div>
          <div>
            <div>
              {comments.map(comment => (
                <div className="comment" id={comment.id} key={comment.id}>
                  <div className="comment-user">
                    <User id={comment.userId} />
                  </div>
                  <div>{comment.comm}</div>
                  {auth?.user.moderator ? (
                    <div>
                      <Button
                        className="btn btn-outline-primary btn-moderate-comment"
                        disabled=""
                        value="Modérer"
                        onClick={modalModerateComment}
                      />
                    </div>
                  ) : null}

                  {showModerateComment ? (
                    <div>
                      <p>
                        Vous êtes sur le point de supprimer ce commentaire, êtes
                        vous sur ?
                      </p>
                      <Button
                        disabled=""
                        value="Confirmer"
                        onClick={() => moderateComment(comment.id)}
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="comments row">
              <div className="col-9">
                <Input
                  className="input-newComment form-control"
                  name="Commenter ce post"
                  onChange={handleChangeCommentContent}
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
