import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Category from '../database/models/category.model';

class BookRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Category);
  }

  async findAndCountAll(page: number, limit: number) {
    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [['name', 'ASC']],
    });
  }
}

export default new BookRepository();
