"use strict";

const { BOOLEAN } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      moderator: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tuto: { type: Sequelize.BOOLEAN, defaultValue: false },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  // permet d'annuler la migration qu'on vient de faire
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  }
};
