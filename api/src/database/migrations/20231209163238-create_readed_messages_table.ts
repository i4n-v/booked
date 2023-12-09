import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    try {
      await queryInterface.createTable('ReadedMessages', {
        id: {
          type: sequelize.DataTypes.UUID,
          defaultValue: sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        user_id: {
          type: sequelize.DataTypes.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false,
        },
        message_id: {
          type: sequelize.DataTypes.UUID,
          references: {
            model: 'Messages',
            key: 'id',
          },
          allowNull: false,
        },
        createdAt: {
          type: sequelize.DATE,
          allowNull: false,
          defaultValue: sequelize.fn('NOW'),
        },
        updatedAt: {
          type: sequelize.DATE,
          allowNull: false,
          defaultValue: sequelize.fn('NOW'),
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable('ReadedMessages');
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
