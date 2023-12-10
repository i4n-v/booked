import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, sequelize) {
    try {
      await queryInterface.createTable('MessageBooks', {
        id: {
          type: sequelize.DataTypes.UUID,
          defaultValue: sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        book_id: {
          type: sequelize.DataTypes.UUID,
          references: {
            model: 'Books',
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
      await queryInterface.dropTable('MessageBooks');
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
