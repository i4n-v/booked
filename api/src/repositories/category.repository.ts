import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Category from '../database/models/category.model';
import CategoryDto from '../dto/category/category.dto';
import { WhereOptions } from 'sequelize';

class BookRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Category);
  }

  async findAndCountAll(page: number, limit: number, options?: WhereOptions<CategoryDto>) {
    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [['name', 'ASC']],
      where: options,
    });
  }
}

export default new BookRepository();
