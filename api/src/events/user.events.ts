import AuthenticationRepository from '../repositories/authentication.repository';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user.repository';
import Auth from '../interfaces/auth.interface';
import { io } from '../setup';
import { ISocketEvent } from '../interfaces/socketEvent.interface';
import ChatRepository from '../repositories/chat.repository';

const userEvents: ISocketEvent[] = [
  {
    name: 'connection',
    listener: async (socket) => {
      try {
        const { headers } = socket.handshake;
        const token = headers['x-access-token'] as string;

        if (!token) return;

        const findedToken = await AuthenticationRepository.findByToken(token);

        if (!findedToken) return;

        const authData = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string) as Auth;
        const user = await UserRepository.findById(authData.id);

        if (!user) return;

        if (!user.online) {
          await UserRepository.update(user.id, { online: true });
          const unreadedChats = await ChatRepository.countUnreadedByReceiverId(user.id);

          io.emit(`pending-chats-${user.id}`, unreadedChats);
          io.emit(`user-connect-${user.id}`, user.id);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  {
    name: 'disconnect',
    listener: async (socket) => {
      try {
        const { headers } = socket.handshake;
        const token = headers['x-access-token'] as string;

        if (!token) return;

        const findedToken = await AuthenticationRepository.findByToken(token);

        if (!findedToken) return;

        const authData = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string) as Auth;

        await UserRepository.update(authData.id, { online: false });

        io.emit(`user-disconnect-${authData.id}`, authData.id);
      } catch (error) {
        console.log(error);
      }
    },
  },
];

export default userEvents;
