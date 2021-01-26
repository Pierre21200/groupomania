import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = ({ postId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4200/users");
      let userPosts = result.data.allUsers.filter(user => user.id === postId);
      setUsers(userPosts);
    };
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
