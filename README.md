Groupomania : Développement d'un réseau social interne

Développement Front-end : react (utilisation des hooks), react router, jsonwebtoken pour l'authentification.

Développement Backend : node.js, express, jsonwebtoken, helmet et bcrypt.

Pour la base de donnée : MySql et l'orm sequelize

- Git clôner le projet

- Installez les dépendances comme pour n'importe quel projet(assurez vous d’avoir mySql)

- Ouvrez deux fichiers :

  - Dans le dossier backend > env. : remplacez les valeurs SQL_USER et SQL_PASSWORD par vos données d'accès à la base de donneé.
  - Dans le dossier backend > config > config.json : remplacez les valeur username et password par les valeurs respectives rentrées plus haut.
    ATTENTION : SQL_USER doit être égale à la valeur "username", SQL_PASSWORD doit être égale à la valeur password.

- Dans l'invite de commande déplacez vous dans le dossier backend avec la commande cd backend puis :

  - Tapez "node config_db.js" : cette commande va créer la base de données.
  - Tapez "npx sequelize db:migrate" : cette commande va créer les tables à l'intérieur de la base de données.
  - Tapez "npx sequelize-cli db:seed:all" : cette commande va insérer des données pré-établies à l'intérieur de votre base.
  - Et enfin, tapez "npm start" pour démarrer le serveur.

Concernant le frontend, déplacez vous dans le dossier frontend à l’aide de la commande "cd frontend", puis tapez "npm start".

Vous pouvez maintenant vous connecter avec le compte modérateur suivant :

Email : administrateur: admin@gmail.com
Mot de passe: admin123

Ou créer un autre compte normal.
