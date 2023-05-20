import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Book from '../database/models/book.model';
import BookCreateDto from '../dto/book/bookCreate.dto';

class BookRepository {
  private repository: Repository<Book>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Book);
  }

  async create(book: BookCreateDto) {
    return await this.repository.create(book);
  }

  async findById(id: string) {
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
        },
      ],
    });
  }

  async findAndCountAll(page: number, limit: number) {
    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      attributes: {
        exclude: ['user_id', 'file_url'],
        include: [
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
