import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    try {
      await queryInterface.changeColumn('Books', 'photo_url', {
        type: sequelize.STRING,
        allowNull: true,
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface, sequelize) {
    try {
      await queryInterface.changeColumn('Books', 'photo_url', {
        type: sequelize.STRING,
        allowNull: false,
      });
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
