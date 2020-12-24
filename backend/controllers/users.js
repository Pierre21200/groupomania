"use strict";
// Middleware Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../models/users");

// Database Route

// POST Signup User
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = await req.body;

    if (!firstName || !lastName || !email || !password) {
      throw new Error("Un paramêtre est manquant !");
    }

    const userFound = await model.User.findOne({
      attributes: ["email"],
      where: { email: email }
    });

    if (userFound) {
      throw new Error("Cet email est déjà utilisé !");
    }

    const hash = await bcrypt.hash(password, 10);

    if (!hash) {
      throw new Error("pas de hash");
    }

    const newUser = await model.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash
    });

    if (!newUser) {
      throw new Error("L'inscription a échoué");
    }

    res.status(201).json("L'utilisateur a bien été créé");
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// POST Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (!email || !password) {
      throw new Error("Un paramêtre est manquant !");
    }

    const userFound = await model.User.findOne({
      where: { email: email }
    });
    if (!userFound) {
      throw new Error("Utilisateur inexistant");
    }

    const compare = await bcrypt.compare(password, userFound.password);
    if (!compare) {
      throw new Error("Mot de passe incorrect !");
    }
    res.status(200).json({
      userId: userFound.id,
      token: jwt.sign({ userId: userFound.id }, process.env.JWT_SECRET, {
        expiresIn: "24h"
      })
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

// GET User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const { id } = await req.params;
    if (!id) {
      throw new Error("Un problème est survenu avec l'id de ce profil");
    }

    const userFound = await model.User.findOne({
      where: { id: id }
    });
    if (!userFound) {
      throw new Error("Un problème est survenu avec cet utilisateur");
    }

    res.status(200).json({ userFound });
  } catch (error) {
    res.status(401).json({ error: error.message });
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

// PUT User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await decodeUid(req.headers.authorization);
    if (!user) {
      throw new Error("Problème d'autorisation !");
    }

    const { firstName, lastName, email } = await req.body;

    if (!firstName || !lastName || !email) {
      throw new Error("Un paramêtre est manquant !");
    }

    const updateProfile = await model.User.update(
      { firstName: firstName, lastName: lastName, email: email },
      {
        where: {
          id: user.id
        }
      }
    );

    if (!updateProfile) {
      throw new Error("Le profil n'a pas été mis à jour");
    }

    res.status(200).json({ updateProfile });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// PUT User Password
exports.updatePassword = async (req, res) => {
  try {
    const user = await decodeUid(req.headers.authorization);
    console.log(user.id);
    if (!user) {
      throw new Error("Problème d'autorisation !");
    }
    const { password, newPassword } = await req.body;
    if (!password || !newPassword) {
      throw new Error("Un paramètre est manquant!");
    }
    const meUser = await model.User.findOne({
      where: { id: user.id }
    });
    if (!meUser) {
      throw new Error("Problème d'autorisation !");
    }
    const compare = await bcrypt.compare(password, meUser.password);
    if (!compare) {
      throw new Error("Mot de passe d'origine incorrect !");
    }

    if (password === newPassword) {
      throw new Error(
        "Mot de passe d'origine identique au nouveau mot de passe !"
      );
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    if (!newHash) {
      throw new Error("Problème avec Bcrypt !");
    }

    const newMe = model.User.update(
      { password: newHash },
      {
        where: {
          id: meUser.id
        }
      }
    );
    if (!newMe) {
      throw new Error("Le profile n'a pas été mis a jour ! ");
    }
    res.status(200).json({ newMe });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
