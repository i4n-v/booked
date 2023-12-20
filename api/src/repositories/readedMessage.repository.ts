import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import { BulkCreateOptions } from 'sequelize';
import ReadedMessageCreateDto from '../dto/readedMessage/readMessageCreate.dto';
import ReadedMessage from '../database/models/readedMessage.model';

class ReadedMessageRepository {
  private repository: Repository<ReadedMessage>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(ReadedMessage);
  }

  async bulkCreate(readedMessage: ReadedMessageCreateDto[], options?: BulkCreateOptions) {
    return await this.repository.bulkCreate(readedMessage, options);
  }
}

export default new ReadedMessageRepository();
