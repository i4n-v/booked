import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Book from '../database/models/book.model';
import BookCreateDto from '../dto/book/bookCreate.dto';
import BookUpdateDto from '../dto/book/bookUpdate.dto';
import { BindOrReplacements, CreateOptions, Transaction, WhereOptions } from 'sequelize';
import BookDto from '../dto/book/book.dto';
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
                    WHEN (SUM(number) / COUNT(id)) IS NULL THEN 0
                    ELSE ROUND((SUM(number) / COUNT(id))::numeric, 2)
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
                SELECT COUNT(id)
                FROM "Assessments"
                WHERE "Assessments".book_id = "Book".id
              )`
            ),
            'total_users_rating',
          ],
          [
            sequelizeConnection.literal(
              `(
                SELECT COUNT(id)
                FROM "Comments"
                WHERE "Comments".book_id = "Book".id
              )`
            ),
            'total_comments',
          ],
          [sequelizeConnection.literal('"acquisitions->Acquisition".id'), 'acquisition_id'],
          [sequelizeConnection.literal('"solicitations->Solicitation".id'), 'solicitation_id'],
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
        {
          model: sequelizeConnection.model('User'),
          as: 'solicitations',
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
    options?: WhereOptions<BookDto>,
    replacements?: BindOrReplacements
  ) {
    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      where: options,
      subQuery: false,
      order: [
        [sequelizeConnection.literal('rating'), 'DESC'],
        [sequelizeConnection.literal('"createdAt"'), 'DESC'],
        [sequelizeConnection.literal('description'), 'ASC'],
      ],
      replacements,
      attributes: {
        exclude: ['user_id', 'file_url'],
        include: [
          [
            sequelizeConnection.literal(
              `(
                SELECT
                  CASE
                    WHEN (SUM(number) / COUNT(id)) IS NULL THEN 0
                    ELSE (SUM(number) / COUNT(id))
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
                SELECT COUNT(id)
                FROM "Assessments"
                WHERE "Assessments".book_id = "Book".id
              )`
            ),
            'total_users_rating',
          ],
          [sequelizeConnection.literal('"acquisitions->Acquisition".id'), 'acquisition_id'],
          [
            sequelizeConnection.literal(`
              CASE
                WHEN "wishes->Wishe".id IS NOT NULL
                  THEN true
                  ELSE false
              END
            `),
            'wished',
          ],
          [
            sequelizeConnection.literal(`(
              SELECT
                JSON_AGG(
                  JSON_BUILD_OBJECT(
                    'id',
                    c.id,
                    'name',
                    c.name
                  )
                )
              FROM "Categories" AS c
                INNER JOIN "BookCategories" AS bc ON bc.category_id = c.id
              WHERE bc.book_id = "Book".id
            )`),
            'categories',
          ],
        ],
      },
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'user',
          attributes: ['id', 'name', 'user_name'],
        },
        {
          model: sequelizeConnection.model('User'),
          as: 'acquisitions',
          attributes: [],
          through: {
            attributes: [],
          },
        },
        {
          model: sequelizeConnection.model('User'),
          as: 'wishes',
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
