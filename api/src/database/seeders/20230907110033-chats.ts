import { v4 } from 'uuid';
import { Migration } from 'sequelize-cli';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';
import { randomNumbers } from '../../utils';
import ChatCreateDto from '../../dto/chat/chatCreate.dto';

interface Chat extends ChatCreateDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const seeder: Migration = {
  async up(queryInterface) {
    await sequelizeConnection.transaction(async (transaction) => {
      const users = await sequelizeConnection.model('User').findAll({
        limit: 40,
        attributes: ['id'],
        transaction,
      });

      const chats: Chat[] = [];

      users.forEach(({ id }) => {
        const indexes = randomNumbers(0, users.length - 1, 10);

        indexes.forEach((index) => {
          if (users[index].id !== id) {
            chats.push({
              id: v4(),
              first_user_id: id,
              second_user_id: users[index].id,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        });
      });

      await queryInterface.bulkInsert('Chats', chats, { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Chats', {});
  },
};

export = seeder;
