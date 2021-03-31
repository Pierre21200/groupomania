"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('user', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
     */

    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "Admi",
          lastName: "Nistrateur",
          email: "admin@gmail.com",
          password: await bcrypt.hash("administrateur123", 10),
          moderator: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Pierre",
          lastName: "Alain",
          email: "pierrealain@gmail.com",
          password: await bcrypt.hash("pierrealain123", 10),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Jules",
          lastName: "Boivier",
          email: "julesboivier@gmail.com",
          password: await bcrypt.hash("julesboivier123", 10),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Solene",
          lastName: "Dallo",
          email: "solenedallo@gmail.com",
          password: await bcrypt.hash("solenedallo123", 10),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Mireille",
          lastName: "Carbier",
          email: "mireillecarbier@gmail.com",
          password: await bcrypt.hash("mireillecarbier123", 10),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('User', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  }
};
