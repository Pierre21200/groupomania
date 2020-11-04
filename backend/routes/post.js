// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller
const postCtrl = require("../controllers/posts");

// Créer un post
router.post("/", auth, multer, postCtrl.createPost);
// joindre au user

// Voir tous les posts
router.get("/", auth, postCtrl.getAllPosts);

// Voir un seul post
router.get("/:id", auth, postCtrl.getOnePost);

// Voir tous les posts d'un user
router.get("/posts/:id", auth, postCtrl.getUserAllPosts);

// Modérer Post
router.patch("/:id", auth, postCtrl.updateOnePost);

// Execution
module.exports = router;
