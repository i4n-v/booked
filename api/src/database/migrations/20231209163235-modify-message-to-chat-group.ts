import { Migration } from 'sequelize-cli';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    try {
      await sequelizeConnection.transaction(async (transaction) => {
        await queryInterface.removeConstraint('Messages', 'Messages_receiver_id_fkey', {
          transaction,
        });

        await queryInterface.removeColumn('Messages', 'receiver_id', { transaction });

        await queryInterface.removeColumn('Messages', 'read', { transaction });

        await queryInterface.addColumn(
          'Messages',
          'book_id',
          {
            type: sequelize.DataTypes.UUID,
            references: {
              model: 'Books',
              key: 'id',
            },
            allowNull: true,
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
        await queryInterface.removeConstraint('Messages', 'Messages_book_id_fkey', {
          transaction,
        });

        await queryInterface.removeColumn('Messages', 'book_id', { transaction });

        await queryInterface.addColumn(
          'Messages',
          'receiver_id',
          {
            type: sequelize.DataTypes.UUID,
            references: {
              model: 'Users',
              key: 'id',
            },
            allowNull: false,
          },
          { transaction }
        );

        await queryInterface.addColumn(
          'Messages',
          'read',
          {
            type: sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
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
