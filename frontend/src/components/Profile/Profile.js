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

// Page Profil
// import "./profile.css";
// function App() {
//   return (
//     <div className="home">
//       <Profile />
//     </div>
//   );
// }

const Profile = ({ userId }) => {
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
