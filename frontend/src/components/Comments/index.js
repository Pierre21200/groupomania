import React, { useState, useEffect, useContext } from "react";
import { getComments, updateComment } from "../FetchData/Comments/index";
import User from "../User/index";
import Button from "../Button/index";
import { UserContext } from "../../App.js";

const Comments = ({ postId, newComment }) => {
  const token = localStorage.getItem("token");
  const auth = useContext(UserContext); // auth Context
  const [comments, setComments] = useState(null);
  const [majComment, setMajComment] = useState(false); // modération d'un post
  const [showModerateComment, setShowModerateComment] = useState(false); // faire apparaitre création de poste

  const getSetComments = async () => {
    const result = await getComments(token, postId);
    if (result) {
      setComments(result.data.postComments);
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

  useEffect(() => {
    getSetComments();
  }, [comments, newComment, majComment]);

  return !comments ? (
    <div>Chargement</div>
  ) : comments.length === 0 ? (
    <p className="msg-no-comment">
      Il n'y a pas encore de commentaires pour ce post
    </p>
  ) : (
    <div>
      {comments.map(comment => (
        <div className="comment" id={comment.id} key={comment.id}>
          <div className="comment-user">
            <User id={comment.userId} />{" "}
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
                Vous êtes sur le point de supprimer ce commentaire, êtes vous
                sur ?
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
  );
};

export default Comments;
