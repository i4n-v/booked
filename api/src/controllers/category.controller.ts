import { NextFunction, Request, Response } from 'express';
import paginationWrapper from '../utils/paginationWrapper';
import CategoryRepository from '../repositories/category.repository';
import { Op } from 'sequelize';

class BookController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { query } = request;
      const page = query.page ? parseInt(query.page as unknown as string) : 1;
      const limit = query.page ? parseInt(query.limit as unknown as string) : 75;
      const whereStatement: any = {};

      if (query.name) {
        whereStatement['name'] = {
          [Op.like]: `${query.name}%`,
        };
      }

      const categories = await CategoryRepository.findAndCountAll(page, limit, whereStatement);

      const wrappedCategories = paginationWrapper(categories, page, limit);

      return response.json(wrappedCategories);
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
