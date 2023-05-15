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
}

export default new BookRepository();
