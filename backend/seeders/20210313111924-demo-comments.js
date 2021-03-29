"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          postId: "1",
          userId: "1",
          content: "Avec le premier commentaire !",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postId: "1",
          userId: "2",
          content: "Merci pour le message de bienvnue ! ",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postId: "2",
          userId: "5",
          content: "hihi",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postId: "2",
          userId: "4",
          content: "Elle est très drole, je te la pique :D !",
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
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
