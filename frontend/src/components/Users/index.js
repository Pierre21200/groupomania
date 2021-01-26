import React, { useState, useEffect } from "react";
import fakeusers from "../../fakedata/users.json";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import axios from "axios";

const Users = ({ postId }) => {
  // soit tu lui fournis la props et il t'envoie l'utilisateur du post

  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const result = await axios("http://localhost:4200/users");
    let userPosts = result.data.allUsers.filter(user => user.id === postId);
    setUsers(userPosts);
  };

  useEffect(() => {
    fetchData();
  }, [users]);

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
