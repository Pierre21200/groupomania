"use strict";
let Sequelize = require("sequelize");
let sequelize = require("./index.js");

const Post = sequelize.define(
  "post",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: Sequelize.INTEGER, allowNull: false },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    titlePost: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    content: { type: Sequelize.STRING(255), allowNull: false }
  },
  { tableName: "post", timestamps: false, underscored: true } //par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique pour les dates de création et de modification (très pratique si nécessaire) et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId".
);

Post.associate = models => {
  Post.belongsTo(models.User, {
    foreignKey: {
      allowNull: false
    }
  });
  Post.hasMany(
    models.Comments,
    { foreignKey: "postId" },
    { onDelete: "cascade" }
  );
};

exports.Post = Post;
