// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller
const commentCtrl = require("../controllers/comment");

// Post comment
router.post("/", auth, postCtrl.createComment);

// Get all comments from one post
router.get("/post/:id", auth, postCtrl.getUserComments);
