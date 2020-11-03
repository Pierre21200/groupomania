// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller
const userCtrl = require("../controllers/user");

// Voir un profil
router.get("/:id", auth, userCtrl.getUserProfile);

// Voir tous les posts d'un profil
router.get("/:id/posts", auth, userCtrl.getUserProfilePosts);

// Voir tous les commentaires d'un profil
router.get("/:id/comments", auth, userCtrl.getUserProfileComments);

// Modifier profil
router.patch("/update", auth, multer, userCtrl.updateUserProfile);
router.put("/update", auth, userCtrl.updatePassword);

// Supprimer profil
router.delete("/:id", auth, userCtrl.deleteProfile);

// Execution
module.exports = router;
