"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("subscriptions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      adventure_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "adventure_types", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      adventure_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "adventures", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("subscriptions");
  }
};
