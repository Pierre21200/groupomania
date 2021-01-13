import React, { useState, useEffect } from "react";
import Comments from "../Comments/Comments.js";
import Users from "../Users/Users.js";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import fakeposts from "../../fakedata/posts.json";
import fakecomments from "../../fakedata/comments.json";
import fakeusers from "../../fakedata/users.json";

const Posts = ({ userId, commentId }) => {
  const [posts, setPosts] = useState([]);
  let postUser = fakeposts.filter(post => post.userId === userId);
  let postComment = fakeposts.filter(post => post.id === commentId);

  const fetchData = async () => {
    // const result = await axios("http://localhost:4200/posts/allposts");
    // setPosts(result.data.allPosts);

    if (userId) {
      setPosts(postUser); // afficher le post propre a un user
    } else if (commentId) {
      setPosts(postComment); // afficher le post propre a un comm
    } else {
      setPosts(fakeposts); // afficher tout les posts
    }
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
                <Link to="/Profile">
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
