# Groupomania : Développement d'un réseau social interne

## Développement Front-end : react (utilisation des hooks), react router, jsonwebtoken pour l'authentification.

- npm install :

  - axios
  - bcrypt
  - jsonwebtoken

- Concernant le frontend, déplacez vous dans le dossier frontend à l’aide de la commande "cd frontend", puis tapez "npm start".

## Développement Backend : node.js, express, jsonwebtoken, helmet et bcrypt.

## Pour la base de donnée : MySql et l'orm sequelize

- Git clôner le projet

- Installez les dépendances comme pour n'importe quel projet (assurez vous d’avoir mySql)

- Dans le dossier backend > config > config.json : remplacez les valeur username et password par les valeurs souhaitées.

- Dans l'invite de commande déplacez vous dans le dossier backend avec la commande cd backend puis :

  - Tapez la commande "npm run create_db"
  - Si vous souhaitez remplir la base de données avec des informations, tapez la commande "npm run fill_db"
  - Pour finir, tapez la commande "npm start"

Vous pouvez maintenant vous connecter avec le compte modérateur suivant :

Email : administrateur: admin@gmail.com
Mot de passe: administrateur123

Ou créer un compte normal.

PORT=4200

SQL_HOST=localhost
SQL_DB=groupomania
JWT_SECRET=t2uxm0dsvf1
JWT_EXPIRES=24h

REACT_APP_API_URL=http://localhost:4200

REACT_APP_JWT_SECRET=t2uxm0dsvf1
