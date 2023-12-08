import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import { BulkCreateOptions, Transaction } from 'sequelize';
import UserChat from '../database/models/userChat.model';
import UserChatCreateDto from '../dto/userChat/userChatCreate.dto';

class UserChatRepository {
  private repository: Repository<UserChat>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(UserChat);
  }

  async create(userChat: UserChatCreateDto, transaction: Transaction) {
    return await this.repository.create(userChat, { transaction });
  }

  async bulkCreate(userChats: UserChatCreateDto[], options?: BulkCreateOptions) {
    return await this.repository.bulkCreate(userChats, options);
  }
}

export default new UserChatRepository();
