import React, { useState, useEffect } from "react";
import Comments from "../Comments/index.js";
import Users from "../Users/Users.js";
import "./Posts.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import fakeposts from "../../fakedata/posts.json";
import fakecomments from "../../fakedata/comments.json";
import fakeusers from "../../fakedata/users.json";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    // const result = await axios("http://localhost:4200/posts/allposts");
    // setPosts(result.data.allPosts);
    setPosts(fakeposts); // afficher tout les posts
    setUsers(fakeusers); // afficher tout les posts
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

      <div>
        {posts.map(post => (
          <div key={post.id} className="card">
            <p>{post.id}</p>
            <div className="card-body">
              <h5 className="card-title">{post.titlePost}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {/* <Link to={`/Profile/:${post.userId}`}> */}
                <Link to={`/Profile/:${post.userId}`}>
                  {/* il faut ajouter après profile {post.userId} */}
                  <Users postId={post.userId} />
                </Link>
              </h6>
              <p className="card-text">{post.content}</p>
              <div>
                <Comments postId={post.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Router>
  );
};

export default Posts;
