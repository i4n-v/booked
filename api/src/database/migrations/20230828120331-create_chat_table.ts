import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('Chats', {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        first_user_id: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false,
        },
        second_user_id: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false,
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable('Chats');
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
