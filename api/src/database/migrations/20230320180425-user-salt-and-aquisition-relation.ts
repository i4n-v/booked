import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'salt', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    queryInterface.removeColumn('Users', 'salt');
  },
};

export default migration;
