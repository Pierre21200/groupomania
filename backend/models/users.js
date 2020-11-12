"use strict";
let Sequelize = require("sequelize");

// On se connecte à notre base de données
let sequelize = new Sequelize("groupomania", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  logging: false //passer a true pour voir les différentes requêtes effectuées par l'ORM
});
//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = (module.exports = {});
exports.sequelize = sequelize;

const User = sequelize.define(
  "user",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: Sequelize.STRING(255), allowNull: false },
    lastName: { type: Sequelize.STRING(255), allowNull: false },
    email: { type: Sequelize.STRING(255), allowNull: false },
    password: { type: Sequelize.STRING(255), allowNull: false }
  },
  { tableName: "user", timestamps: false, underscored: true } //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique pour les dates de création et de modification (très pratique si nécessaire) et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId".
);

sequelize.sync({});
exports.User = User;
