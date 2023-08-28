import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Chat from '../database/models/chat.model';
import ChatCreateDto from '../dto/chat/chatCreate.dto';
import { WhereOptions } from 'sequelize';
import ChatDto from '../dto/chat/chat.dto';

class ChatRepository {
  private repository: Repository<Chat>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Chat);
  }

  async findById(id: string) {
    return await this.repository.findByPk(id);
  }

  async findAndCountAll(page: number, limit: number, options?: WhereOptions<ChatDto>) {
    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'ASC']],
      where: options,
    });
  }

  async create(chat: ChatCreateDto) {
    return await this.repository.create(chat);
  }
}

export default new ChatRepository();
