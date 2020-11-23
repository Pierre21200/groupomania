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
const { Console } = require("console");

// Database Route

// POST Login User (à jour sequelize)
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
          userId: user.id,
          token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "24h"
          })
        });
      });
    }
  });
};

// POST Signup User (à jour sequelize)
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
    console.log(user);
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

// GET User Profile (à jour sequelize mais problème d'auth)
exports.getUserProfile = (req, res) => {
  console.log("ah");
  const { id } = req.params; // a voir si on prend l'id ici
  model.User.findOne({
    where: { id: id }
  }).then(user => {
    if (!user) {
      res.status(401).json({
        error: "Utilisateur non trouvé"
      });
    } else {
      res.status(201).json({ user });
    }
  });
};

// PATCH User Profile (à jour sequelize mais problème auth)
exports.updateUserProfile = (req, res) => {
  const { firstName, lastName, email } = req.body;

  // attention , ici c'est bien decodeUid qu'il faut conserver, mais comme problème auth, on fait autrement pour tester sur postman
  // const user = decodeUid(req.headers.authorization);
  // User.update(
  //   { firstName: firstName, lastName: lastName, email: email },
  //   {
  //     where: {
  //       id: user.id
  //     }
  //   }
  // );

  const { id } = req.params;
  console.log(firstName);
  console.log(id);

  model.User.update(
    { firstName: firstName, lastName: lastName, email: email },
    {
      where: {
        id: id
      }
    }
  ).then(() => res.status(201).json({}));
};

// PUT User Password (pas à jour)
exports.updatePassword = (req, res) => {
  console.log("updatePassword");
  const { password, newPassword } = req.body;
  // const user = decodeUid(req.headers.authorization);
  // bcrypt.hash(password, 10).then(hash => {
  //   model.User.update(
  //     { password: hash },
  //     {
  //       where: {
  //         id: user.id
  //       }
  //     }
  //   );
  // });

  //comparer le password tapé avec celui du user connecté

  const { id } = req.params;
  model.User.findOne({
    where: { id: id }
  }).then(user => {
    bcrypt.compare(password, user.password).then(valid => {
      console.log(valid);
      if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      } else if (password === newPassword) {
        return res
          .status(401)
          .json({ error: "Nouveau mot de passe identique" });
      }
      bcrypt
        .hash(newPassword, 10)
        .then(hash => {
          model.User.update(
            { password: hash },
            {
              where: {
                id: id
              }
            }
          );
        })
        .then(() => res.status(201).json({ user }));
    });
  });
};
