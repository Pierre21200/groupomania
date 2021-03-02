import React, { useEffect, useState } from "react";
import { getUserPosts } from "../FetchData/Posts";
import { getUser } from "../FetchData/Users";
import User from "../User/index";
import Button from "../Button/index";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

const Profile = () => {
  const userId = useParams();
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);
  const [postsUser, setPostsUser] = useState(null);

  const getSetUser = async () => {
    const result = await getUser(token, userId.id);
    setProfile(result.data.userFound);
  };

  const getSetUserPosts = async () => {
    const result = await getUserPosts(token, userId.id);
    setPostsUser(result.data.allPosts);
  };

  useEffect(() => {
    getSetUser();
    getSetUserPosts();
  });

  return profile && postsUser ? (
    <div>
      <h1>
        {profile.firstName} {profile.lastName}
      </h1>
      <h2>{profile.email}</h2>
      {postsUser.map(post => (
        <div key={post.id} id={post.id} className="card">
          <div>{post.titlePost}</div>
          <div>{post.content}</div>
        </div>
      ))}
    </div>
  ) : (
    <div>Chargement</div>
  );
};

export default Profile;
