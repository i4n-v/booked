import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    try {
      await queryInterface.changeColumn('Comments', 'book_id', {
        type: sequelize.UUID,
        allowNull: true,
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface, sequelize) {
    try {
      await queryInterface.changeColumn('Comments', 'book_id', {
        type: sequelize.UUID,
        allowNull: false,
      });
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
