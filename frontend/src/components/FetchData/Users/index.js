import axios from "axios";

const URL = `${process.env.REACT_APP_API_URL}/users`;

export const signUser = (firstName, lastName, email, password) => {
  const result = axios.post(`${URL}/signup`, {
    firstName,
    lastName,
    email,
    password
  });
  return result;
};

export const logUser = (email, password) => {
  return axios.post(`${URL}/login`, {
    email,
    password
  });
};

export const updateUserData = (firstName, lastName, email, token) => {
  const result = axios.put(
    `${URL}/profile`,
    {
      firstName,
      lastName,
      email
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return result;
};

export const updatePassword = (password, newPassword, token) => {
  const result = axios.put(
    `${URL}/profile/password`,
    {
      password,
      newPassword
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return result;
};

export const deleteUser = token => {
  const result = axios.put(
    `${URL}/profile/inactive`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return result;
};

export const getUser = (token, id) => {
  const result = axios.get(`${URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return result;
};

// réservé modo
export const updateProfile = (token, id) => {
  const result = axios.put(
    `${URL}/update`,
    { id: id },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return result;
};
