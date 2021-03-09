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

// console.log(
//   "Connexion à la base de donnée " + process.env.SQL_DB + " effectuée"
// );

// INSERT INTO nom_table (colonne1, colonne4, colonne2)
// VALUES ('data_colonne1', 'data_colonne4', 'data_colonne2');

// try {
//   sequelize.authenticate();
//   console.log("Connecté à la base de données MySQL!");
//   sequelize
//     .query(
//       "INSERT INTO user (first_name, last_name, email, password) VALUES ('Pierre', 'Potin', 'pierrepotin21@gmail.com', 'piopio')"
//     )
//     .then(([results, metadata]) => {
//       console.log("Base de données créée !");
//     });
// } catch (error) {
//   console.error("Impossible de se connecter, erreur suivante :", error);
// }

//on exporte pour utiliser notre connexion depuis les autre fichiers.
module.exports = sequelize;
