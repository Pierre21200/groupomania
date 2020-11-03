// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller
const userCtrl = require("../controllers/user");

// Voir un profil
router.get("/:id", auth, userCtrl.getUserProfile);

// Modifier profil
router.patch("/update", auth, multer, userCtrl.updateUserProfile);
router.put("/update", auth, userCtrl.updatePassword);

// Supprimer profil
router.delete("/:id", auth, userCtrl.deleteProfile);

// Execution
module.exports = router;
