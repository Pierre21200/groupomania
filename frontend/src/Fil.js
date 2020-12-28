import React, { useState, useEffect } from "react";
import "./Fil.css";
import INPUT from "./input.js";
import axios from "axios";

// const F = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios("http://localhost:4200/posts/allposts");
//       setData(result.data.allPosts);
//     };

//     fetchData();
//   }, []);

//   console.log(Object.values(data));

//   return (
//     <div>
//       <ul>
//         {data.map(item => (
//           <li key={item.id}>
//             <p>{item}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// on essaie de récupérer les informations sur http://localhost:4200/posts/allposts

// je dois mieux comprendre pourquoi il utilise useEffect et quand et comment ça marche ?
// Explications, l'idée de useState c'est vraiment de créer un élément fonctionnel qui a comme argument une valeur et une fonction setValeur associé.
// Chaque fois que valeur est modifié par le biais de setValeur, un nouveau render!!! (pas return, mais bien tout le render invoyer par app.js)
// On peut alors associer un rendu html associé, donc lequel on peut notre valeur et la f setValeur
// et les props ?

// const Fil = () => {
//   const [string, setString] = useState(1);

//   function handleString() {
//     setString(string);
//   }

//   return (
//     <div>
//       <button></button>
//     </div>
//   );
// };

// Exercice, essayer de faire la même chose avec useState
// avec async await, on n'as pas besoin d'associer la fonction parent a setData dans un event, on peut lancer la fonction juste après l'avoir déclarer sans recéclencher des rendus

const Fil = () => {
  const [dataDb, setDataDb] = useState([]);

  const numbers = [
    { id: 1, userId: 3, titlePost: "coucou", content: "les jeunes" },
    { id: 2, userId: 3, titlePost: "coucou", content: "les jeunes" }
  ];

  const fetchData = async () => {
    const result = await axios("http://localhost:4200/posts/allposts");
    setDataDb(result.data.allPosts);
    console.log(result.data.allPosts);
  };

  return (
    <div>
      <button onClick={fetchData}></button>
      {dataDb.map(element => (
        <p key={element.id}>{element.titlePost}</p>
      ))}
    </div>
  );
};

export default Fil;
