import React, { useState, useEffect } from "react";
import fakeusers from "../../fakedata/users.json";
import "./Profile.css";

import { BrowserRouter as useParams } from "react-router-dom";

const Profile = () => {
  const [users, setUsers] = useState([]);

  // faire un composant de ça, à voir dans home.js
  const params = useParams();
  let thisUser = fakeusers.filter(user => user.id === params.userId);

  const fetchData = async () => {
    if (params.userId) {
      setUsers(thisUser);
    }
    // setUsers(fakeusers);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="profile-container">
      {users.map(user => (
        <div key={user.id} className="profiles-container">
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
          <div>{user.email}</div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
