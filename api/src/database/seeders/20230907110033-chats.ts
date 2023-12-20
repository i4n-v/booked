import { Migration } from 'sequelize-cli';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';
import { randomNumbers } from '../../utils';
import ChatRepository from '../../repositories/chat.repository';
import UserChatRepository from '../../repositories/userChat.repository';

const seeder: Migration = {
  async up() {
    await sequelizeConnection.transaction(async (transaction) => {
      const users = await sequelizeConnection.model('User').findAll({
        limit: 40,
        attributes: ['id'],
        transaction,
      });

      for (const { id } of users) {
        const indexes = randomNumbers(0, users.length - 1, 10);

        for (const index of indexes) {
          if (users[index].id !== id) {
            const chat = await ChatRepository.create({}, transaction);
            await UserChatRepository.bulkCreate(
              [
                { user_id: id, chat_id: chat.id },
                { user_id: users[index].id, chat_id: chat.id },
              ],
              {
                transaction,
              }
            );
          }
        }
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Chats', {});
  },
};

export = seeder;
