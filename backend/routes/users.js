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
router.get("/:id", userCtrl.getUserProfile);

// Get a all users
router.get("/", userCtrl.getAllUsers);

// Update a profil
router.put("/profil", multer, userCtrl.updateUserProfile);
router.put("/profil/password", userCtrl.updatePassword);

// Execution
module.exports = router;
