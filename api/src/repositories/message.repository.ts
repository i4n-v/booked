import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Message from '../database/models/message.model';
import MessageCreateDto from '../dto/message/messageCreate.dto';
import { FindOptions, WhereOptions } from 'sequelize';
import MessageDto from '../dto/message/message.dto';
import { Request } from 'express';
import MessageUpdateDto from '../dto/message/messageUpdate.dto';

class MessageRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Message);
  }

  async findByIdWithUsers(id: string, request: Request) {
    const {
      headers: { host },
    } = request;

    const protocol = process.env.NODE_ENV !== 'development' ? 'https' : 'http';

    return await this.repository.findByPk(id, {
      attributes: {
        exclude: ['sender_id', 'receiver_id'],
      },
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'sender',
          attributes: [
            'id',
            'name',
            'user_name',
            [
              sequelizeConnection.literal(`
              CASE
                WHEN sender.photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', sender.photo_url)
                ELSE sender.photo_url
              END
          `),
              'photo_url',
            ],
          ],
        },
        {
          model: sequelizeConnection.model('User'),
          as: 'receiver',
          attributes: [
            'id',
            'name',
            'user_name',
            [
              sequelizeConnection.literal(`
              CASE
                WHEN receiver.photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', receiver.photo_url)
                ELSE receiver.photo_url
              END
          `),
              'photo_url',
            ],
          ],
        },
      ],
    });
  }

  async findById(id: string) {
    return await this.repository.findByPk(id);
  }

  async findAll(options: FindOptions<MessageDto>) {
    return await this.repository.findAll(options);
  }

  async findAndCountAll(
    page: number,
    limit: number,
    request: Request,
    options?: WhereOptions<MessageDto>
  ) {
    const {
      headers: { host },
    } = request;

    const protocol = process.env.NODE_ENV !== 'development' ? 'https' : 'http';

    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'ASC']],
      attributes: {
        exclude: ['sender_id', 'receiver_id'],
      },
      where: options,
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'sender',
          attributes: [
            'id',
            'name',
            'user_name',
            [
              sequelizeConnection.literal(`
              CASE
                WHEN sender.photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', sender.photo_url)
                ELSE sender.photo_url
              END
          `),
              'photo_url',
            ],
          ],
        },
        {
          model: sequelizeConnection.model('User'),
          as: 'receiver',
          attributes: [
            'id',
            'name',
            'user_name',
            [
              sequelizeConnection.literal(`
              CASE
                WHEN receiver.photo_url IS NOT NULL THEN CONCAT('${
                  protocol + '://' + host
                }', receiver.photo_url)
                ELSE receiver.photo_url
              END
          `),
              'photo_url',
            ],
          ],
        },
      ],
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

  async update(message: MessageUpdateDto, where: WhereOptions<MessageDto>) {
    return await this.repository.update(message, {
      where: where,
    });
  }
}

export default new MessageRepository();
