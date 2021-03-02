// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Controller
const commentCtrl = require("../controllers/comments");

// Post comment
router.post("/create", auth, commentCtrl.createComment);

// Get all comments from a post
router.get("/post/:id", auth, commentCtrl.getPostComments);

// Moderate a comment
router.put("/update", commentCtrl.updateComment);
// Execution
module.exports = router;
