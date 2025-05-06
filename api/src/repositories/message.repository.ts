import { sequelizeConnection } from '../config/sequelizeConnection.config';
import { Repository } from 'sequelize-typescript';
import Message from '../database/models/message.model';
import MessageCreateDto from '../dto/message/messageCreate.dto';
import { FindOptions, Transaction, WhereOptions } from 'sequelize';
import MessageDto from '../dto/message/message.dto';

class MessageRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = sequelizeConnection.getRepository(Message);
  }

  async findByIdWithUsers(id: string, transaction?: Transaction) {
    return await this.repository.findByPk(id, {
      attributes: {
        exclude: ['sender_id'],
      },
      transaction,
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'sender',
          attributes: ['id', 'name', 'user_name', 'photo_url'],
        },
        {
          model: sequelizeConnection.model('Book'),
          as: 'books',
          through: { attributes: [] },
          attributes: {
            exclude: ['user_id', 'file_url'],
            include: [
              [
                sequelizeConnection.literal(
                  `(
                    SELECT
                      CASE
                        WHEN (SUM(number) / COUNT(id)) IS NULL THEN 0
                        ELSE (SUM(number) / COUNT(id))
                      END
                    FROM "Assessments"
                    WHERE "Assessments".book_id = "books".id
                  )`
                ),
                'rating',
              ],
              [
                sequelizeConnection.literal(
                  `(
                    SELECT COUNT(id)
                    FROM "Assessments"
                    WHERE "Assessments".book_id = "books".id
                  )`
                ),
                'total_users_rating',
              ],
            ],
          },
          include: [
            {
              model: sequelizeConnection.model('User'),
              as: 'user',
              attributes: ['id', 'name', 'user_name'],
            },
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
    userId: string,
    page: number,
    limit: number,
    options?: WhereOptions<MessageDto>
  ) {
    return await this.repository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'desc']],
      attributes: {
        exclude: ['sender_id'],
        include: [
          [
            sequelizeConnection.literal(`
              EXISTS (
                SELECT id FROM "ReadedMessages"
                WHERE "ReadedMessages".message_id = "Message".id AND "ReadedMessages".user_id = '${userId}'
              )
          `),
            'read',
          ],
        ],
      },
      where: options,
      include: [
        {
          model: sequelizeConnection.model('User'),
          as: 'sender',
          attributes: ['id', 'name', 'user_name', 'photo_url'],
        },
        {
          model: sequelizeConnection.model('Book'),
          as: 'books',
          through: { attributes: [] },
          attributes: {
            exclude: ['user_id', 'file_url'],
            include: [
              [
                sequelizeConnection.literal(
                  `(
                    SELECT
                      CASE
                        WHEN (SUM(number) / COUNT(id)) IS NULL THEN 0
                        ELSE (SUM(number) / COUNT(id))
                      END
                    FROM "Assessments"
                    WHERE "Assessments".book_id = "books".id
                  )`
                ),
                'rating',
              ],
              [
                sequelizeConnection.literal(
                  `(
                    SELECT COUNT(id)
                    FROM "Assessments"
                    WHERE "Assessments".book_id = "books".id
                  )`
                ),
                'total_users_rating',
              ],
            ],
          },
          include: [
            {
              model: sequelizeConnection.model('User'),
              as: 'user',
              attributes: ['id', 'name', 'user_name'],
            },
          ],
        },
      ],
    });
  }

  async create(chat: MessageCreateDto, transaction?: Transaction) {
    return await this.repository.create(chat, {
      transaction,
    });
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
