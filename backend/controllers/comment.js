// Middleware Imports
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const fs = require("fs");

// Error Class
const HttpError = require("../models/http-error");

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

// POST Create comment
exports.postComment = (req, res, next) => {
  const user = decodeUid(req.headers.authorization);
  const { postId, message } = req.body;

  // Requête
  const string =
    "INSERT INTO comments (Users_id, Posts_id, message) VALUES (?, ?, ?)";
  const inserts = [user.id, postId, message];
  const sql = mysql.format(string, inserts);

  // Requête
  const returnComment = db.query(sql, (error, response) => {
    if (!error) {
      res.status(201).json(response);
    } else {
      return next(
        new HttpError("Erreur de requête, le commentaire n'a pas été créé", 500)
      );
    }
  });
};

// GET All comments from a post
exports.GetPostComment = (req, res, next) => {
  const user = decodeUid(req.headers.authorization);
  const { postId } = req.body;

  // Requête
  const string = "SELECT * FROM comments WHERE Posts_id = ?";
  const inserts = [postId];
  const sql = mysql.format(string, inserts);

  // Requête
  const returnComments = db.query(sql, (error, response) => {
    if (!error) {
      res.status(201).json(response);
    } else {
      return next(
        new HttpError(
          "Erreur de requête, les commentaire n'ont pas été créé",
          500
        )
      );
    }
  });
};
