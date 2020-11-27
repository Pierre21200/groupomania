"use strict";
let Sequelize = require("sequelize");

// On se connecte à notre base de données
let sequelize = new Sequelize(
  process.env.SQL_DB,
  process.env.SQL_USER,
  process.env.SQL_PASSWD,
  {
    host: process.env.SQL_HOST,
    dialect: "mysql",
    logging: false
  }
);

console.log(
  "Connexion à la base de donnée " + process.env.SQL_DB + " effectuée"
);
//on exporte pour utiliser notre connexion depuis les autre fichiers.
module.exports = sequelize;
