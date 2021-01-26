import React, { useState, useEffect } from "react";
import Comments from "../Comments/index.js";
import Users from "../Users/index.js";
import Input from "../Input/index";
import Button from "../Button/index";
import "./Posts.css";
import axios from "axios";
import { BrowserRouter as useParams } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [comm, setComm] = useState("");
  const [validComm, setValidComm] = useState(false);

  function handleChangeComm(event) {
    setComm(event.target.value);
    setValidComm(event.target.value !== "" ? true : false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4200/posts/allposts");
      setPosts(result.data.allPosts);
    };
    fetchData();
  }, []);

  // const CreatingComment = async () => {
  //   try {
  //     let postId = 3;
  //     let params = useParams();
  //     let result = await axios.post(
  //       `http://localhost:4200/comments/create/${params.userId}`,
  //       {
  //         postId,
  //         comm
  //       }
  //     );
  //     console.log("Le commentaire a bien été créé");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const creatingComment = async postId => {
  //   try {
  //     let result = await axios.post(
  //       `http://localhost:4200/comments/create/${params.userId}`,
  //       {
  //         postId,
  //         comm
  //       }
  //     );
  //     console.log("Le commentaire a bien été créé");
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
              <Users postId={post.userId} />
            </h6>
            <p className="card-text">{post.content}</p>
            <div>
              <Comments postId={post.id} />
            </div>
            <button>Créer un nouveau commentaire</button>
            <Input value={comm} name="comment" onChange={handleChangeComm} />
          </div>
          <Button
            // onClick={<CreatingComment postId={post.id}/>}
            // onClick={creatingComment}
            disabled={validComm ? "" : "disabled"}
          />
        </div>
      ))}
    </div>
  );
};

export default Posts;

// problème
// je veux appeler la fonction creatingComment sur le onClick en lui passant un argument post.id
// si j'appelle la fonction, je ne peux pas utiliser useParams à l'intérieur, et à l'extérieur ça ne fonctionne pas non plus
//si j'appelle un composant react CreatingComment : "Expected `onClick` listener to be a function"
