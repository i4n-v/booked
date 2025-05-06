import { NextFunction, Request, Response } from 'express';
import messages from '../config/messages.config';
import BookRepository from '../repositories/book.repository';
import BookCreateDto from '../dto/book/bookCreate.dto';
import paginationWrapper from '../utils/paginationWrapper';
import BookUpdateDto from '../dto/book/bookUpdate.dto';
import { Op } from 'sequelize';
import { sequelizeConnection } from '../config/sequelizeConnection.config';
import BookCategoryRepository from '../repositories/bookCategory.repository';
import BookCategoryCreateDto from '../dto/bookCategory/bookCategoryCreate.dto';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { del, put } from '@vercel/blob';

interface MulterUploadedFiles {
  photo?: Express.Multer.File[];
  file?: Express.Multer.File[];
}

class BookController {
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { auth, body } = request;
      const files = request.files as unknown as MulterUploadedFiles;
      const { name, price, free_pages, description, user_id, categories }: BookCreateDto = body;
      let file_url;
      let photo_url;

      if (user_id !== auth.id) {
        return response.status(401).json({
          message: messages.unauthorized(),
        });
      }

      if (files?.photo) {
        const photo = files.photo[0];
        const path = `users/${user_id}/images/${photo.originalname}`;

        const blob = await put(path, photo.buffer, {
          access: 'public',
        });

        photo_url = blob.url;
      }

      if (files?.file) {
        const file = files.file[0];
        const path = `users/${user_id}/files/${file.originalname}`;

        const blob = await put(path, file.buffer, {
          access: 'public',
        });

        file_url = blob.url;
      } else {
        return response.status(400).json({
          message: 'O arquivo do livro é obrigatório.',
        });
      }

      if (!categories) {
        return response.status(400).json({
          message: 'Ao menos uma categoria deve ser informada.',
        });
      }

      const transaction = await sequelizeConnection.transaction();

      try {
        const book = await BookRepository.create(
          {
            user_id,
            name,
            price,
            free_pages,
            description,
            photo_url,
            file_url,
          },
          {
            transaction,
          }
        );

        const categoriesToMap = Array.isArray(categories) ? categories : [categories];

        const bookCategories = categoriesToMap.map((id) => ({
          book_id: book.id,
          category_id: id,
        }));

        await BookCategoryRepository.bulkCreate(bookCategories, {
          transaction,
        });

        await transaction.commit();

        return response.json({
          message: messages.create('Livro'),
        });
      } catch (error: any) {
        await transaction.rollback();

        throw new Error(error.message);
      }
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        auth,
        body,
        params: { id },
      } = request;
      const files = request.files as unknown as MulterUploadedFiles;
      const { name, price, free_pages, description, categories }: BookUpdateDto = body;
      let file_url;
      let photo_url;

      const book = await BookRepository.findById(id);

      if (!book) {
        return response.status(404).json({ message: messages.unknown('Livro') });
      }

      if (book.user.id !== auth.id) {
        return response.status(401).json({
          message: messages.unauthorized(),
        });
      }

      if (files?.photo) {
        if (book.photo_url) {
          await del(book.photo_url);
        }

        const photo = files.photo[0];
        const path = `users/${auth.id}/images/${photo.originalname}`;

        const blob = await put(path, photo.buffer, {
          access: 'public',
        });

        photo_url = blob.url;
      }

      if (files?.file) {
        if (book.file_url) {
          await del(book.file_url);
        }

        const file = files.file[0];
        const path = `users/${auth.id}/files/${file.originalname}`;

        const blob = await put(path, file.buffer, {
          access: 'public',
        });

        file_url = blob.url;
      }

      if (categories) {
        const transaction = await sequelizeConnection.transaction();

        try {
          const categoriesIds = book.categories.map(({ id }) => id);
          const categoriesToRemove: string[] = [];
          const categoriesToAdd: BookCategoryCreateDto[] = [];

          categories.forEach((id) => {
            if (!categoriesIds.includes(id)) {
              categoriesToAdd.push({
                book_id: book.id,
                category_id: id,
              });
            }
          });

          categoriesIds.forEach((id) => {
            if (!categories.includes(id)) {
              categoriesToRemove.push(id);
            }
          });

          BookCategoryRepository.deleteByIds(book.id, categoriesToRemove, { transaction });

          BookCategoryRepository.bulkCreate(categoriesToAdd, { transaction });

          await BookRepository.update(
            book.id,
            {
              name,
              price,
              free_pages,
              description,
              photo_url,
              file_url,
            },
            transaction
          );

          transaction.commit();

          return response.json({
            message: messages.update('Livro'),
          });
        } catch (error: any) {
          await transaction.rollback();

          throw new Error(error.message);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { query } = request;
      const page = query.page ? parseInt(query.page as unknown as string) : 1;
      const limit = query.limit ? parseInt(query.limit as unknown as string) : 75;
      const { search, user_id, min_date, max_date, min_price, max_price, free, categories } = query;
      let whereStatement: any = {};

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

      if (user_id) whereStatement['user_id'] = user_id;

      if (min_date || max_date) {
        whereStatement['createdAt'] = {
          [Op.gte]: startOfDay(min_date ? parseISO(min_date as string) : new Date()),
          [Op.lte]: endOfDay(max_date ? parseISO(max_date as string) : new Date()),
        };
      }

      if (free === 'true') {
        whereStatement['price'] = 0;
      } else if (min_price || max_price) {
        whereStatement['price'] = {};

        if (min_price) {
          whereStatement['price'] = {
            [Op.gte]: min_price,
          };
        }

        if (max_price) {
          whereStatement['price'] = {
            ...whereStatement['price'],
            [Op.lte]: max_price,
          };
        }
      }

      if (categories) {
        whereStatement[Op.and] = sequelizeConnection.literal(`(
          EXISTS (
            SELECT 1
            FROM "BookCategories" as bc
            WHERE bc.book_id = "Book".id
            AND "bc".category_id IN (:categories)
          )
        )`);
      }

      const books = await BookRepository.findAndCountAll(page, limit, whereStatement, {
        categories,
      });

      const wrappedBooks = paginationWrapper(books, page, limit);

      return response.json(wrappedBooks);
    } catch (error) {
      next(error);
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        auth,
        params: { id },
      } = request;

      const book = await BookRepository.findById(id, auth.id);

      if (!book) return response.status(404).json({ message: messages.unknown('Livro') });

      return response.json(book);
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        auth,
        params: { id },
      } = request;

      const book = await BookRepository.findById(id);

      if (!book) return response.status(404).json({ message: messages.unknown('Livro') });

      if (book.user.id !== auth.id) {
        return response.status(401).json({ message: messages.unauthorized() });
      }

      const isDeleted = await BookRepository.deleteById(id);

      if (!isDeleted) {
        return response.status(400).json({ message: 'Não foi possível excluir o livro.' });
      }

      if (book.photo_url) {
        await del(book.photo_url);
      }

      if (book.file_url) {
        await del(book.file_url);
      }

      return response.json({ message: messages.delete('Livro') });
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
