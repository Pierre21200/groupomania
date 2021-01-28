import React, { useState, useEffect } from "react";
import Comments from "../Comments/index.js";
import Users from "../Users/index.js";
import Input from "../Input/index";
import Button from "../Button/index";
import "./Posts.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Posts = () => {
  let params = useParams();

  const [posts, setPosts] = useState([]);
  const [comm, setComm] = useState("");
  const [validComm, setValidComm] = useState(false);

  function handleChangeComm(event) {
    setComm(event.target.value);
    setValidComm(event.target.value !== "" ? true : false);
  }

  useEffect(() => {
    const fetchData = async () => {
      // ${process.env.REACT_APP_API_URL}

      const result = await axios("http://localhost:4200/posts/allposts");
      // const result = await axios(
      //   `${process.env.REACT_APP_API_URL}/posts/allposts`
      // );

      setPosts(result.data.allPosts);
    };
    fetchData();
  }, []);

  const creatingComment = async postId => {
    try {
      let id = params.userId;
      let result = await axios.post(`http://localhost:4200/comments/create`, {
        id,
        postId,
        comm
      });
      console.log(result.data.newComm);
      console.log("Le commentaire a bien été créé");
    } catch (error) {
      console.log(error);
    }
  };

  if (!posts) {
    return <div>Chargement</div>;
  }

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
            onClick={() => creatingComment(post.id)}
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
