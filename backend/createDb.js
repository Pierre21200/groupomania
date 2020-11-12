const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("", "root", "password", {
  dialect: "mysql",
  host: "localhost"
});

try {
  sequelize.authenticate();

  console.log("Connecté à la base de données MySQL!");

  sequelize
    .query("CREATE DATABASE `groupomania`;")
    .then(([results, metadata]) => {
      console.log("Base de données créée !");
    });
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}
