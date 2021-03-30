// Middleware Imports
// let Sequelize = require("sequelize");

const express = require("express");
const path = require("path");
require("dotenv").config();

// App security
const helmet = require("helmet");

// App Routes
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

const app = express();

// Helmet Middleware
app.use(helmet());

// CORS Control Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Express Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Access Routes
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
// next();
// });

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// Error Handling 404

// app.use((req, res, next) => {
//   throw new error("Route non trouvée", 404);
// });

// Error Handling App
// app.use((error, req, res, next) => {
//   if (res.headersSent) {
//     return next(error);
//   }
//   res.status(error.code || 500);
//   res.json({
//     message:
//       error.message ||
//       "Un problème est survenu sur le serveur, veuillez réessayer ultérieurement"
//   });
// });

// App Execution
module.exports = app;
