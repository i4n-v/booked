import AuthenticationRepository from '../repositories/authentication.repository';
import { io } from '../setup';
import jwt from 'jsonwebtoken';
import Auth from '../interfaces/auth.interface';
import MessageRepository from '../repositories/message.repository';
import chatRepository from '../repositories/chat.repository';
import { ISocketEvent } from '../interfaces/socketEvent.interface';
import { Op } from 'sequelize';

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

        const date = new Date().toISOString();

        await MessageRepository.update(
          { read: true },
          {
            chat_id: chat.id,
            receiver_id: authData.id,
            read: false,
          }
        );

        const updatedMessages = await MessageRepository.findAll({
          attributes: ['id'],
          where: {
            chat_id: chat.id,
            receiver_id: authData.id,
            read: true,
            updatedAt: {
              [Op.gte]: date,
            },
          },
        });

        const messages = updatedMessages.map(({ id }) => id);

        const senderId =
          chat.first_user_id !== authData.id ? chat.first_user_id : chat.second_user_id;

        io.emit(`updated-messages-${senderId}`, messages);
      } catch (error) {
        console.log(error);
      }
    },
  },
];

export default chatEvents;
