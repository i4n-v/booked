import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('Users', 'salt', {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.removeColumn('Users', 'salt');
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
