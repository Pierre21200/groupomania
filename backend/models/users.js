"use strict";
let Sequelize = require("sequelize");
let sequelize = require("./index.js");

const User = sequelize.define(
  "user",
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    moderator: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    firstName: {
      type: Sequelize.STRING(255),
      allowNull: false,
      notNull: { args: true, msg: "You must enter a name" }
    },
    lastName: { type: Sequelize.STRING(255), allowNull: false },
    email: { type: Sequelize.STRING(255), allowNull: false },
    password: { type: Sequelize.STRING(255), allowNull: false }
  },
  { tableName: "user", timestamps: false, underscored: true }
);

User.associate = models => {
  User.hasMany(models.Post, { foreignKey: "userId" }, { onDelete: "cascade" });
};

sequelize.sync({});
exports.User = User;
