import React, { useState, useEffect } from "react";
import fakeusers from "../../fakedata/users.json";

const Users = ({ postId, commentId }) => {
  const [users, setUsers] = useState([]);
  let userPosts = fakeusers.filter(user => user.id === postId);
  let userComments = fakeusers.filter(user => user.id === commentId);

  const fetchData = async () => {
    if (postId) {
      setUsers(userPosts); // afficher l'utilisateur  d'un post
    } else if (commentId) {
      setUsers(userComments); // afficher l'utilisateur d'un commentaire
    } else {
      setUsers(fakeusers); // afficher tout les utilisateurs
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {users.map(user => (
        <div id={user.id} key={user.id}>
          {user.firstName}
        </div>
      ))}
    </div>
  );
};

export default Users;
