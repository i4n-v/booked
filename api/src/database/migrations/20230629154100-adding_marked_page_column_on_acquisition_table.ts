import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    try {
      await queryInterface.addColumn('Acquisitions', 'marked_page', {
        type: sequelize.INTEGER,
        allowNull: true,
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.removeColumn('Acquisitions', 'marked_page');
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
