const mysql = require("mysql");
require("dotenv").config();

const connectParams = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWD
});

const db = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWD,
  database: process.env.SQL_DB
});

// DB Creation
const schema = `CREATE DATABASE ${process.env.SQL_DB}`;

// Tables creations

const userTable =
  "CREATE TABLE users (id int UNSIGNED AUTO_INCREMENT, firstName VARCHAR(45) NOT NULL, lastName VARCHAR(45)NOT NULL, email VARCHAR(45)NOT NULL, password VARCHAR(45)NOT NULL, active TINYINT(1)NOT NULL DEFAULT 1, PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";

const postTable =
  "CREATE TABLE posts (id int UNSIGNED AUTO_INCREMENT, UsersId int UNSIGNED, title varchar(100) NOT NULL, image_url text NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";

const commentTable =
  "CREATE TABLE comments ( id int UNSIGNED AUTO_INCREMENT, PostsId int UNSIGNED, UsersId int UNSIGNED, message varchar(255) NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";

const runQuery = query => {
  return new Promise((resolve, reject) => {
    try {
      db.query(query, function (err, result) {
        if (err) throw err;
        resolve(true);
      });
    } catch (err) {
      reject(err);
    }
  });
};

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
    db.connect(async function (err) {
      if (err) throw err;
      try {
        const users = await runQuery(userTable);
        console.log("Tableau users créé correctement");
        const post = await runQuery(postTable);
        console.log("Tableau posts créé correctement");
        const comments = await runQuery(commentTable);
        console.log("Tableau comments créé correctement");
        console.log("Votre base de données a été bien configurée");
        console.log("--- Fin du programme ---");
        process.exit();
      } catch (err) {
        console.log("ERROR =>", err);
      }
    });
  };
  cycle();
};

runInstall();
