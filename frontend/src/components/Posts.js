import React, { useState, useEffect } from "react";
import Input from "./Input.js";
import fakeposts from "../fakedata/posts.json";
import fakecomments from "../fakedata/comments.json";
// import fakeusers from "../fakedata/users.json";

import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    // const result = await axios("http://localhost:4200/posts/allposts");
    // setPosts(result.data.allPosts);
    setPosts(fakeposts);
    setComments(fakecomments);
    // setUsers(fakeusers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="card">
          <div className="card-body">
            <h5 className="card-title">{post.titlePost}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Utilisateur</h6>
            <p className="card-text">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

// quel est le meilleur moyen d'allé chercher l'utilisateur associé au post, et les comms
