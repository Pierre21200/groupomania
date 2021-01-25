import React, { useState, useEffect } from "react";
import Comments from "../Comments/index.js";
import Users from "../Users/index.js";
import "./Posts.css";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import fakeposts from "../../fakedata/posts.json";
import fakecomments from "../../fakedata/comments.json";
import fakeusers from "../../fakedata/users.json";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    // const result = await axios("http://localhost:4200/posts/allposts");
    // setPosts(result.data.allPosts);
    setPosts(fakeposts);
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
            <h6 className="card-subtitle mb-2 text-muted">
              {/* <Link to="/Profile/:userId"> */}
              <Link to={`/profile/${post.userId}`}>
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
  );
};

export default Posts;
