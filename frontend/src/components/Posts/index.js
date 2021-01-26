import React, { useState, useEffect } from "react";
import Comments from "../Comments/index.js";
import Users from "../Users/index.js";
import Input from "../Input/index";
import Button from "../Button/index";
import "./Posts.css";
import axios from "axios";

import { BrowserRouter as Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("false");
  const [validComment, setValidComment] = useState(false);

  function handleChangeComment(event) {
    setComment(event.target.value);
    setValidComment(event.target.value !== "" ? true : false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4200/posts/allposts");
      setPosts(result.data.allPosts);
    };
    fetchData();
  }, []);

  console.log(posts);

  // const creatingComment = async ({ postId }) => {
  //   try {
  //     let result = await axios.post(
  //       "http://localhost:4200/comments/create/:id",
  //       {
  //         postId,
  //         comment
  //       }
  //     );

  //     console.log("Le Post a bien été créé");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="card">
          <div className="card-body">
            <h5 className="card-title">{post.titlePost}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              <a href={`/profile/${post.userId}`}>
                <Users postId={post.userId} />
              </a>
            </h6>
            <p className="card-text">{post.content}</p>
            <div>{/* <Comments /> */}</div>
            <button>Créer un nouveau commentaire</button>
            <Input
              value={comment}
              name="comment"
              onChange={handleChangeComment}
            />
          </div>
          <Button
            // onClick={creatingComment}
            disabled={validComment ? "" : "disabled"}
          />
        </div>
      ))}
    </div>
  );
};

export default Posts;
