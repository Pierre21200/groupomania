import React, { useEffect, useState } from "react";
import { getUser } from "../../Utils/FetchData/Users";

const User = ({ id }) => {
  const token = localStorage.getItem("token");
  const [postsUser, setPostsUser] = useState(null);

  const getSetUser = async () => {
    const result = await getUser(token, id);
    if (result) {
      setPostsUser(result.data.userFound);
    }
    console.log("non");
  };

  useEffect(() => {
    getSetUser();
  });

  return postsUser ? (
    <div className="user">
      {postsUser.firstName} {postsUser.lastName}
    </div>
  ) : (
    <div>Chargement</div>
  );
};

export default User;
