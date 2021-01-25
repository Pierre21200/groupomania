import React, { useState, useEffect } from "react";
import fakeusers from "../../fakedata/users.json";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

const Users = ({ postId }) => {
  // soit tu lui fournis la props et il t'envoie l'utilisateur du post

  const [users, setUsers] = useState([]);

  // soit tu récupères avec composant thisUser
  // const result = axios("http://localhost:4200/users");
  const fetchData = async () => {
    if (postId) {
      let userPosts = fakeusers.filter(user => user.id === postId);
      setUsers(userPosts);
    }
    console.log("coucou");
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
