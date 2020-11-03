// Middleware Imports
const express = require("express");
const router = express.Router();

// Controller
const userCtrl = require("../controllers/signup");

// Signup
router.post("/", userCtrl.signup);

// Execution
module.exports = router;
