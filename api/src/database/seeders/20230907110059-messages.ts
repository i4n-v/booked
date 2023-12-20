import { v4 } from 'uuid';
import { Migration } from 'sequelize-cli';
import { sequelizeConnection } from '../../config/sequelizeConnection.config';
import MessageCreateDto from '../../dto/message/messageCreate.dto';
import Chat from '../models/chat.model';
import { faker } from '@faker-js/faker';

interface Message extends MessageCreateDto {
  id: string;
  chat_id: string;
  createdAt: Date;
  updatedAt: Date;
}

const seeder: Migration = {
  async up(queryInterface) {
    await sequelizeConnection.transaction(async (transaction) => {
      const chats = (await sequelizeConnection.model('Chat').findAll({
        include: [
          {
            model: sequelizeConnection.model('User'),
            attributes: ['id'],
            through: { attributes: [] },
          },
        ],
        transaction,
      })) as Chat[];

      const messages: Message[] = [];

      chats.forEach((chat) => {
        for (let i = 0; i < 20; i++) {
          if (i % 2 === 0) {
            messages.push({
              id: v4(),
              chat_id: chat.id,
              sender_id: chat.users[0].id,
              content: faker.lorem.sentence(),
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          } else {
            messages.push({
              id: v4(),
              chat_id: chat.id,
              sender_id: chat.users[1].id,
              content: faker.lorem.sentence(),
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        }
      });

      await queryInterface.bulkInsert('Messages', messages, { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Messages', {});
  },
};

export = seeder;
