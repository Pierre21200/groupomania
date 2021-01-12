import React, { useState, useEffect } from "react";
import fakeusers from "../fakedata/users.json";

const Profile = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    setUsers(fakeusers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="section">
      {users.map(user => (
        <div key={user.id} className="profile-container">
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
          <div>{user.email}</div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
