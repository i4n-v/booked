import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    try {
      await queryInterface.addColumn('Books', 'free_pages', {
        type: sequelize.INTEGER,
        allowNull: true,
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.removeColumn('Books', 'free_pages');
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
