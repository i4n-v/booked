import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    try {
      await queryInterface.changeColumn('Books', 'description', {
        type: sequelize.STRING(2000),
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface, sequelize) {
    try {
      await queryInterface.changeColumn('Books', 'description', {
        type: sequelize.STRING,
      });
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
