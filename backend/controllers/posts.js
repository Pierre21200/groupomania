// Middleware Imports
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const fs = require("fs");

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

// POST Create Post
exports.createPost = (req, res, next) => {
  const user = decodeUid(req.headers.authorization);
  const { title } = req.body;
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;

  // Check image
  if (req.body.image === "null") {
    return next(new HttpError("Veuillez choisir une image", 400));
  }

  // Query Prepare
  const string =
    "INSERT INTO posts (Users_id, title, image_url) VALUES (?, ?, ? )";
  const inserts = [user.id, title, imageUrl];
  const sql = mysql.format(string, inserts);

  // Query DB
  const createPost = db.query(sql, (error, post) => {
    if (!error) {
      res.status(201).json({ message: "Publication sauvegardée" });
    } else {
      return next(
        new HttpError(
          "Erreur de requête, la publication n'a pas été créée",
          500
        )
      );
    }
  });
};

// GET all posts
exports.getAllPosts = (req, res, next) => {
  // Query Prepare
  const sql = "SELECT * FROM posts";

  // Query DB
  const query = db.query(sql, (error, results) => {
    if (!error) {
      res.status(200).json(results);
    } else {
      return next(
        new HttpError(
          "Erreur de requête, les posts n'ont pas pu être récupérés",
          500
        )
      );
    }
  });
};

// GET one post
exports.getOnePost = (req, res, next) => {
  const { postId } = req.body;

  // Query Prepare
  const string = "SELECT * FROM posts WHERE id = ?";
  const inserts = [postId];
  const sql = mysql.format(string, inserts);

  // Query DB
  const query = db.query(sql, (error, results) => {
    if (!error) {
      res.status(200).json(results);
    } else {
      return next(
        new HttpError(
          "Erreur de requête, le post n'a pas pu être récupéré",
          500
        )
      );
    }
  });
};

// GET All User's Post
exports.getAllUsersPosts = (req, res, next) => {
  const { userId } = req.body;
  // Query Prepare
  const string = "SELECT * FROM posts WHERE Users_id = ?";
  const inserts = [userId];
  const sql = mysql.format(string, inserts);

  // Query DB
  const query = db.query(sql, (error, results) => {
    if (!error) {
      res.status(200).json(results);
    } else {
      return next(
        new HttpError(
          "Erreur de requête, les posts de cette utilisateur n'ont pas pu être récupérées",
          500
        )
      );
    }
  });
};

// PATCH Moderate Post
// Qu'est ce qu'il peut faire en tant que modérateur ? Supprimer, modifier ?
