import React, { useEffect, useState } from "react";
import { getUser } from "../FetchData/Users";

const User = ({ id }) => {
  const token = localStorage.getItem("token");
  const [postsUser, setPostsUser] = useState(null);

  const getSetUser = async () => {
    const result = await getUser(token, id);
    setPostsUser(result.data.userFound);
  };

  // useEffect(() => {
  //   getSetUser();
  // });
  getSetUser();

  return postsUser ? (
    <div className="user">
      {postsUser.firstName} {postsUser.lastName}
    </div>
  ) : (
    <div>Chargement</div>
  );
};

export default User;
