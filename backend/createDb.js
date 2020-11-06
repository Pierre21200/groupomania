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
  "CREATE TABLE `users` (`id` int UNSIGNED AUTO_INCREMENT, `firstName` varchar(45)  utf8_bin NOT NULL, `lastName` varchar(45)  utf8_bin NOT NULL, `email` varchar(45)  utf8_bin NOT NULL, `password` varchar(45)  utf8_bin NOT NULL, 'active' tinyint(1) utf8_bin NOT NULL DEFAULT 1, PRIMARY KEY (`id`), UNIQUE INDEX `email_UNIQUE` (`email`), ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 =utf8_bin;";

const postTable =
  "CREATE TABLE `posts` (`id` int UNSIGNED AUTO_INCREMENT, `UsersId` int UNSIGNED, `title` varchar(100) utf8_bin NOT NULL, `image_url` text utf8_bin NOT NULL, PRIMARY KEY (`id`,`UsersId`), CONSTRAINT fk_usersId_id FOREIGN KEY (usersId) REFERENCES users(id), ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 =utf8_bin;";

const commentTable =
  "CREATE TABLE `comments` ( `id` int UNSIGNED AUTO_INCREMENT, `PostsId` int UNSIGNED, `UsersId` int UNSIGNED, `message` varchar(255)  utf8_bin NOT NULL, PRIMARY KEY (`id`,`PostsId`,`UsersId'), CONSTRAINT fk_postsId_usersid_id FOREIGN KEY (postsId usersId) REFERENCES posts(id, usersId), ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 =utf8_bin;";

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
        const categories = await runQuery(categoriesTable);
        console.log("Tableau categories créé correctement");
        const categoryValues = await runQuery(InsertCategories);
        console.log("categories créées correctement");
        const post = await runQuery(postTable);
        console.log("Tableau posts créé correctement");
        const comments = await runQuery(commentsTable);
        console.log("Tableau comments créé correctement");
        const reactions = await runQuery(reactionsTable);
        console.log("Tableaux reactions créé correctement");
        const selectInfo = await runQuery(globalSelect);
        console.log("option global select activée");
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
