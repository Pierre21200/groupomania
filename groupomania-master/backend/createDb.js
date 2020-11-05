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

// moderate 1 ou 0 au user, ou au post ?
