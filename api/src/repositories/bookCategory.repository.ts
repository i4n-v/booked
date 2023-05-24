import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import { BulkCreateOptions, DestroyOptions } from 'sequelize';
import BookCategory from '../database/models/bookCategory.model';
import BookCategoryCreateDto from '../dto/bookCategory/bookCategoryCreate.dto';
import { Op } from 'sequelize';

class BookRepository {
  private repository: Repository<BookCategory>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(BookCategory);
  }

  async bulkCreate(bookCategories: BookCategoryCreateDto[], options?: BulkCreateOptions) {
    return await this.repository.bulkCreate(bookCategories, options);
  }

  async deleteByIds(bookId: string, ids: string[], options: DestroyOptions = {}) {
    return await this.repository.destroy({
      where: {
        book_id: bookId,
        category_id: {
          [Op.in]: ids,
        },
      },
      ...options,
    });
  }
}

export default new BookRepository();
