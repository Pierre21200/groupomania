import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = ({ postId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4200/users");
      // const result = await axios(
      //   `http://localhost:4200/users/${params.userId}`
      // );
      let userPosts = result.data.allUsers.filter(user => user.id === postId);
      setUsers(userPosts);
    };
    fetchData();
  }, []);

  if (!users) {
    return <div>Chargement</div>;
  }

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
