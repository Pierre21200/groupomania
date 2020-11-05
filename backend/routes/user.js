// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller
const userCtrl = require("../controllers/user");

// Login
router.post("/", userCtrl.login);

// Signup
router.post("/", userCtrl.signup);

// Get a profil's user
router.get("/:id", auth, userCtrl.getUserProfile);

// Update a profil
router.patch("/:id", auth, multer, userCtrl.updateUserProfile);
router.put("/:id", auth, userCtrl.updatePassword);

// Execution
module.exports = router;
