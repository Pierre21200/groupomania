"use strict";
// Middleware Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../models/users");
const modelC = require("../models/comments");
const modelP = require("../models/posts");

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
    res.status(201).json({
      user: newUser,
      token: jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "24h"
      })
    });
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

    if (!userFound.active) {
      throw new Error("Utilisateur inactif !");
    }

    res.status(200).json({
      user: userFound,
      token: jwt.sign({ userId: userFound.id }, process.env.JWT_SECRET, {
        expiresIn: "24h"
      })
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
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

// // GET All Users : à ne pas utiliser en fait, potentiellement modos
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await model.User.findAll({
      order: [["id", "DESC"]]
    });
    if (!allUsers) {
      throw new Error(
        "Un problème est survenu lors du chargement des utilisateurs !"
      );
    }
    res.status(200).json({ allUsers });
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
    res.status(401).json({ error });
  }
};

// PUT User Password
exports.updatePassword = async (req, res) => {
  try {
    const user = await decodeUid(req.headers.authorization);
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

exports.inactiveProfile = async (req, res) => {
  try {
    const user = await decodeUid(req.headers.authorization);
    if (!user) {
      throw new Error("Problème d'autorisation !");
    }

    const updateProfile = await model.User.update(
      { active: false },
      {
        where: {
          id: user.id
        }
      }
    );

    const updateComments = await modelC.Comment.update(
      { active: false },
      {
        where: {
          userId: id
        }
      }
    );

    const updatePosts = await modelP.Post.update(
      { active: false },
      {
        where: {
          userId: id
        }
      }
    );

    if (!updateProfile) {
      throw new Error("Le profil n'a pas été inactivé");
    }

    res.status(200).json({ updateProfile });
  } catch (error) {
    res.status(401).json({ error });
  }
};

// pour modo
exports.inactiveUser = async (req, res) => {
  try {
    const { id } = await req.body;
    if (!id) {
      throw new Error("Il manque l'identifiant dans la requête");
    }

    const updateProfile = await model.User.update(
      { active: false },
      {
        where: {
          id: id
        }
      }
    );

    const updateComments = await modelC.Comment.update(
      { active: false },
      {
        where: {
          userId: id
        }
      }
    );

    const updatePosts = await modelP.Post.update(
      { active: false },
      {
        where: {
          userId: id
        }
      }
    );

    if (!updateComments) {
      throw new Error("Les commentaires n'ont pas été désactivé");
    }

    if (!updateProfile) {
      throw new Error("Le profil n'a pas été désactivé");
    }

    res.status(200).json({ updateProfile });
  } catch (error) {
    res.status(401).json({ error });
  }
};
