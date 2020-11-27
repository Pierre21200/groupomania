const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("", "root", "password", {
  dialect: "mysql",
  host: "localhost"
});

const createDb = async () => {
  try {
    // sequelize.authenticate();
    console.log("Connecté à la base de données MySQL!");
    sequelize.query("CREATE DATABASE `groupomania`;").then(res => {
      console.log("Base de données créée !");
    });
  } catch (error) {
    console.error("Impossible de se connecter, erreur suivante :", error);
  }
};

createDb();
