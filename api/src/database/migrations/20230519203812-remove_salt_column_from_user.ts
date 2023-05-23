import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface) {
    await queryInterface.removeColumn('Users', 'salt');
  },

  async down(queryInterface, sequelize) {
    await queryInterface.addColumn('Users', 'salt', {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'O salt é requerido.',
        },
      },
    });
  },
};

module.exports = migration;
