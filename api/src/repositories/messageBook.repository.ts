import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import { BulkCreateOptions } from 'sequelize';
import MessageBook from '../database/models/messageBook.model';
import MessageBookCreateDto from '../dto/messageBook/messageBookCreate.dto';

class MessageBookRepository {
  private repository: Repository<MessageBook>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(MessageBook);
  }

  async bulkCreate(MessageBook: MessageBookCreateDto[], options?: BulkCreateOptions) {
    return await this.repository.bulkCreate(MessageBook, options);
  }
}

export default new MessageBookRepository();
