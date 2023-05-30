import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface) {
    try {
      await queryInterface.removeColumn('Users', 'salt');
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface, sequelize) {
    try {
      await queryInterface.addColumn('Users', 'salt', {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O salt é requerido.',
          },
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
