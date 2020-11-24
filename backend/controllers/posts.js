// Middleware Imports
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const fs = require("fs");
const model = require("../models/users");

// Error Class
const HttpError = require("../models/httpError");

// Database Route
const db = require("../config/db");

// UserID decoder
const decodeUid = authorization => {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return {
    id: decodedToken.userId,
    clearance: decodedToken.account
  };
};

// POST Create Post (à jour sans auth)
exports.createPost = (req, res) => {
  const { userId } = req.body; // avec decodeUid quand auth
  const { title, content } = req.body;
  // Check data
  if (!title || !content || !userId) {
    res.status(400).json({ error: "Un paramètre est manquant" });
  }

  // Query Prepare
  model.Post.create({
    userId: userId,
    titlePost: title,
    content: content
  })
    .then(newPost => {
      res.status(201).json({ newPost });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
};

exports.getAllPosts = (req, res) => {
  model.Post.findAll({
    order: [["id", "DESC"]]
  }).then(allPosts => {
    res.status(201).json({ allPosts });
  });
};

// GET one post
exports.getOnePost = (req, res) => {
  const { id } = req.params;

  // Query Prepare
  model.Post.findOne({
    where: { id: id }
  }).then(post => {
    res.status(201).json({ post });
  });
};

// GET All User's Post
// exports.getAllUsersPosts = (req, res) => {
//   const { userId } = req.body;
//   // Query Prepare
//   const string = "SELECT * FROM posts WHERE Users_id = ?";
//   const inserts = [userId];
//   const sql = mysql.format(string, inserts);

//   // Query DB
//   const query = db.query(sql, (error, results) => {
//     if (!error) {
//       res.status(200).json(results);
//     } else {
//       return new HttpError(
//         "Erreur de requête, les posts de cette utilisateur n'ont pas pu être récupérées",
//         500
//       );
//     }
//   });
// };

exports.getAllUsersPosts = (req, res) => {
  const { id } = req.params; // avec decodeUid
  // Query Prepare

  // Query DB
  model.Post.findAll({
    where: {
      user_id: id
    }
  }).then(allPosts => {
    res.status(201).json({ allPosts });
  });
};

// PATCH Moderate Post
// Qu'est ce qu'il peut faire en tant que modérateur ? Supprimer, modifier ?
