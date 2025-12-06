"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("scores", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      // Renamed fields
      registrationNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      math: { type: Sequelize.FLOAT, allowNull: true },
      literature: { type: Sequelize.FLOAT, allowNull: true },
      foreignLanguage: { type: Sequelize.FLOAT, allowNull: true },
      physics: { type: Sequelize.FLOAT, allowNull: true },
      chemistry: { type: Sequelize.FLOAT, allowNull: true },
      biology: { type: Sequelize.FLOAT, allowNull: true },
      history: { type: Sequelize.FLOAT, allowNull: true },
      geography: { type: Sequelize.FLOAT, allowNull: true },
      civicEducation: { type: Sequelize.FLOAT, allowNull: true },
      foreignLanguageCode: { type: Sequelize.STRING(10), allowNull: true },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Index for faster searching
    await queryInterface.addIndex("scores", ["registrationNumber"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("scores");
  },
};
