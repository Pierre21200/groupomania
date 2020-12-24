import React, { useState, useEffect } from "react";
import "./Fil.css";
import INPUT from "./input.js";
import axios from "axios";

const Fil = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4200/posts/allposts");
      setData(result.data.allPosts);
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fil;
