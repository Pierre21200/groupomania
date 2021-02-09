import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ postId }) => {
  const token = localStorage.getItem("token");

  const [comments, setComments] = useState(null);

  const fetchData = async () => {
    const result = await axios(
      `http://localhost:4200/comments/post/${postId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setComments(result.data.postComments);
  };

  useEffect(() => {
    fetchData();
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
