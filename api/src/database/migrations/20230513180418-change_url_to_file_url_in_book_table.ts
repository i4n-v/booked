import { Migration } from 'sequelize-cli';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';

const migration: Migration = {
  async up(queryInterface, sequelize) {
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
  },

  async down(queryInterface, sequelize) {
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
  },
};

module.exports = migration;
