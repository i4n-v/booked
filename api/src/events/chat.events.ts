import AuthenticationRepository from '../repositories/authentication.repository';
import jwt from 'jsonwebtoken';
import Auth from '../interfaces/auth.interface';
import MessageRepository from '../repositories/message.repository';
import chatRepository from '../repositories/chat.repository';
import { ISocketEvent } from '../interfaces/socketEvent.interface';
import { Op } from 'sequelize';
import ReadedMessageRepository from '../repositories/readedMessage.repository';
import { sequelizeConnection } from '../config/sequelizeConnection.config';

const chatEvents: ISocketEvent[] = [
  {
    name: 'enter-in-chat',
    listener: async (socket, chat_id) => {
      try {
        const { headers } = socket.handshake;
        const token = headers['x-access-token'] as string;

        if (!token) return;

        const findedToken = await AuthenticationRepository.findByToken(token);

        if (!findedToken) return;

        const chat = await chatRepository.findById(chat_id);

        if (!chat) return;

        const authData = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string) as Auth;

        const unreadedMessages = await MessageRepository.findAll({
          attributes: ['id'],
          where: {
            chat_id: chat.id,
            sender_id: {
              [Op.not]: authData.id,
            },
          },
          include: [
            {
              model: sequelizeConnection.model('ReadedMessage'),
              as: 'readed_messages',
              attributes: [],
              where: {
                user_id: {
                  [Op.not]: authData.id,
                },
              },
            },
          ],
        });

        const messagesToRead = unreadedMessages.map((message) => ({
          message_id: message.id,
          user_id: authData.id,
        }));

        await ReadedMessageRepository.bulkCreate(messagesToRead);
      } catch (error) {
        console.log(error);
      }
    },
  },
];

export default chatEvents;
