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
          content: "Merci pour le message de bienvenue ! ",
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
        },
        {
          postId: "3",
          userId: "4",
          content: "Non",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postId: "3",
          userId: "5",
          content: "Si",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postId: "3",
          userId: "3",
          content: "C'est un peu juste en argument tout ça...",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postId: "4",
          userId: "2",
          content: "Super motivé pour te faire découvrir la ville !",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postId: "4",
          userId: "5",
          content:
            "Je connais un endroit très sympa à l'ouest de la ville, on se dit mardi soir ?",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postId: "5",
          userId: "3",
          content: "Oh oui j'adore les frites !",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postId: "5",
          userId: "4",
          content:
            "C'est ma femme qui va pas être contente, je vais encore prendre des kilos...",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postId: "6",
          userId: "2",
          content: "Non moi j'adore les compotes !",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          postId: "6",
          userId: "3",
          content:
            "Ahah tu n'as pas l'impression d'exagérer avec tes pétitions ? ",
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
