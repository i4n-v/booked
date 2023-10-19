import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('Acquisitions', {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false,
        },
        book_id: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'Books',
            key: 'id',
          },
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  async down(queryInterface) {
    try {
      await queryInterface.dropTable('Acquisitions');
    } catch (error: any) {
      console.log(error);
    }
  },
};

module.exports = migration;
