import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    try {
      await queryInterface.addColumn('Messages', 'photo_url', {
        type: sequelize.STRING,
        allowNull: true,
      });

      await queryInterface.changeColumn('Messages', 'content', {
        type: sequelize.STRING(7000),
        allowNull: true,
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface, sequelize) {
    try {
      await queryInterface.removeColumn('Messages', 'photo_url');

      await queryInterface.changeColumn('Messages', 'content', {
        type: sequelize.STRING(7000),
        allowNull: false,
      });
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
