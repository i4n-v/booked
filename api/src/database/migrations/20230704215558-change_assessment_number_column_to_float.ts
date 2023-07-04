import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    try {
      await queryInterface.changeColumn('Assessments', 'number', {
        type: sequelize.DECIMAL(10, 2),
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface, sequelize) {
    try {
      await queryInterface.changeColumn('Assessments', 'number', {
        type: sequelize.NUMBER,
      });
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
