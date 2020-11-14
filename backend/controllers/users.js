"use strict";
// Middleware Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const mysql = require("mysql");
const validator = require("validator");
const model = require("../models/users");

// Error Message
const HttpError = require("../models/httpError");

// Database Route

// POST Login User
exports.login = (req, res) => {
  console.log("login");
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    res.status(400).json({ error: "Un paramètre est manquant" });
  }

  model.User.findOne({
    where: { email: email }
  }).then(user => {
    if (!user) {
      res.status(401).json({
        error: "Utilisateur non trouvé"
      });
    } else {
      console.log(user.password);
      bcrypt.compare(password, user.password).then(valid => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          userId: user._id,
          token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h"
          })
        });
      });
    }
  });
};

// POST Signup User
exports.signup = (req, res) => {
  // couvrir toutes les possibilités : email existant, champ non rempli, (regex?)
  console.log("signup");
  const { firstName, lastName, email, password } = req.body;
  console.log(firstName, lastName, email, password);

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ error: "Un paramètre est manquant" });
  }

  model.User.findOne({
    attributes: ["email"],
    where: { email: email }
  }).then(user => {
    if (!user) {
      bcrypt.hash(password, 10, function (err, bcryptPassword) {
        // Création de l'user
        const newUser = model.User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: bcryptPassword
        })
          .then(newUser => {
            res.status(201).json({ id: newUser.id });
          })
          .catch(err => {
            res.status(500).json({ err });
          });
      });
    } else {
      res
        .status(409)
        .json({ error: "Cette adresse email est déjà lié à un utilisateur" });
    }
  });
};

// UserID decoder
const decodeUid = authorization => {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return {
    id: decodedToken.userId,
    clearance: decodedToken.account
  };
};

// GET User Profile
exports.getUserProfile = (req, res) => {
  const { id } = req.params;
  // Query Prepare
  const string = "SELECT firstName, lastName, email FROM users WHERE id = ?";
  const inserts = [id];
  const sql = mysql.format(string, inserts);
  // Query DB
  const query = db.query(sql, (error, profile) => {
    if (!error) {
      res.status(200).json(profile[0]);
    } else {
      return new HttpError("Utilisateur non trouvé", 404);
    }
  });
};

// PATCH User Profile
exports.updateUserProfile = (req, res) => {
  const user = decodeUid(req.headers.authorization);
  const { firstName, lastName, email, active } = req.body;

  // Validation des donnés
  let isFirstName = validator.matches(firstName, regExText);
  let isLastName = validator.matches(lastName, regExText);
  let isEmail = validator.isEmail(email);

  if (isFirstName && isLastName && isEmail) {
    // Query Prepare
    const string =
      "UPDATE users SET firstName = ?, lastName = ?, email = ?, active = ? WHERE id = ?";
    const inserts = [firstName, lastName, email, active, user.id];
    const sql = mysql.format(string, inserts);

    // Query DB
    const query = db.query(sql, (error, profile) => {
      if (!error) {
        res.status(200).json({ message: "User Updated successfully!" });
      } else {
        return new HttpError(
          "Erreur de requête, la mise à jour du profil n'a pas été faite",
          500
        );
      }
    });
  } else if (!isFirstName || !isLastName || !isEmail) {
    // Error Handling
    let errorMessages = [];
    let answ;
    answ = !isFirstName ? errorMessages.push(" Prénom") : "";
    answ = !isLastName ? errorMessages.push(" Nom") : "";
    answ = !isEmail ? errorMessages.push(" E-mail") : "";

    errorMessages = errorMessages.join();

    return new HttpError(
      "Veuillez vérifier les champs suivants :" + errorMessages,
      400
    );
  }
};

// PUT User Password
exports.updatePassword = (req, res) => {
  const user = decodeUid(req.headers.authorization);
  const { password } = req.body;

  // Check New Password
  if (passValid.validate(password, options).valid) {
    // Hash New Password
    bcrypt.hash(req.body.password, 10).then(hash => {
      // Query Prepare
      const string = "UPDATE users SET password = ? WHERE id = ? ";
      const inserts = [hash, user.id];
      const sql = mysql.format(string, inserts);

      // Query DB
      const query = db.query(sql, (error, password) => {
        if (!error) {
          res.status(201).json({ message: "Password Updated successfully!" });
        } else {
          return new HttpError(
            "Erreur de requête, la mise à jour du mot de passe n'a pas été faite",
            500
          );
        }
      });
    });
  } else {
    return new HttpError("Votre mot de passe n'est pas valide", 401);
  }
};
