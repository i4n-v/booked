import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Book from '../database/models/book.model';
import BookCreateDto from '../dto/book/bookCreate.dto';
import BookUpdateDto from '../dto/book/bookUpdate.dto';
import { CreateOptions, Transaction, WhereOptions } from 'sequelize';
import BookDto from '../dto/book/book.dto';
import { Request } from 'express';
import 'dotenv/config';

class BookRepository {
  private repository: Repository<Book>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Book);
  }

  async create(book: BookCreateDto, options?: CreateOptions) {
    return await this.repository.create(book, options);
  }

  async update(id: string, book: BookUpdateDto, transaction?: Transaction) {
    return await this.repository.update(book, {
      where: {
        id,
      },
      transaction,
    });
  }

  async findById(id: string, userId?: string) {
    return await this.repository.findByPk(id, {
      attributes: {
        exclude: ['user_id'],
        include: [
          [
            sequelizeConnection.literal(
              `(
                SELECT
                  CASE
                    WHEN (SUM(number) / COUNT(*)) IS NULL THEN 0
                    ELSE ROUND((SUM(number) / COUNT(*))::numeric, 2)
                  END
                FROM "Assessments"
                WHERE "Assessments".book_id = "Book".id
              )`
            ),
            'rating',
          ],
          [
            sequelizeConnection.literal(
              `(
                SELECT COUNT(*)
                FROM "Assessments"
                WHERE "Assessments".book_id = "Book".id
              )`
            ),
            'total_users_rating',
          ],
          [sequelizeConnection.literal('"acquisitions->Acquisition".id'), 'acquisition_id'],
          [sequelizeConnection.literal('"acquisitions->Acquisition".marked_page'), 'marked_page'],
        ],
      },
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'user',
          attributes: ['id', 'name', 'user_name'],
        },
        {
          model: sequelizeConnection.model('Category'),
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: sequelizeConnection.model('User'),
          as: 'user_raters',
          required: false,
          attributes: ['id'],
          through: {
            as: 'assessment',
            attributes: ['id', 'number'],
          },
          where: {
            id: userId || null,
          },
        },
        {
          model: sequelizeConnection.model('User'),
          as: 'acquisitions',
          attributes: [],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async findAndCountAll(
    page: number,
    limit: number,
    request: Request,
    options?: WhereOptions<BookDto>
  ) {
    const {
      headers: { host },
    } = request;

    const protocol = process.env.NODE_ENV !== 'development' ? 'https' : 'http';

    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      where: options,
      distinct: true,
      subQuery: false,
      order: [[sequelizeConnection.literal('rating'), 'DESC']],
      attributes: {
        exclude: ['user_id', 'file_url'],
        include: [
          [
            sequelizeConnection.literal(`
              CASE
                WHEN "Book".photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', "Book".photo_url)
                ELSE "Book".photo_url
              END
          `),
            'photo_url',
          ],
          [
            sequelizeConnection.literal(
              `(
                SELECT
                  CASE
                    WHEN (SUM(number) / COUNT(*)) IS NULL THEN 0
                    ELSE (SUM(number) / COUNT(*))
                  END
                FROM "Assessments"
                WHERE "Assessments".book_id = "Book".id
              )`
            ),
            'rating',
          ],
          [
            sequelizeConnection.literal(
              `(
                SELECT COUNT(*)
                FROM "Assessments"
                WHERE "Assessments".book_id = "Book".id
              )`
            ),
            'total_users_rating',
          ],
          [sequelizeConnection.literal('"acquisitions->Acquisition".id'), 'acquisition_id'],
        ],
      },
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'user',
          attributes: ['id', 'name', 'user_name'],
        },
        {
          model: sequelizeConnection.model('Category'),
          as: 'categories',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: sequelizeConnection.model('User'),
          as: 'acquisitions',
          attributes: [],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async deleteById(id: string) {
    return await this.repository.destroy({
      where: {
        id,
      },
    });
  }
}

export default new BookRepository();
