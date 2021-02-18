// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller
const postCtrl = require("../controllers/posts");

// Create a post
router.post("/", auth, multer, postCtrl.createPost); // a modifier en enlevant create

// Get all the posts
router.get("/", auth, postCtrl.getAllPosts); // a modifier en enlevant allposts

// Get one post
// router.get("/:id", auth, postCtrl.getOnePost);

// Get all user's posts : réservé au modo
router.get("/user/:id", auth, postCtrl.getAllUsersPosts);

// Moderate a post
router.put("/update", postCtrl.updatePost);

// Execution
module.exports = router;
