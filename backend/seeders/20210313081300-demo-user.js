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
          firstName: "Pierre",
          lastName: "Potin",
          email: "pierrepotin21@gmail.com",
          password: await bcrypt.hash("pierre", 10),
          moderator: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Tibo",
          lastName: "Potin",
          email: "tibopotin21@gmail.com",
          password: await bcrypt.hash("tibo", 10),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Jules",
          lastName: "Potin",
          email: "julespotin21@gmail.com",
          password: await bcrypt.hash("jules", 10),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Gilles",
          lastName: "Potin",
          email: "gillespotin21@gmail.com",
          password: await bcrypt.hash("gilles", 10),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Jocelyne",
          lastName: "Potin",
          email: "jocelynepotin21@gmail.com",
          password: await bcrypt.hash("jocelyne", 10),
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
