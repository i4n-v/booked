import { NextFunction, Request, Response } from 'express';
import paginationWrapper from '../utils/paginationWrapper';
import { Op } from 'sequelize';
import ChatRepository from '../repositories/chat.repository';
import { sequelizeConnection } from '../config/sequelizeConnection.config';

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
}

export default new ChatController();
