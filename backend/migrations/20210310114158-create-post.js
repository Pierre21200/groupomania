"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Posts",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER
        },
        titlePost: {
          type: Sequelize.STRING
        },
        content: {
          type: Sequelize.STRING
        },
        active: {
          type: Sequelize.BOOLEAN
        }
      },
      {
        timestamps: false
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Posts");
  }
};
