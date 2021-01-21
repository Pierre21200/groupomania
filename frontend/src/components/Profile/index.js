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

const Profile = ({}) => {
  const [users, setUsers] = useState([]);
  let { params } = useParams();

  const fetchData = async () => {
    if (params) {
      setUsers();
    }
    setUsers(fakeusers);
  };

  useEffect(() => {
    fetchData();
    console.log(params);
  }, []);

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
