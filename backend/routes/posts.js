// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller
const postCtrl = require("../controllers/posts");

// Create a post
router.post("/", auth, multer, postCtrl.createPost);

// Get all the posts
router.get("/", auth, postCtrl.getAllPosts);

// Get one post
router.get("/:id", auth, postCtrl.getOnePost);

// Get all user's posts
router.get("/user/:id", auth, postCtrl.getAllUsersPosts);

// Moderate a post
// router.put("/:id", auth, postCtrl.updateOnePost);

// Execution
module.exports = router;
