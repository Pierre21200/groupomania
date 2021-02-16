import React, { useState, useEffect } from "react";
import axios from "axios";
import { getComments, postComments } from "../FetchData/Comments/index";

const Comments = ({ postId, newComment }) => {
  const token = localStorage.getItem("token");
  const [comments, setComments] = useState(null);
  useEffect(async () => {
    const result = await getComments(token, postId);
    setComments(result.data.postComments);
  }, []);

  if (!comments) {
    return <div>Chargement</div>;
  }
  return (
    <div>
      {comments.map(comment => (
        <div id={comment.id} key={comment.id}>
          {comment.comm}
        </div>
      ))}
    </div>
  );
};

export default Comments;
