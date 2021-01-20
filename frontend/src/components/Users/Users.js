import React, { useState, useEffect } from "react";
import fakeusers from "../../fakedata/users.json";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Users = ({ postId }) => {
  const [users, setUsers] = useState([]);
  let userPosts = fakeusers.filter(user => user.id === postId);

  const fetchData = async () => {
    setUsers(userPosts); // afficher l'utilisateur  d'un post
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {users.map(user => (
        <div id={user.id} key={user.id}>
          <p>{user.firstName}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
