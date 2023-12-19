import { NextFunction, Request, Response } from 'express';
import paginationWrapper from '../utils/paginationWrapper';
import { Op } from 'sequelize';
import ChatRepository from '../repositories/chat.repository';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import ChatCreateDto from '../dto/chat/chatCreate.dto';
import UserChatRepository from '../repositories/userChat.repository';
import messages from '../config/messages.config';
import { io } from '../setup';

interface IChatBody extends ChatCreateDto {
  users: string[];
}

class ChatController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { query, auth } = request;
      const page = query.page ? parseInt(query.page as unknown as string) : 1;
      const limit = query.limit ? parseInt(query.limit as unknown as string) : 75;

      const loggedUserChatsLiteral = `(
        SELECT
          "UserChats".chat_id
        FROM
          "UserChats"
          INNER JOIN "Users" as "UsersWithChat" ON "UserChats".user_id = "UsersWithChat".id
        WHERE chat_id IN (
          SELECT "UserChats".chat_id
          FROM "UserChats"
          WHERE "UserChats".user_id = '${auth.id}'
        ) ${
          query.name
            ? `AND "UsersWithChat".name ILIKE '${query.name}%' OR "Chat".name ILIKE '${query.name}%'`
            : ''
        }
      )`;

      const whereStatement: any = {
        id: {
          [Op.in]: sequelizeConnection.literal(loggedUserChatsLiteral),
        },
      };

      const chats = await ChatRepository.findAndCountAll(page, limit, request, whereStatement);

      const wrappedChats = paginationWrapper(chats, page, limit);

      return response.json(wrappedChats);
    } catch (error) {
      next(error);
    }
  }

  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { body, auth } = request;
      const { name, users }: IChatBody = body;

      if (!name) {
        return response.status(400).json({ message: 'O nome do grupo deve ser especificado.' });
      }

      if (!Array.isArray(users) || users.length >= 1) {
        return response
          .status(400)
          .json({ message: 'Ao menos dois participantes do grupo devem ser especificados.' });
      }

      users.push(auth.id);

      await sequelizeConnection.transaction(async (transaction) => {
        const chat = await ChatRepository.create({ name }, transaction);

        const usersToAdd = users.map((userId) => ({
          chat_id: chat.id,
          user_id: userId,
        }));

        await UserChatRepository.bulkCreate(usersToAdd, { transaction });

        for (const userId of users) {
          const receiveChatWithLastMessage = await ChatRepository.findByIdWithUsers(
            chat.id,
            userId,
            request,
            transaction
          );

          io.emit(`receive-chat-${userId}`, receiveChatWithLastMessage);
        }

        return response.json({ message: messages.create('Grupo') });
      });
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        body,
        auth,
        params: { id },
      } = request;
      const { name, users }: IChatBody = body;

      const chat = await ChatRepository.findById(id);

      if (!chat) {
        return response.status(404).json({ message: 'O grupo não foi encontrado.' });
      }

      if (!name && (!Array.isArray(users) || users.length >= 1)) {
        return response
          .status(400)
          .json({ message: 'O nome ou participantes do grupo devem ser especificados.' });
      }

      await sequelizeConnection.transaction(async (transaction) => {
        await ChatRepository.update(chat.id, { name }, transaction);

        if (Array.isArray(users)) {
          users.push(auth.id);

          const chatUsers = await UserChatRepository.findAllByChatId(chat.id, transaction);

          for (const userId of users) {
            const userIsRegistered = chatUsers.some((chatUser) => chatUser.user_id === userId);

            if (!userIsRegistered) {
              await UserChatRepository.create(
                {
                  chat_id: chat.id,
                  user_id: userId,
                },
                transaction
              );
            }
          }

          for (const chatUser of chatUsers) {
            const userIsRegistered = users.some((userId) => chatUser.user_id === userId);

            if (!userIsRegistered) {
              await UserChatRepository.delete(chatUser.id);
            }
          }

          for (const userId of users) {
            const receiveChatWithLastMessage = await ChatRepository.findByIdWithUsers(
              chat.id,
              userId,
              request,
              transaction
            );

            io.emit(`receive-chat-${userId}`, receiveChatWithLastMessage);
          }
        }

        return response.json({ message: messages.update('Grupo') });
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ChatController();
