import axios from "axios";

const URL = `${process.env.REACT_APP_API_URL}/posts/`;

export const getPosts = token => {
  const result = axios.get(`${URL}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return result;
};

export const postPost = (postTitle, postContent, token) => {
  const result = axios.post(
    `${URL}`,
    { title: postTitle, content: postContent },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return result;
};

// réservé modo
export const updatePost = (token, postId) => {
  const result = axios.put(
    `${URL}update`,
    { postId: postId },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return result;
};

// réservé modo
export const getUserPosts = (token, userId) => {
  const result = axios.get(`${URL}user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return result;
};
