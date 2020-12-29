import React, { useState, useEffect } from "react";
import "./Fil.css";
import INPUT from "./input.js";
import axios from "axios";

const Fil = () => {
  const [dataDb, setDataDb] = useState([]);

  const fetchData = async () => {
    const result = await axios("http://localhost:4200/posts/allposts");
    setDataDb(result.data.allPosts);
    console.log(result);
  };

  return (
    <div>
      <button onClick={fetchData}></button>
      {dataDb.map(element => (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{element.titlePost}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Utilisateur</h6>
            <p className="card-text">{element.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fil;
