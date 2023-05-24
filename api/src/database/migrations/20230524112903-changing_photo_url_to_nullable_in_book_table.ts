import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    await queryInterface.changeColumn('Books', 'photo_url', {
      type: sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, sequelize) {
    await queryInterface.changeColumn('Books', 'photo_url', {
      type: sequelize.STRING,
      allowNull: false,
    });
  },
};

module.exports = migration;
