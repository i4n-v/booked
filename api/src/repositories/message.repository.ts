import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import { WhereOptions } from 'sequelize';
import Message from '../database/models/message.model';
import MessageDto from '../dto/message/message.dto';
import MessageCreateDto from '../dto/message/messageCreate.dto';

class MessageRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Message);
  }

  async findById(id: string) {
    return await this.repository.findByPk(id);
  }

  async findAndCountAll(page: number, limit: number, options?: WhereOptions<MessageDto>) {
    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'ASC']],
      where: options,
    });
  }

  async create(chat: MessageCreateDto) {
    return await this.repository.create(chat);
  }

  async deleteById(id: string) {
    return await this.repository.destroy({
      where: {
        id,
      },
    });
  }
}

export default new MessageRepository();
