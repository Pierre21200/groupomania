// Middleware Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const mysql = require("mysql");
const validator = require("validator");
// const passValid = require("secure-password-validator");
// const passBlackList = require("secure-password-validator/build/main/blacklists/first10_000");

// Error Message
const HttpError = require("../models/httpError");

// Database Route
const db = require("../config/db");

// POST Login User
exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // Check Input
  if (!email && !password) {
    return next(new HttpError("Veuillez rentrer vos identifiants", 400));
  }

  if (!email) {
    return next(new HttpError("Veuillez rentrer votre email", 400));
  }

  if (!password) {
    return next(new HttpError("Veuillez rentrer votre mot de passe", 400));
  }

  // Query Database
  const string = "SELECT id, email, password FROM users WHERE email = ?";
  const inserts = [email];
  const sql = mysql.format(string, inserts);

  const query = db.query(sql, (error, user) => {
    // Check user in database
    if (user.length === 0) {
      return next(new HttpError("Votre adresse e-mail n'est pas valide", 401));
    }

    // Compare hash and password
    bcrypt.compare(password, user[0].password).then(valid => {
      if (!valid) {
        return next(new HttpError("Votre mot de passe n'est pas valide", 401));
      }
      // Sign id and JWT
      res.status(200).json({
        userId: user[0].id,
        account: user[0].account,
        token: jwt.sign(
          {
            userId: user[0].id,
            account: user[0].account
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES
          }
        )
      });
    });
  });
};

// Password Validator Options
// const options = {
//   // min password length, default = 8, cannot be less than 8
//   minLength: 8,
//   // max password length, default = 100, cannot be less than 50
//   maxLength: 50,
//   //array with blacklisted passwords default black list with first 1000 most common passwords
//   blacklist: passBlackList,
//   // password Must have numbers, default = false
//   digits: true,
//   // password Must have letters, default = false
//   letters: true,
//   // password Must have uppercase letters, default = false
//   uppercase: true,
//   // password Must have lowercase letters, default = false
//   lowercase: true,
//   // password Must have symbols letters, default = false
//   symbols: false
// };

// POST Create/Signup User
exports.signup = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // RegEx Text
  const regExText = /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ \'\- ]+$/i;

  // Check data user
  let isFirstName = validator.matches(String(firstName), regExText);
  let isLastName = validator.matches(String(lastName), regExText);
  let isEmail = validator.isEmail(String(email));
  let isPassword = passValid.validate(String(password), options).valid;

  // If check is ok
  if (isFirstName && isLastName && isEmail && isPassword) {
    // Hash password
    bcrypt.hash(password, 10, (error, hash) => {
      // Save data user in Database
      const string =
        "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
      const inserts = [firstName, lastName, email, hash];
      const sql = mysql.format(string, inserts);

      const signupUser = db.query(sql, (error, user) => {
        if (!error) {
          // Sign id and JWT
          res.status(201).json({
            message: "Utilisateur créé correctement",
            userId: user.insertId,
            account: "user",
            token: jwt.sign(
              {
                userId: user.insertId,
                account: "user"
              },
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_EXPIRES
              }
            )
          });
        } else {
          return next(new HttpError("Utilisateur déjà existant", 400));
        }
      });
    });
  } else if (!isFirstName || !isLastName || !isEmail || !isPassword) {
    // Error Handling
    let errorMessages = [];

    let anws = !isFirstName ? errorMessages.push(" Prénom") : "";
    anws = !isLastName ? errorMessages.push(" Nom") : "";
    anws = !isEmail ? errorMessages.push(" E-mail") : "";
    anws = !isPassword ? errorMessages.push(" Mot de passe") : "";
    errorMessages = errorMessages.join();

    return next(
      new HttpError(
        "Veuillez vérifier les champs suivants :" + errorMessages,
        400
      )
    );
  }
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
exports.getUserProfile = (req, res, next) => {
  const { id } = req.params;

  const string = "SELECT firstName, lastName, email FROM users WHERE id = ?";
  const inserts = [id];
  const sql = mysql.format(string, inserts);

  const query = db.query(sql, (error, profile) => {
    if (!error) {
      res.status(200).json(profile[0]);
    } else {
      return next(new HttpError("Utilisateur non trouvé", 404));
    }
  });
};

// PATCH User Profile
exports.updateUserProfile = (req, res, next) => {
  const user = decodeUid(req.headers.authorization);
  const { firstName, lastName, email, active } = req.body;

  // Validation des donnés
  let isFirstName = validator.matches(firstName, regExText);
  let isLastName = validator.matches(lastName, regExText);
  let isEmail = validator.isEmail(email);

  if (isFirstName && isLastName && isEmail) {
    const string =
      "UPDATE users SET firstName = ?, lastName = ?, email = ?, active = ? WHERE id = ?";
    const inserts = [firstName, lastName, email, active, user.id];
    const sql = mysql.format(string, inserts);

    // Requête
    const query = db.query(sql, (error, profile) => {
      if (!error) {
        res.status(200).json({ message: "User Updated successfully!" });
      } else {
        return next(
          new HttpError(
            "Erreur de requête, la mise à jour du profil n'a pas été faite",
            500
          )
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

    return next(
      new HttpError(
        "Veuillez vérifier les champs suivants :" + errorMessages,
        400
      )
    );
  }
};

// PUT User Password
exports.updatePassword = (req, res, next) => {
  const user = decodeUid(req.headers.authorization);
  const { password } = req.body;

  // Check New Password
  if (passValid.validate(password, options).valid) {
    // Hash New Password
    bcrypt.hash(req.body.password, 10).then(hash => {
      const string = "UPDATE users SET password = ? WHERE id = ? ";
      const inserts = [hash, user.id];
      const sql = mysql.format(string, inserts);

      // Requête
      const query = db.query(sql, (error, password) => {
        if (!error) {
          res.status(201).json({ message: "Password Updated successfully!" });
        } else {
          return next(
            new HttpError(
              "Erreur de requête, la mise à jour du mot de passe n'a pas été faite",
              500
            )
          );
        }
      });
    });
  } else {
    return next(new HttpError("Votre mot de passe n'est pas valide", 401));
  }
};
