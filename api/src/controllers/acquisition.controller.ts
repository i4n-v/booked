import { NextFunction, Request, Response } from 'express';
import messages from '../config/messages.config';
import AcquisitionRepository from '../repositories/acquisition.repository';
import BookRepository from '../repositories/book.repository';
import { Op } from 'sequelize';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import paginationWrapper from '../utils/paginationWrapper';
import AcquisitionUpdateDto from '../dto/acquisition/acquisitionUpdate.dto';

class CommentController {
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, params } = request;
      const bookId = params.id;

      const book = await BookRepository.findById(bookId);

      if (!book) {
        return response.status(404).json({ message: messages.unknown('Livro') });
      }

      if (book.price !== 0) {
        return response
          .status(400)
          .json({ message: 'Não é possível adquirir livros pagos no momento.' });
      }

      await AcquisitionRepository.create({
        user_id: auth.id,
        book_id: bookId,
      });

      return response.json({ message: 'Livro adquirido com sucesso!' });
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, params, body } = request;
      const acquisitionId = params.id;
      const { marked_page }: AcquisitionUpdateDto = body;

      const acquisition = await AcquisitionRepository.findById(acquisitionId);

      if (!acquisition) {
        return response.status(404).json({ message: messages.unknown('Acquisição') });
      }

      if (acquisition.user_id !== auth.id) {
        return response.status(401).json({
          message: messages.unauthorized(),
        });
      }

      await AcquisitionRepository.update(acquisitionId, {
        marked_page,
      });

      return response.json({ message: messages.update('Aquisição') });
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, query } = request;
      const page = query.page ? parseInt(query.page as unknown as string) : 1;
      const limit = query.limit ? parseInt(query.limit as unknown as string) : 75;
      const { search, min_date, max_date, categories } = query;
      let whereStatement: any = {
        ['$acquisitions.id$']: auth.id,
      };

      if (search) {
        whereStatement = {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              '$user.name$': {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        };
      }

      if (min_date || max_date) {
        whereStatement['$acquisitions->Acquisition.createdAt$'] = {
          [Op.gte]: startOfDay(min_date ? parseISO(min_date as string) : new Date()),
          [Op.lte]: endOfDay(max_date ? parseISO(max_date as string) : new Date()),
        };
      }

      if (categories) {
        whereStatement['$categories.id$'] = {
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
}

export default new CommentController();
