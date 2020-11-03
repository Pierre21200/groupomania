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

// Création de la base de données
const schema = `CREATE DATABASE ${process.env.SQL_DB}`;

// Création de la table
const userTable =
  "CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(45)  utf8_bin NOT NULL, `lastName` varchar(45)  utf8_bin NOT NULL, `email` varchar(45)  utf8_bin NOT NULL, `password` varchar(45)  utf8_bin NOT NULL, PRIMARY KEY (`id`), UNIQUE KEY `email_UNIQUE` (`email`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 =utf8_bin;";
