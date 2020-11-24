const bcrypt = require("bcrypt");
const model = require("./models/users");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("", "root", "password", {
  dialect: "mysql",
  host: "localhost"
});

try {
  sequelize.authenticate();
  console.log("Connecté à la base de données MySQL!");
  sequelize.query("CREATE DATABASE `groupomania`;").then(res => {
    console.log("Base de données créée !");
  });
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}

// const firstName = "Pierre";
// const lastName = "Potin";
// const email = "Pierrepotin21@gmail.com";
// const password = "Titicaca21200";

// fillUser = (req, res) => {
//   bcrypt.hash(password, 10).then(hash => {
//     model.User.create({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       password: hash
//     })
//       .then(() => {
//         res.status(201).json({});
//       })
//       .catch(err => {
//         res.status(500).json({ err });
//       });
//   });
// };
