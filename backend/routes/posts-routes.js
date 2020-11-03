// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller
const postCtrl = require("../controllers/posts");

// Créer un post
router.post("/", auth, multer, postCtrl.createPost);

// Créer un commentaire
router.post("/comment", auth, postCtrl.postComment);

// Voir tous les posts
router.get("/", auth, postCtrl.getAllPosts);

// Voir toutes les catégories
router.get("/categories", auth, postCtrl.getCategories);

// Voir une seule catégorie et ses posts
router.get("/categorie", auth, postCtrl.getCategoriesPosts);

// Voir un seul post
router.get("/:id", auth, postCtrl.getOnePost);

// Modifier un post
router.patch("/:id", auth, postCtrl.updatePost);

// Modifier un commentaire
router.patch("/comment/:id", auth, postCtrl.updateComment);

// Supprimer un post
router.delete("/:id", auth, postCtrl.deletePost);

// Supprimer un commentaire
router.delete("/comment/:id", auth, postCtrl.deleteComment);

// Execution
module.exports = router;
