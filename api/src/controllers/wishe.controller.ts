import { NextFunction, Request, Response } from 'express';
import BookRepository from '../repositories/book.repository';
import WisheRepository from '../repositories/wishe.repository';
import messages from '../config/messages.config';
import paginationWrapper from '../utils/paginationWrapper';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { Op } from 'sequelize';

class WisheController {
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, params } = request;
      const bookId = params.id;

      const book = await BookRepository.findById(bookId);

      if (!book) {
        return response.status(404).json({ message: messages.unknown('Livro') });
      }

      await WisheRepository.create({
        user_id: auth.id,
        book_id: bookId,
      });

      return response.json({ message: 'Livro adicionado na lista de desejos com sucesso!' });
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, query } = request;
      const page = query.page ? parseInt(query.page as unknown as string) : 1;
      const limit = query.limit ? parseInt(query.limit as unknown as string) : 75;

      let whereStatement: any = {};

      const { search, min_date, max_date, categories } = query;

      if (search) {
        whereStatement = {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        };
      }

      if (min_date || max_date) {
        whereStatement['createdAt'] = {
          [Op.gte]: startOfDay(min_date ? parseISO(min_date as string) : new Date()),
          [Op.lte]: endOfDay(max_date ? parseISO(max_date as string) : new Date()),
        };
      }

      if (categories) {
        whereStatement['category'] = {
          [Op.in]: categories,
        };
      }

      const books = await BookRepository.findAndCountAll(page, limit, request, whereStatement);

      const wrappedBooks = paginationWrapper(books, page, limit);

      return response.json(wrappedBooks);
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, params } = request;
      const wisheId = params.id;

      const wishe = await WisheRepository.findById(wisheId);

      if (!wishe) return response.status(404).json({ message: messages.unknown('Desejo') });

      if (wishe.user_id !== auth.id) {
        return response.status(401).json({ message: messages.unauthorized() });
      }

      await WisheRepository.deleteById(wisheId);

      return response.json({ message: messages.delete('Desejo') });
    } catch (error) {
      next(error);
    }
  }
}

export default new WisheController();
