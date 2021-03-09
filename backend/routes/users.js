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

// Get a all users
router.get("/", auth, userCtrl.getAllUsers);

// Update a profil
router.put("/profile", auth, multer, userCtrl.updateUserProfile);
router.put("/profile/password", auth, userCtrl.updatePassword);

// Delete a profil
router.put("/profile/inactive", userCtrl.inactiveProfile);

//delete a profil pour modo
router.put("/update", userCtrl.inactiveUser);

// Execution
module.exports = router;
