const mysql = require("mysql");
require("dotenv").config();

const connectParams = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWD
});

// DataBase
//====================================================================

const schema = `CREATE DATABASE ${process.env.SQL_DB}`;

const runInstall = () => {
  const cycle = async () => {
    const createDB = () => {
      return new Promise((resolve, reject) => {
        try {
          connectParams.connect(function (err) {
            if (err) throw err;
            console.log(
              "--- Bienvenu au configurateur de la base de données pour groupomania ---"
            );
            console.log("Veuillez patienter quelques seconds...");
            console.log("Connecté au serveur MySQL");
            connectParams.query(schema, function (err, result) {
              if (err) throw err;
              console.log(`Schema ${process.env.SQL_DB} créé correctement`);
              resolve(true);
            });
          });
        } catch (err) {
          reject(err);
        }
      });
    };
    await createDB();
  };
  cycle();
};

runInstall();
