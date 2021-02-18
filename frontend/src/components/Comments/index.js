import React, { useState, useEffect } from "react";
import { getComments } from "../FetchData/Comments/index";

const Comments = ({ postId, newComment }) => {
  const token = localStorage.getItem("token");
  const [comments, setComments] = useState(null);

  const getSetComments = async () => {
    const result = await getComments(token, postId);
    setComments(result.data.postComments);
  };

  useEffect(() => {
    getSetComments();
  }, [comments, newComment]);

  return comments ? (
    <div>
      {comments.map(comment => (
        <div id={comment.id} key={comment.id}>
          {comment.comm}
        </div>
      ))}
    </div>
  ) : null;
};

export default Comments;
