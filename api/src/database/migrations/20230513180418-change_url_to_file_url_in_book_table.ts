import { Migration } from 'sequelize-cli';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    try {
      await sequelizeConnection.transaction(async (transaction) => {
        await queryInterface.renameColumn('Books', 'url', 'file_url', { transaction });

        await queryInterface.renameColumn('Books', 'decription', 'description', { transaction });

        await queryInterface.changeColumn(
          'Books',
          'price',
          {
            type: sequelize.DECIMAL(10, 2),
          },
          { transaction }
        );
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface, sequelize) {
    try {
      await sequelizeConnection.transaction(async (transaction) => {
        await queryInterface.renameColumn('Books', 'file_url', 'url', { transaction });

        await queryInterface.renameColumn('Books', 'description', 'decription', { transaction });

        await queryInterface.changeColumn(
          'Books',
          'price',
          {
            type: sequelize.INTEGER,
          },
          { transaction }
        );
      });
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
