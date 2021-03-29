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
      "posts",
      [
        {
          userId: "1",
          titlePost: "Le tout premier post !",
          content: "Bienvenue à tous sur ce réseau ! Blablablablala",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "2",
          titlePost: "Regardez cette blague !",
          content: "C'est l'histoire de ........",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "3",
          titlePost: "Débattez avec moi !",
          content:
            "La politique actuelle et la gestion de la pandémie blablbalbalbla",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "4",
          titlePost: "Qui est motivé pour des visites ?",
          content:
            "Je suis nouveau dans l'entreprise et dans cette ville, qui m'accompagne pour des visites ? ",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "5",
          titlePost: "Pétition pour le self",
          content:
            "Je met en ligne une pétition pour avoir plus de frites à la cantine !",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "5",
          titlePost: "Une autre pétition pour les compotes",
          content:
            "Désolé mais je n'aime vraiment pas les compotes et il y en a tout le temps",
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
