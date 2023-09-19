import { NextFunction, Request, Response } from 'express';
import paginationWrapper from '../utils/paginationWrapper';
import { Op } from 'sequelize';
import ChatRepository from '../repositories/chat.repository';

class ChatController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { query, auth } = request;
      const page = query.page ? parseInt(query.page as unknown as string) : 1;
      const limit = query.limit ? parseInt(query.limit as unknown as string) : 75;
      const whereStatement: any = {
        [Op.or]: {
          first_user_id: auth.id,
          second_user_id: auth.id,
        },
      };

      if (query.name) {
        whereStatement['name'] = {
          [Op.iLike]: `${query.name}%`,
        };
      }

      const chats = await ChatRepository.findAndCountAll(page, limit, request, whereStatement);

      const wrappedChats = paginationWrapper(chats, page, limit);

      return response.json(wrappedChats);
    } catch (error) {
      next(error);
    }
  }
}

export default new ChatController();
