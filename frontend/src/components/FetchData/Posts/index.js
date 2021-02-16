import axios from "axios";

const URL = `${process.env.REACT_APP_API_URL}/posts/`;
// const token = localStorage.getItem("token");

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

// pas lié pour le moment car modo
export const getProfile = token => {
  const result = axios.post(`${URL}:id`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return result;
};
