import AuthenticationRepository from '../repositories/authentication.repository';
import jwt from 'jsonwebtoken';
import Auth from '../interfaces/auth.interface';
import MessageRepository from '../repositories/message.repository';
import ChatRepository from '../repositories/chat.repository';
import { ISocketEvent } from '../interfaces/socketEvent.interface';
import { Op } from 'sequelize';
import ReadedMessageRepository from '../repositories/readedMessage.repository';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import UserRepository from '../repositories/user.repository';
import { io } from '../setup';

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

        const chat = await ChatRepository.findById(chat_id);

        if (!chat) return;

        const authData = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string) as Auth;
        const user = await UserRepository.findById(authData.id);

        if (!user) return;

        const unreadedMessages = await MessageRepository.findAll({
          attributes: ['id'],
          where: {
            chat_id: chat.id,
            sender_id: {
              [Op.not]: authData.id,
            },
            '$readed_messages.user_id$': null,
          },
          include: [
            {
              model: sequelizeConnection.model('ReadedMessage'),
              as: 'readed_messages',
              attributes: [],
              required: false,
            },
          ],
        });

        const messagesToRead = unreadedMessages.map((message) => ({
          message_id: message.id,
          user_id: authData.id,
        }));

        await ReadedMessageRepository.bulkCreate(messagesToRead);

        const unreadedChats = await ChatRepository.countUnreadedByReceiverId(authData.id);

        io.emit(`pending-chats-${user.id}`, unreadedChats);
      } catch (error) {
        console.log(error);
      }
    },
  },
];

export default chatEvents;
