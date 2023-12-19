import { Migration } from 'sequelize-cli';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';

const migration: Migration = {
  async up(queryInterface) {
    try {
      await sequelizeConnection.transaction(async (transaction) => {
        await queryInterface.removeConstraint('Chats', 'Chats_first_user_id_fkey', { transaction });
        await queryInterface.removeColumn('Chats', 'first_user_id', { transaction });
        await queryInterface.removeConstraint('Chats', 'Chats_second_user_id_fkey', {
          transaction,
        });
        await queryInterface.removeColumn('Chats', 'second_user_id', { transaction });
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await sequelizeConnection.transaction(async (transaction) => {
        await queryInterface.addColumn(
          'Chats',
          'first_user_id',
          {
            type: Sequelize.DataTypes.UUID,
            references: {
              model: 'Users',
              key: 'id',
            },
            allowNull: false,
          },
          { transaction }
        );

        await queryInterface.addColumn(
          'Chats',
          'second_user_id',
          {
            type: Sequelize.DataTypes.UUID,
            references: {
              model: 'Users',
              key: 'id',
            },
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
