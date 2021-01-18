import React, { useState, useEffect } from "react";
import fakeusers from "../../fakedata/users.json";
import "./Profile.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const Profile = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    setUsers(fakeusers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="profile-container">
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
