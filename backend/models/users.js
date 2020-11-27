"use strict";
let Sequelize = require("sequelize");
let sequelize = require("./index.js");

const User = sequelize.define(
  "user",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: {
      type: Sequelize.STRING(255),
      allowNull: false,
      notNull: { args: true, msg: "You must enter a name" }
    },
    lastName: { type: Sequelize.STRING(255), allowNull: false },
    email: { type: Sequelize.STRING(255), allowNull: false },
    password: { type: Sequelize.STRING(255), allowNull: false }
  },
  { tableName: "user", timestamps: false, underscored: true } //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique pour les dates de création et de modification (très pratique si nécessaire) et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId".
);

User.associate = models => {
  User.hasMany(models.Post, { foreignKey: "userId" }, { onDelete: "cascade" });
};

sequelize.sync({});
exports.User = User;
