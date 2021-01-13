import React, { useState, useEffect } from "react";
import fakecomments from "../../fakedata/comments.json";

const Comments = ({ postId, userId }) => {
  const [comments, setComments] = useState([]);
  let commentsPost = fakecomments.filter(comment => comment.postId === postId);
  let commentsUser = fakecomments.filter(comment => comment.userId === userId);

  const fetchData = async () => {
    if (postId) {
      setComments(commentsPost); // afficher les comments propres a un post
    } else if (userId) {
      setComments(commentsUser); // afficher les commentaires propres a un utilisateur
    } else {
      setComments(fakecomments); // afficher tout les comments
    }
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
