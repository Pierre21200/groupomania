import axios from "axios";

const URL = `${process.env.REACT_APP_API_URL}/comments`;

export const getComments = (token, postId) => {
  const result = axios.get(`${URL}/post/${postId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return result;
};

export const postComments = (token, userId, postId, commentContent) => {
  const result = axios.post(
    `${URL}/create`,
    { userId, postId, commentContent },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return result;
};

export const updateComment = (token, commentId) => {
  const result = axios.put(
    `${URL}/update`,
    { commentId: commentId },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return result;
};
