import React, { useState, useEffect } from "react";
import Input from "../Input/Input.js";
import fakeposts from "../../fakedata/posts.json";
import fakecomments from "../../fakedata/comments.json";
import fakeusers from "../../fakedata/users.json";
import "./Home.css";

import axios from "axios";

// Page principale, fil des posts
// import "./home.css";
// function App() {
//   return (
//     <div className="home">
//       <header className="row">
//         <div className="logo-home col-2">
//           <h1>Groupomania</h1>
//         </div>
//         <div className="input-container col-10">
//           <Input />
//         </div>
//       </header>
//       <section className="row">
//         <div className="sidebar-container col-2">
//           <Sidebar />
//         </div>
//         <div className="posts-container col-10">
//           <Posts />
//         </div>
//       </section>
//     </div>
//   );
// }

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    // const result = await axios("http://localhost:4200/posts/allposts");
    // setPosts(result.data.allPosts);
    setPosts(fakeposts);
    setComments(fakecomments);
    setUsers(fakeusers);
  };

  useEffect(() => {
    fetchData();
    console.log(fakeusers);
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="card">
          <div className="card-body">
            <h5 className="card-title">{post.titlePost}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{users.firstName}</h6>
            <p className="card-text">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

// quel est le meilleur moyen d'allé chercher l'utilisateur associé au post, et les comms
// créer un component comment avec une props postId
// CSS par composant, avec des trucs général, puis on change la className en fonction de la page ou il se trouve
