import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const result = await axios(`http://localhost:4200/comments/post/${postId}`);
    setComments(result.data.postComments);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
