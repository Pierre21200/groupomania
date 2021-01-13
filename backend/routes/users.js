// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller
const userCtrl = require("../controllers/users");

// Login
router.post("/login", userCtrl.login);

// Signup
router.post("/signup", userCtrl.signup);

// Get a profil's user
router.get("/:id", auth, userCtrl.getUserProfile);

// Update a profil
router.put("/profil", auth, multer, userCtrl.updateUserProfile);
router.put("/profil/password", auth, userCtrl.updatePassword);

// Execution
module.exports = router;
