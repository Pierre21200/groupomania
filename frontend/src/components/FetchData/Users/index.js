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
  const result = axios.post(`${URL}/login`, {
    email,
    password
  });
  return result;
};

export const updateUser = (firstName, lastName, email, token) => {
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
