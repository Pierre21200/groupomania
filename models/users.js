"use strict";
let Sequelize = require("sequelize");
let sequelize = require("./index.js");
const bcrypt = require("bcrypt");

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

const createUsers = async () => {
  const email = "pierrepotin21@gmail.com";
  const userFound = await User.findOne({
    where: { email: email }
  });
  if (!userFound) {
    await User.create({
      firstName: "Pierre",
      lastName: "Potin",
      email: "pierrepotin21@gmail.com",
      password: await bcrypt.hash("piopio", 10),
      moderator: true
    });
    await User.create({
      firstName: "Tibo",
      lastName: "Potin",
      email: "tibopotin21@gmail.com",
      password: await bcrypt.hash("piopio", 10)
    });
    await User.create({
      firstName: "Gilles",
      lastName: "Potin",
      email: "gillespotin21@gmail.com",
      password: await bcrypt.hash("piopio", 10)
    });
    await User.create({
      firstName: "Jules",
      lastName: "Potin",
      email: "julespotin21@gmail.com",
      password: await bcrypt.hash("piopio", 10)
    });
    await User.create({
      firstName: "Jocelyne",
      lastName: "Potin",
      email: "Jocelynepotin21@gmail.com",
      password: await bcrypt.hash("piopio", 10)
    });
    await User.create({
      firstName: "Matt",
      lastName: "Potin",
      email: "mattpotin21@gmail.com",
      password: await bcrypt.hash("piopio", 10)
    });
  } else {
    console.log("db already fill");
  }
};

createUsers();
exports.User = User;
