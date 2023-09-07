import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    try {
      queryInterface.addColumn('Users', 'online', {
        type: sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.removeColumn('Users', 'online');
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
