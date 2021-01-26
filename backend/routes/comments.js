// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Controller
const commentCtrl = require("../controllers/comments");

// Post comment
router.post("/create/:id", commentCtrl.createComment);

// Get all comments from a post
router.get("/post/:id", commentCtrl.getPostComments);

// Execution
module.exports = router;
