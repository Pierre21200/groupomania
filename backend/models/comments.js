"use strict";
let Sequelize = require("sequelize");
let sequelize = require("./index.js");

const Comment = sequelize.define(
  "comment",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    postId: { type: Sequelize.INTEGER, allowNull: false },
    userId: { type: Sequelize.INTEGER, allowNull: false },
    comm: { type: Sequelize.STRING(255), allowNull: false }
  },
  { tableName: "comment", timestamps: false, underscored: true } //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique pour les dates de création et de modification (très pratique si nécessaire) et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId".
);

Comment.associate = models => {
  Comment.belongsTo(models.Users, {
    foreignKey: {
      allowNull: false
    }
  });
  Comment.belongsTo(models.Posts, {
    foreignKey: {
      allowNull: false
    }
  });
};

exports.Comment = Comment;
