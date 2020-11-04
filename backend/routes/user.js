// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller
const userCtrl = require("../controllers/user");

// Voir un profil
router.get("/:id", auth, userCtrl.getUserProfile);

// Login
router.post("/", userCtrl.login);

// Signup
router.post("/", userCtrl.signup);

// Modifier profil
router.patch("/update", auth, multer, userCtrl.updateUserProfile);
router.put("/update", auth, userCtrl.updatePassword);

// Execution
module.exports = router;
